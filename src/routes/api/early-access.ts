import { createFileRoute } from "@tanstack/react-router";
import { earlyAccessSchema } from "@/lib/early-access";

type RegistrationEmailData = {
  id: string;
  name: string;
  email: string;
  city: string;
  type: "customer" | "hrayfi";
  preferredLanguage?: "en" | "fr" | "ar";
  primaryTrade?: string;
};

function escapeHtml(value: string) {
  return value.replace(/[&<>"']/g, (character) => {
    const entities: Record<string, string> = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[character] ?? character;
  });
}

function registrationEmailContent(registration: RegistrationEmailData) {
  const language = "ar";
  const isHrayfi = registration.type === "hrayfi";
  const name = escapeHtml(registration.name);
  const city = escapeHtml(registration.city);
  const trade = registration.primaryTrade ? escapeHtml(registration.primaryTrade) : "";

  const copy = {
    subject: "توصلنا بالتسجيل ديالك فـ FIXGAD",
    eyebrow: "التسجيل فالولوج المبكر",
    title: isHrayfi ? "شكراً على الاهتمام ديالك بـ FIXGAD!" : "مرحبا بيك فـ FIXGAD!",
    greeting: `سلام ${name}،`,
    intro: isHrayfi
      ? "شكراً حيث عبّرتي على الرغبة ديالك باش تنضم لـ FIXGAD كمقدم خدمات مستقل. توصلنا بالمعلومات ديالك، والفريق ديالنا غادي يراجع التسجيل ديالك ونتاصلو بيك ملي يكون شي جديد."
      : "شكراً على الثقة والاهتمام ديالك بـ FIXGAD. توصلنا بالتسجيل ديالك بنجاح، وغادي نبقاو على تواصل معاك ونخبروك بآخر المستجدات ديال الإطلاق.",
    nextTitle: "شنو غادي يوقع من دابا؟",
    next: isHrayfi
      ? "الفريق ديالنا غادي يراجع المعلومات اللي شاركتي معانا. إلا احتجنا شي توضيح، غادي نتاصلو بيك. التسجيل ديالك كيعبر غير على الاهتمام، وما كيعنيش قبول نهائي ولا عقد عمل."
      : "غادي نشاركو معاك الأخبار المهمة ديال FIXGAD، ونخبروك ملي يكون الولوج المبكر متاح فالمدينة ديالك. التسجيل ما كيعنيش بالضرورة أن الولوج غادي يكون فوري.",
    location: "المدينة",
    tradeLabel: "الحرفة الرئيسية",
    closing: "فرحانين حيث غادي تكون جزء من هاد المشروع.",
    signature: "فريق FIXGAD",
    footer: "FIXGAD كتقرّب ليك خدمات الدار بطريقة أسهل. قريباً فالمغرب.",
    help: "عندك شي سؤال؟ جاوب على هاد الإيميل ولا تواصل معانا عبر",
  };

  const isArabic = true;
  const direction = isArabic ? "rtl" : "ltr";
  const details = [
    `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">${copy.location}</td><td style="padding:10px 0;text-align:${isArabic ? "left" : "right"};color:#17211d;font-size:14px;font-weight:600;">${city}</td></tr>`,
    ...(isHrayfi && trade
      ? [`<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">${copy.tradeLabel}</td><td style="padding:10px 0;text-align:${isArabic ? "left" : "right"};color:#17211d;font-size:14px;font-weight:600;">${trade}</td></tr>`]
      : []),
  ].join("");

  const html = `<!doctype html>
<html lang="ary" dir="rtl">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;background:#f4f6f3;font-family:Arial,Helvetica,sans-serif;color:#17211d;direction:${direction};">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#f4f6f3;padding:32px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;">
        <tr><td style="background:#173d32;padding:25px 32px;color:#ffffff;">
          <div style="font-size:23px;letter-spacing:1.5px;font-weight:800;">FIXGAD</div>
          <div style="margin-top:7px;color:#d5e4dc;font-size:10px;letter-spacing:1.5px;">${copy.eyebrow}</div>
        </td></tr>
        <tr><td style="padding:34px 32px 16px;">
          <h1 style="margin:0 0 20px;font-size:26px;line-height:1.25;color:#173d32;">${copy.title}</h1>
          <p style="margin:0 0 14px;font-size:15px;line-height:1.8;">${copy.greeting}</p>
          <p style="margin:0 0 22px;font-size:15px;line-height:1.8;color:#46534d;">${copy.intro}</p>
          <div style="background:#f5f8f5;border:1px solid #e5ece6;border-radius:12px;padding:18px 20px;margin:0 0 24px;">
            <div style="font-size:14px;font-weight:700;color:#173d32;margin-bottom:8px;">${copy.nextTitle}</div>
            <p style="margin:0;font-size:14px;line-height:1.8;color:#46534d;">${copy.next}</p>
          </div>
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="border-top:1px solid #edf1ed;border-bottom:1px solid #edf1ed;">${details}</table>
          <p style="margin:24px 0 8px;font-size:14px;line-height:1.8;">${copy.closing}</p>
          <p style="margin:0 0 28px;font-size:14px;font-weight:700;color:#173d32;">${copy.signature}</p>
        </td></tr>
        <tr><td style="background:#f8faf8;padding:20px 32px;color:#718078;font-size:12px;line-height:1.7;">
          <div>${copy.footer}</div>
          <div style="margin-top:8px;">${copy.help} <a href="mailto:support@fixgad.tech" style="color:#173d32;text-decoration:underline;">support@fixgad.tech</a></div>
          <div style="margin-top:12px;">FIXGAD · Morocco</div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

  const text = [
    copy.greeting,
    "",
    copy.intro,
    "",
    copy.nextTitle,
    copy.next,
    "",
    `${copy.location}: ${registration.city}`,
    ...(isHrayfi && trade ? [`${copy.tradeLabel}: ${registration.primaryTrade}`] : []),
    "",
    copy.closing,
    copy.signature,
    "",
    copy.help + " support@fixgad.tech",
  ].join("\n");

  return { subject: copy.subject, html, text };
}

async function sendRegistrationEmails(registration: RegistrationEmailData) {
  // Read secrets at request time. Never use import.meta.env for private credentials.
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn("FIXGAD registration email skipped: RESEND_API_KEY is not configured");
    return { configured: false, confirmationSent: false, internalNotificationSent: false };
  }

  const from = process.env.RESEND_FROM_EMAIL || "FIXGAD <notifications@fixgad.app>";
  const confirmation = registrationEmailContent(registration);
  const headers = {
    Authorization: `Bearer ${apiKey}`,
    "Content-Type": "application/json",
  };

  const messages = [
    {
      key: `fixgad-registration-confirmation-${registration.id}`,
      payload: {
        from,
        to: [registration.email],
        reply_to: "support@fixgad.tech",
        subject: confirmation.subject,
        html: confirmation.html,
        text: confirmation.text,
      },
    },
    {
      key: `fixgad-registration-internal-${registration.id}`,
      payload: {
        from,
        to: ["contact@fixgad.tech"],
        reply_to: registration.email,
        subject: `تسجيل جديد فـ FIXGAD · ${registration.type === "hrayfi" ? "حرفي" : "زبون"} · ${registration.city}`,
        text: [
          "توصلنا بتسجيل جديد فالولوج المبكر.",
          "",
          `الاسم: ${registration.name}`,
          `الإيميل: ${registration.email}`,
          `المدينة: ${registration.city}`,
          `نوع التسجيل: ${registration.type === "hrayfi" ? "حرفي" : "زبون"}`,
          ...(registration.primaryTrade ? [`الحرفة الرئيسية: ${registration.primaryTrade}`] : []),
          `رقم التسجيل: ${registration.id}`,
        ].join("\n"),
      },
    },
  ];

  const results = await Promise.all(
    messages.map(async ({ key, payload }) => {
      try {
        const response = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: { ...headers, "Idempotency-Key": key },
          body: JSON.stringify(payload),
        });
        if (!response.ok) {
          console.error("FIXGAD transactional email failed", response.status, await response.text());
        }
        return response.ok;
      } catch (error) {
        console.error("FIXGAD transactional email request failed", error);
        return false;
      }
    }),
  );

  return {
    configured: true,
    confirmationSent: results[0],
    internalNotificationSent: results[1],
  };
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
          const responseText = await response.text();
          console.error("Early-access Supabase submission failed", response.status, responseText);
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
          id: result.id,
          name: parsed.data.name,
          email: parsed.data.email,
          city: parsed.data.city,
          type: parsed.data.type,
          preferredLanguage: parsed.data.preferredLanguage,
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
