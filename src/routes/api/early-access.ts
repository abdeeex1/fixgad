import { createFileRoute } from "@tanstack/react-router";
import { earlyAccessSchema } from "@/lib/early-access";

export const Route = createFileRoute("/api/early-access")({
  staticData: { sitemap: false },
  server: {
    handlers: {
      POST: async ({ request }) => {
        const contentType = request.headers.get("content-type") ?? "";
        if (!contentType.includes("application/json")) {
          return Response.json(
            { status: "invalid", message: "Invalid request format" },
            { status: 400 },
          );
        }

        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ status: "invalid", message: "Invalid JSON" }, { status: 400 });
        }

        if (!body || typeof body !== "object") {
          return Response.json(
            { status: "invalid", message: "Missing registration details" },
            { status: 400 },
          );
        }

        const payload = body as Record<string, unknown>;
        if (typeof payload.website === "string" && payload.website.trim()) {
          return Response.json({ status: "success" }, { status: 200 });
        }

        const parsed = earlyAccessSchema.safeParse({
          name: payload.name,
          email: payload.email,
          city: payload.city,
          type: payload.type,
        });
        if (!parsed.success) {
          return Response.json(
            { status: "invalid", message: "Please check all required fields" },
            { status: 400 },
          );
        }

        const url = import.meta.env.VITE_SUPABASE_URL;
        const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
        if (!url || !anonKey) {
          return Response.json(
            { status: "error", message: "Registration is temporarily unavailable" },
            { status: 503 },
          );
        }

        const forwarded = request.headers.get("x-forwarded-for") ?? "";
        const ip =
          request.headers.get("cf-connecting-ip") || forwarded.split(",")[0]?.trim() || "unknown";
        const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(ip));
        const ipHash = [...new Uint8Array(digest)]
          .map((byte) => byte.toString(16).padStart(2, "0"))
          .join("");

        const response = await fetch(`${url}/rest/v1/rpc/register_early_access`, {
          method: "POST",
          headers: {
            apikey: anonKey,
            Authorization: `Bearer ${anonKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            full_name: parsed.data.name,
            email: parsed.data.email,
            city: parsed.data.city,
            user_type: parsed.data.type,
            source_ip_hash: ipHash,
          }),
        });

        if (!response.ok) {
          const text = await response.text();
          console.error("Early-access Supabase submission failed", response.status, text);
          return Response.json(
            { status: "error", message: "We couldn't save your registration. Please try again." },
            { status: 502 },
          );
        }

        const result = (await response.json()) as { status?: string; id?: string };
        if (result.status === "duplicate") {
          return Response.json(
            { status: "duplicate", message: "This email is already on the list." },
            { status: 409 },
          );
        }
        if (result.status === "invalid") {
          return Response.json(
            { status: "invalid", message: "Please check all required fields" },
            { status: 400 },
          );
        }
        if (result.status === "rate_limited") {
          return Response.json(
            { status: "rate_limited", message: "Too many attempts. Please wait a few minutes." },
            { status: 429 },
          );
        }
        if (result.status !== "success" || !result.id) {
          return Response.json(
            {
              status: "error",
              message: "We couldn't confirm your registration. Please try again.",
            },
            { status: 502 },
          );
        }

        return Response.json({ status: "success", id: result.id }, { status: 201 });
      },
    },
  },
});
