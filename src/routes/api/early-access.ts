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
  const language = registration.preferredLanguage ?? "en";
  const isHrayfi = registration.type === "hrayfi";
  const name = escapeHtml(registration.name);
  const city = escapeHtml(registration.city);
  const trade = registration.primaryTrade ? escapeHtml(registration.primaryTrade) : "";

  const copy = {
    en: {
      subject: "We've received your FIXGAD registration",
      eyebrow: "EARLY ACCESS REGISTRATION",
      title: isHrayfi ? "Thanks for raising your hand." : "You're on our early-access list.",
      greeting: `Hello ${name},`,
      intro: isHrayfi
        ? "Thank you for your interest in joining FIXGAD as an independent service professional. We've received your details and our team will review your registration."
        : "Thank you for your interest in FIXGAD. We've received your early-access registration and will keep you informed as we prepare to launch.",
      nextTitle: "What happens next?",
      next: isHrayfi
        ? "Our team will review the information you shared. If we need anything else, we'll contact you directly. This registration is an expression of interest, not an employment offer or guarantee of acceptance."
        : "We'll share relevant launch updates and let you know when early access becomes available in your area. Registering does not guarantee immediate access.",
      location: "Your city",
      tradeLabel: "Main profession",
      closing: "Thanks for being part of what we're building.",
      signature: "The FIXGAD Team",
      footer: "A simpler way to get home services, starting in Morocco.",
      help: "Questions? Reply to this email or contact",
    },
    fr: {
      subject: "Nous avons bien reçu votre inscription FIXGAD",
      eyebrow: "INSCRIPTION À L'ACCÈS ANTICIPÉ",
      title: isHrayfi ? "Merci pour votre intérêt." : "Votre inscription est bien enregistrée.",
      greeting: `Bonjour ${name},`,
      intro: isHrayfi
        ? "Merci de votre intérêt pour rejoindre FIXGAD en tant que professionnel indépendant. Nous avons bien reçu vos informations et notre équipe va examiner votre inscription."
        : "Merci de votre intérêt pour FIXGAD. Nous avons bien reçu votre demande d'accès anticipé et vous tiendrons informé(e) de l'avancement du lancement.",
      nextTitle: "Quelle est la prochaine étape ?",
      next: isHrayfi
        ? "Notre équipe examinera les informations transmises. Nous vous contacterons si nous avons besoin de précisions. Cette inscription exprime un intérêt et ne constitue ni une offre d'emploi ni une garantie d'acceptation."
        : "Nous vous communiquerons les actualités utiles du lancement et vous informerons lorsque l'accès anticipé sera disponible dans votre zone. L'inscription ne garantit pas un accès immédiat.",
      location: "Votre ville",
      tradeLabel: "Profession principale",
      closing: "Merci de prendre part à cette aventure.",
      signature: "L'équipe FIXGAD",
      footer: "Les services à domicile, plus simplement. Bientôt au Maroc.",
      help: "Une question ? Répondez à cet e-mail ou contactez-nous à",
    },
    ar: {
      subject: "توصلنا بطلب تسجيلك في FIXGAD",
      eyebrow: "التسجيل في الولوج المبكر",
      title: isHrayfi ? "شكراً على اهتمامك بالانضمام إلينا." : "تم تسجيل طلبك بنجاح.",
      greeting: `مرحباً ${name}،`,
      intro: isHrayfi
        ? "شكراً لاهتمامك بالانضمام إلى FIXGAD كمقدم خدمات مستقل. توصلنا بمعلوماتك وسيقوم فريقنا بمراجعة طلبك."
        : "شكراً لاهتمامك بـ FIXGAD. توصلنا بطلب التسجيل في الولوج المبكر وسنبقيك على اطلاع بمستجدات الإطلاق.",
      nextTitle: "ماذا سيحدث بعد ذلك؟",
      next: isHrayfi
        ? "سيقوم فريقنا بمراجعة المعلومات التي أرسلتها. سنتواصل معك إذا احتجنا إلى معلومات إضافية. هذا التسجيل يعبر عن اهتمامك فقط، ولا يمثل عرض عمل أو ضماناً للقبول."
        : "سنشارك معك مستجدات الإطلاق المهمة ونخبرك عندما يصبح الولوج المبكر متاحاً في منطقتك. التسجيل لا يضمن الولوج الفوري.",
      location: "المدينة",
      tradeLabel: "المهنة الرئيسية",
      closing: "شكراً لأنك جزء مما نبنيه.",
      signature: "فريق FIXGAD",
      footer: "خدمات منزلية بطريقة أسهل. قريباً في المغرب.",
      help: "لديك سؤال؟ أجب على هذه الرسالة أو راسلنا عبر",
    },
  }[language];

  const isArabic = language === "ar";
  const direction = isArabic ? "rtl" : "ltr";
  const details = [
    `<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">${copy.location}</td><td style="padding:10px 0;text-align:${isArabic ? "left" : "right"};color:#17211d;font-size:14px;font-weight:600;">${city}</td></tr>`,
    ...(isHrayfi && trade
      ? [`<tr><td style="padding:10px 0;color:#64748b;font-size:13px;">${copy.tradeLabel}</td><td style="padding:10px 0;text-align:${isArabic ? "left" : "right"};color:#17211d;font-size:14px;font-weight:600;">${trade}</td></tr>`]
      : []),
  ].join("");

  const html = `<!doctype html>
<html lang="${language}" dir="${direction}">
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
        subject: `New FIXGAD early-access registration · ${registration.type === "hrayfi" ? "Hrayfi" : "Customer"} · ${registration.city}`,
        text: [
          "A new early-access registration has been received.",
          "",
          `Name: ${registration.name}`,
          `Email: ${registration.email}`,
          `City: ${registration.city}`,
          `Type: ${registration.type}`,
          ...(registration.primaryTrade ? [`Main profession: ${registration.primaryTrade}`] : []),
          `Registration ID: ${registration.id}`,
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
