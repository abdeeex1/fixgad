export function pageHead(title: string, description: string, path: string, noindex = false) {
  const fullTitle =
    title === "FIXGAD" ? "FIXGAD — Better services. Built for Morocco." : `${title} — FIXGAD`;
  const canonical = `https://fixgad.app${path}`;
  return {
    meta: [
      { title: fullTitle },
      { name: "description", content: description },
      { property: "og:title", content: fullTitle },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: canonical },
      { property: "og:image", content: "https://fixgad.app/images/hero-hrayfi.png" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(noindex ? [{ name: "robots", content: "noindex, follow" }] : []),
    ],
    links: [{ rel: "canonical", href: canonical }],
  };
}
