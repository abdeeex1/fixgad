import { createFileRoute } from "@tanstack/react-router";
import { earlyAccessSchema } from "@/lib/early-access";

async function sendRegistrationEmails(
  registration: {
    name: string;
    email: string;
    city: string;
    type: "customer" | "hrayfi";
    primaryTrade?: string;
  },
) {
  const apiKey = import.meta.env.RESEND_API_KEY;
  if (!apiKey) return { configured: false, sent: false };

  const from = import.meta.env.RESEND_FROM_EMAIL || "FIXGAD <notifications@fixgad.tech>";
  const profession =
    registration.type === "hrayfi" && registration.primaryTrade
      ? ` Primary profession: ${registration.primaryTrade}.`
      : "";
  const confirmation = {
    from,
    to: [registration.email],
    reply_to: "support@fixgad.tech",
    subject: "You're on the FIXGAD early-access list",
    text: `Thank you for registering with FIXGAD. We've received your ${registration.type === "hrayfi" ? "Hrayfi" : "customer"} interest for ${registration.city}.${profession} Registration does not guarantee immediate access or employment.`,
  };
  const internal = {
    from,
    to: ["contact@fixgad.tech"],
    reply_to: registration.email,
    subject: `FIXGAD early access: ${registration.type} from ${registration.city}`,
    text: `A new ${registration.type} registration was received.\n\nName: ${registration.name}\nEmail: ${registration.email}\nCity: ${registration.city}${profession}`,
  };

  try {
    const responses = await Promise.all([
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(confirmation),
      }),
      fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        body: JSON.stringify(internal),
      }),
    ]);
    const sent = responses.every((response) => response.ok);
    return { configured: true, sent };
  } catch (error) {
    console.error("FIXGAD Resend notification failed", error);
    return { configured: true, sent: false };
  }
}

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
          phone: payload.phone,
          preferredLanguage: payload.preferredLanguage,
          primaryTrade: payload.primaryTrade,
          additionalTrades: payload.additionalTrades,
          experienceYears: payload.experienceYears,
          serviceDescription: payload.serviceDescription,
          customProfession: payload.customProfession,
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
            registration_type: parsed.data.type,
            phone: parsed.data.phone || null,
            preferred_language: parsed.data.preferredLanguage || null,
            primary_trade: parsed.data.primaryTrade || null,
            additional_trades: parsed.data.additionalTrades ?? [],
            experience_years: parsed.data.experienceYears ?? null,
            service_description: parsed.data.serviceDescription || null,
            custom_profession: parsed.data.customProfession || null,
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

        const email = await sendRegistrationEmails({
          name: parsed.data.name,
          email: parsed.data.email,
          city: parsed.data.city,
          type: parsed.data.type,
          primaryTrade:
            parsed.data.primaryTrade === "Other"
              ? parsed.data.customProfession
              : parsed.data.primaryTrade,
        });
        return Response.json(
          { status: "success", id: result.id, email },
          { status: 201 },
        );
      },
    },
  },
});
