import { lazy, Suspense, useState, type FormEvent } from "react";
import { ClientOnly, Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  MapPin,
  Wrench,
  Check,
  Camera,
  Plus,
  Layers,
  Mail,
} from "lucide-react";
import { Button } from "./ui/button";
import { useLanguage } from "./language";
import { earlyAccessSchema } from "@/lib/early-access";
import { FIXGAD_TRADES } from "@/lib/trades";
const hero = "/images/hero-hrayfi.png";
const craft = "/images/craft-hands.png";
const bay = "/images/agadir-bay.png";
const customer = "/images/customer-home.png";
const hrayfi = "/images/hrayfi-street.png";
const plumbing = "/images/svc-plumbing.png";
const electrical = "/images/svc-electrical.png";
const ac = "/images/svc-ac.png";
const painting = "/images/svc-painting.png";
const carpentry = "/images/svc-carpentry.png";
const appliance = "/images/svc-appliance.png";
const cleaning = "/images/svc-cleaning.png";
const maintenance = "/images/svc-maintenance.png";
const gardening = "/images/svc-gardening.png";
const renovation = "/images/svc-renovation.png";
const DemoMap = lazy(() => import("./demo-map"));
const serviceImages = [
  plumbing,
  electrical,
  ac,
  painting,
  carpentry,
  appliance,
  cleaning,
  maintenance,
  gardening,
  renovation,
];
export function Hero() {
  const { t } = useLanguage();
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="eyebrow">
          <span className="status-dot" />
          {t.pilot}
        </div>
        <h1>
          {t.hero[0]}
          <br />
          {t.hero[1]}
          <br />
          <em>{t.hero[2]}</em>
        </h1>
        <p>{t.intro}</p>
        <div className="hero-buttons">
          <Button asChild variant="cta" size="lg">
            <Link to="/early-access">
              {t.early}
              <ArrowUpRight className="directional" />
            </Link>
          </Button>
          <Link to="/how-it-works" className="text-link">
            {t.discover}
            <ArrowRight className="directional" size={17} />
          </Link>
        </div>
        <div className="hero-location">
          <MapPin size={16} />
          <span>{t.tag}</span>
        </div>
      </div>
      <div className="hero-art">
        <img className="hero-photo" src={hero} alt={t.photoAlt} fetchPriority="high" />
        <div className="photo-caption">
          <span className="tiny-cross">✳</span>
          <span>{t.heroNote}</span>
        </div>
        <div className="hero-map-mini" aria-hidden="true">
          <div className="mini-street street-a" />
          <div className="mini-street street-b" />
          <div className="mini-street street-c" />
          <span className="mini-map-place">AGADIR</span>
          <span className="mini-pin pin-one">
            <Wrench size={18} />
          </span>
          <span className="mini-pin pin-two">
            <MapPin size={18} />
          </span>
          <span className="mini-pin pin-three">
            <Plus size={18} />
          </span>
        </div>
        <div className="hero-mission">
          <div className="hero-mission-top">
            <span className="tool-badge">
              <Wrench size={21} />
            </span>
            <span className="demo-pill">{t.sampleMission}</span>
          </div>
          <h3>{t.missionText}</h3>
          <p>
            <MapPin size={12} />
            {t.location}
          </p>
          <div className="offer-preview">
            <span className="avatar-initial">H</span>
            <div>
              <strong>{t.offer}</strong>
              <span>{t.sampleOffer}</span>
            </div>
            <Check size={16} />
          </div>
        </div>
        <span className="hero-demo">{t.demo}</span>
      </div>
    </section>
  );
}
export function BrandStrip() {
  const { t } = useLanguage();
  return (
    <div className="brand-strip">
      <span>FIXGAD</span>
      <span className="strip-symbol">✳</span>
      <p>{t.scroll}</p>
      <span className="strip-line" />
      <span>{t.starting}</span>
      <MapPin size={19} />
    </div>
  );
}
export function MapSection() {
  const { t } = useLanguage();
  return (
    <section className="section container map-section">
      <div className="section-heading">
        <div>
          <span className="eyebrow">{t.mapEyebrow}</span>
          <h2>{t.mapTitle}</h2>
        </div>
        <p>{t.mapText}</p>
      </div>
      <ClientOnly
        fallback={
          <div className="map-skeleton">
            <MapPin />
            {t.agadir}
          </div>
        }
      >
        <Suspense
          fallback={
            <div className="map-skeleton">
              <MapPin />
              {t.agadir}
            </div>
          }
        >
          <DemoMap />
        </Suspense>
      </ClientOnly>
    </section>
  );
}
export function HowSection() {
  const { t } = useLanguage();
  return (
    <section className="section how-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.howEyebrow}</span>
            <h2>{t.howTitle}</h2>
          </div>
          <p>{t.howText}</p>
        </div>
        <div className="steps-grid">
          {t.steps.map((title, i) => (
            <article className="step" key={title}>
              <div className={`step-visual step-visual-${i}`}>
                <span className="step-number">0{i + 1}</span>
                {i === 0 ? (
                  <div className="step-request">
                    <Camera size={25} />
                    <div>
                      <strong>{t.missionText}</strong>
                      <span>
                        <MapPin size={12} />
                        {t.location}
                      </span>
                    </div>
                    <Plus size={17} />
                  </div>
                ) : i === 1 ? (
                  <div className="step-offers">
                    {[t.offer, t.offer2].map((x, k) => (
                      <div className="step-offer" key={x}>
                        <span className="avatar-initial">{k ? "M" : "H"}</span>
                        <span>
                          <strong>{x}</strong>
                          <small>{t.sampleOffer}</small>
                        </span>
                        <Check size={15} />
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="step-chosen">
                    <span className="chosen-icon">
                      <Check size={25} />
                    </span>
                    <strong>{t.steps[2]}</strong>
                    <span>{t.preview}</span>
                  </div>
                )}
              </div>
              <h3>{title}</h3>
              <p>{t.stepText[i]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
export function ModeBand() {
  const { t } = useLanguage();
  return (
    <section className="mode-band container">
      <Layers size={25} />
      <div>
        <h3>{t.oneApp}</h3>
        <p>{t.oneText}</p>
      </div>
      <span className="mode-mark" aria-hidden="true">
        ↔
      </span>
    </section>
  );
}
export function AudienceSection({
  mode,
  page = false,
}: {
  mode: "customer" | "hrayfi";
  page?: boolean;
}) {
  const Heading = page ? "h1" : "h2";
  const { t } = useLanguage();
  const isCustomer = mode === "customer";
  return (
    <section className={`audience section ${isCustomer ? "" : "hrayfi-section"}`}>
      <div className="container audience-grid">
        <div className="audience-visual">
          <img
            src={isCustomer ? customer : hrayfi}
            loading="lazy"
            alt={isCustomer ? t.homeAlt : t.professionalAlt}
          />
          <div className="app-preview">
            <div className="app-top">
              <strong>
                FIXGAD<span>.</span>
              </strong>
              <span className="app-mode">{isCustomer ? t.customerMode : t.hrayfiMode}</span>
            </div>
            <div className="app-heading">
              <h4>{isCustomer ? t.myMissions : t.nearby}</h4>
              <MapPin size={16} />
            </div>
            <div className="app-row">
              <span className="tool-badge">
                <Wrench size={19} />
              </span>
              <div>
                <strong>{t.missionText}</strong>
                <span>{t.location}</span>
              </div>
            </div>
            <div className="app-photo-row">
              <img src={plumbing} alt={t.services[0]} loading="lazy" />
              <div>
                <Camera size={18} />
                <span>{isCustomer ? t.photos : t.portfolio}</span>
              </div>
            </div>
            <div className="app-action">
              {isCustomer ? t.compare : t.sendOffer}
              <ArrowUpRight size={17} />
            </div>
            <div className="app-disclaimer">{t.preview}</div>
          </div>
          <span className="visual-corner" aria-hidden="true">
            ✳
          </span>
        </div>
        <div className="audience-copy">
          <span className="eyebrow">{isCustomer ? t.customerLabel : t.hrayfiLabel}</span>
          <Heading>{isCustomer ? t.customerTitle : t.hrayfiTitle}</Heading>
          <p>{isCustomer ? t.customerText : t.hrayfiText}</p>
          <ul>
            {(isCustomer ? t.customerFeatures : t.hrayfiFeatures).map((item) => (
              <li key={item}>
                <span>
                  <Check size={13} />
                </span>
                {item}
              </li>
            ))}
          </ul>
          {!isCustomer && <p className="independent-note">{t.independentNote}</p>}
          <Button asChild variant="cta" size="lg">
            <Link to="/early-access">
              {isCustomer ? t.early : t.become}
              <ArrowUpRight className="directional" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
export function ServicesSection({ all = false }: { all?: boolean }) {
  const { t } = useLanguage();
  return (
    <section className="section services-section">
      <div className="container">
        <div className="section-heading">
          <div>
            <span className="eyebrow">{t.servicesLabel}</span>
            <h2>{t.servicesTitle}</h2>
          </div>
          <div>
            <p>{t.servicesText}</p>
            {!all && (
              <Link className="text-link" to="/services">
                {t.allServices}
                <ArrowUpRight className="directional" size={17} />
              </Link>
            )}
          </div>
        </div>
        <div className={`services-grid ${all ? "all-services" : ""}`}>
          {t.services.slice(0, all ? 10 : 5).map((name, i) => (
            <Link to="/early-access" className="service-tile" key={name}>
              <img src={serviceImages[i] ?? plumbing} loading="lazy" alt={name} />
              <span className="service-index">0{i + 1}</span>
              <div>
                <h3>{name}</h3>
                <ArrowUpRight className="directional" size={20} />
              </div>
            </Link>
          ))}
        </div>
        <p className="services-note">{t.servicesNote}</p>
      </div>
    </section>
  );
}
export function MoroccoSection() {
  const { t } = useLanguage();
  return (
    <section className="morocco-section">
      <div className="container morocco-grid">
        <div className="morocco-copy">
          <span className="eyebrow">{t.moroccoLabel}</span>
          <h2>{t.moroccoTitle}</h2>
          <p>{t.moroccoText}</p>
          <p>{t.moroccoText2}</p>
          <div className="morocco-origin">
            <MapPin size={18} />
            {t.starting}
            <span>↗</span>
            {t.ambition}
          </div>
        </div>
        <div className="morocco-images">
          <img className="craft-photo" src={craft} alt={t.craftAlt} loading="lazy" />
          <div className="agadir-photo">
            <img src={bay} alt={t.bayAlt} loading="lazy" />
            <span>
              <MapPin size={15} />
              {t.agadir}
            </span>
          </div>
          <div className="morocco-map" aria-label={t.ambition}>
            <svg viewBox="0 0 220 240" role="img">
              <path d="M170 15 190 30 180 57 161 76 157 99 140 123 134 146 111 166 97 184 83 218 23 218 25 199 47 171 60 145 77 124 88 103 104 91 123 81 132 61 151 45Z" />
              <circle cx="119" cy="114" r="5" />
              <path d="M119 114h52" className="map-leader" />
              <text x="153" y="107">
                {t.agadir.split(/[،,]/)[0]}
              </text>
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
export function AboutSection({ page = false }: { page?: boolean }) {
  const { t } = useLanguage();
  const Heading = page ? "h1" : "h2";
  return (
    <section className="section container about-section">
      <span className="eyebrow">{t.aboutLabel}</span>
      <div className="about-grid">
        <Heading>{t.aboutTitle}</Heading>
        <div>
          <p className="about-body">{t.aboutText}</p>
          <p className="about-signoff">{t.aboutText2}</p>
        </div>
      </div>
    </section>
  );
}
export function EarlyAccess({
  compact = false,
  page = false,
  initialRole = "customer",
}: {
  compact?: boolean;
  page?: boolean;
  initialRole?: "customer" | "hrayfi";
}) {
  const { t } = useLanguage();
  const Heading = page ? "h1" : "h2";
  const [role, setRole] = useState<"customer" | "hrayfi">(initialRole);
  const [status, setStatus] = useState<
    "idle" | "loading" | "error" | "duplicate" | "rate-limited" | "ready"
  >("idle");
  const [message, setMessage] = useState("");
  const [additionalTrades, setAdditionalTrades] = useState<string[]>([]);
  const [primaryTrade, setPrimaryTrade] = useState("");
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;
    const form = event.currentTarget;
    const data = new FormData(form);
    const input = {
      name: data.get("name"),
      email: data.get("email"),
      city: data.get("city"),
      type: role,
      phone: data.get("phone")?.toString() || "",
      preferredLanguage: data.get("preferredLanguage")?.toString() || undefined,
      primaryTrade: role === "hrayfi" ? data.get("primaryTrade")?.toString() : undefined,
      additionalTrades: role === "hrayfi" ? additionalTrades : undefined,
      experienceYears: role === "hrayfi" ? data.get("experienceYears")?.toString() : undefined,
      serviceDescription:
        role === "hrayfi" ? data.get("serviceDescription")?.toString() : undefined,
      customProfession:
        role === "hrayfi" ? data.get("customProfession")?.toString() : undefined,
    };
    if (!earlyAccessSchema.safeParse(input).success) {
      setStatus("error");
      setMessage(t.validation);
      return;
    }
    setStatus("loading");
    setMessage("");
    try {
      const response = await fetch("/api/early-access", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: input.name,
          email: input.email,
          city: input.city,
          type: input.type,
          phone: input.phone,
          preferredLanguage: input.preferredLanguage,
          primaryTrade: input.primaryTrade,
          additionalTrades: input.additionalTrades,
          experienceYears: input.experienceYears,
          serviceDescription: input.serviceDescription,
          customProfession: input.customProfession,
          website: data.get("website"),
        }),
      });
      const result = (await response.json()) as { status?: string; message?: string };
      if (response.ok && result.status === "success") {
        setStatus("ready");
        setMessage(
          "You're on the list! Thank you for your interest in FIXGAD. We'll keep you updated as we get closer to launch.",
        );
        form.reset();
        setRole("customer");
        return;
      }
      if (response.status === 409 || result.status === "duplicate") {
        setStatus("duplicate");
        setMessage("This email is already on the list. No need to register again.");
        return;
      }
      if (response.status === 429 || result.status === "rate_limited") {
        setStatus("rate-limited");
        setMessage("Too many attempts. Please wait a few minutes before trying again.");
        return;
      }
      setStatus("error");
      setMessage(result.message || "We couldn't save your registration. Please try again.");
    } catch {
      setStatus("error");
      setMessage("We couldn't connect right now. Please check your connection and try again.");
    }
  }
  return (
    <section className={`early-section ${compact ? "compact-early" : ""}`}>
      <div className="container early-grid">
        <div>
          <span className="eyebrow">{t.earlyLabel}</span>
          <Heading>{t.earlyTitle}</Heading>
          <p>{t.earlyText}</p>
          <div className="early-mark" aria-hidden="true">
            ✳
          </div>
          <span className="early-location">
            <MapPin size={17} />
            {t.tag}
          </span>
        </div>
        <form className="early-form" onSubmit={submit} noValidate>
          <div className="honeypot" aria-hidden="true">
            <label>
              Website
              <input name="website" tabIndex={-1} autoComplete="off" />
            </label>
          </div>
          <fieldset>
            <legend>{t.type}</legend>
            <div className="role-options">
              {(["customer", "hrayfi"] as const).map((value, i) => (
                <Button
                  key={value}
                  type="button"
                  variant="outline"
                  aria-pressed={role === value}
                  onClick={() => {
                    setRole(value);
                    setStatus("idle");
                  }}
                >
                  <span className="radio-dot" />
                  {t.roles[i]}
                </Button>
              ))}
            </div>
          </fieldset>
          <label>
            {t.name}
            <input
              name="name"
              autoComplete="name"
              required
              minLength={2}
              maxLength={100}
              placeholder={t.namePlaceholder}
            />
          </label>
          <label>
            {t.email}
            <input
              name="email"
              type="email"
              dir="ltr"
              autoComplete="email"
              required
              maxLength={255}
              placeholder={t.emailPlaceholder}
            />
          </label>
          <label>
            {t.city}
            <input
              name="city"
              autoComplete="address-level2"
              required
              minLength={2}
              maxLength={100}
              placeholder={t.cityPlaceholder}
            />
          </label>
          <label>
            Phone number <span className="optional-label">(optional)</span>
            <input name="phone" type="tel" autoComplete="tel" maxLength={30} />
          </label>
          {role === "hrayfi" && (
            <div className="hrayfi-fields">
              <label>
                Main profession / trade
                <select
                  name="primaryTrade"
                  required
                  value={primaryTrade}
                  onChange={(event) => setPrimaryTrade(event.target.value)}
                >
                  <option value="" disabled>
                    Select a profession
                  </option>
                  {FIXGAD_TRADES.map((trade) => (
                    <option key={trade} value={trade}>
                      {trade}
                    </option>
                  ))}
                </select>
              </label>
              {primaryTrade === "Other" && (
                <label>
                  Your profession
                  <input name="customProfession" required maxLength={100} />
                </label>
              )}
              <fieldset>
                <legend>Additional services</legend>
                <div className="trade-options">
                  {FIXGAD_TRADES.filter((trade) => trade !== "Other").map((trade) => (
                    <label className="trade-option" key={trade}>
                      <input
                        type="checkbox"
                        checked={additionalTrades.includes(trade)}
                        onChange={(event) =>
                          setAdditionalTrades((current) =>
                            event.target.checked
                              ? [...current, trade]
                              : current.filter((item) => item !== trade),
                          )
                        }
                      />
                      {trade}
                    </label>
                  ))}
                </div>
              </fieldset>
              <label>
                Years of experience
                <input name="experienceYears" type="number" min="0" max="60" step="1" />
              </label>
              <label>
                Short description <span className="optional-label">(optional)</span>
                <textarea name="serviceDescription" maxLength={1000} rows={4} />
              </label>
            </div>
          )}
          <Button type="submit" variant="cta" size="lg" disabled={status === "loading"}>
            {status === "loading" ? "Submitting..." : t.submit}
            <ArrowUpRight className="directional" />
          </Button>
          {status !== "idle" && status !== "loading" && status !== "ready" && (
            <p className="form-feedback error" role="alert">
              {message}
            </p>
          )}
          {status === "ready" && (
            <p className="form-feedback" role="status">
              {message}
            </p>
          )}
          <p className="form-note">{t.formNote}</p>
          <a className="email-link" href="mailto:contact@fixgad.tech">
            <Mail size={15} />
            {t.emailUs}
          </a>
        </form>
      </div>
    </section>
  );
}
export function ContactSection() {
  const { t } = useLanguage();
  return (
    <section className="section container contact-section">
      <span className="eyebrow">FIXGAD · {t.connect}</span>
      <h1>{t.contact}</h1>
      <p>{t.contactText}</p>
      <div className="contact-grid">
        <div>
          <span>{t.general}</span>
          <a href="mailto:contact@fixgad.tech" dir="ltr">
            contact@fixgad.tech
            <ArrowUpRight />
          </a>
        </div>
        <div>
          <span>{t.support}</span>
          <a href="mailto:support@fixgad.tech" dir="ltr">
            support@fixgad.tech
            <ArrowUpRight />
          </a>
        </div>
        <div>
          <span>{t.follow}</span>
          <a href="https://www.instagram.com/fixgad.ma/" target="_blank" rel="noreferrer">
            Instagram
            <ArrowUpRight />
          </a>
          <a href="https://www.tiktok.com/@fixgad.ma/" target="_blank" rel="noreferrer">
            TikTok
            <ArrowUpRight />
          </a>
          <p>{t.facebookNote}</p>
        </div>
      </div>
    </section>
  );
}
export function LegalSection({ type }: { type: "privacy" | "terms" }) {
  const { t } = useLanguage();
  return (
    <section className="section container legal-section">
      <span className="eyebrow">{type === "privacy" ? t.privacy : t.terms}</span>
      <h1>{t.legalTitle}</h1>
      <p>{t.legalText}</p>
      <a href="mailto:contact@fixgad.tech" dir="ltr">
        contact@fixgad.tech
      </a>
      <Link to="/" className="text-link">
        {t.back}
        <ArrowRight className="directional" />
      </Link>
    </section>
  );
}
export function PageHeading({
  kind,
}: {
  kind: "how" | "customers" | "hrayfis" | "services" | "about";
}) {
  const { t } = useLanguage();
  const titles = {
    how: t.howTitle,
    customers: t.customerTitle,
    hrayfis: t.hrayfiTitle,
    services: t.servicesTitle,
    about: t.aboutTitle,
  };
  return (
    <div className="page-heading container">
      <span className="eyebrow">FIXGAD · {t.tag}</span>
      <h1>{titles[kind]}</h1>
    </div>
  );
}
