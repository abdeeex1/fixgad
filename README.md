# FIXGAD — official public website

A public company and marketing website, not the FIXGAD marketplace. Built with React 19, TypeScript, TanStack Start and Tailwind CSS v4.

## Development

- `bun install`
- `bun dev` starts the local preview.
- `bun test` runs tests.

## Pages and languages

Home, how it works, customer and Hrayfi pages, services, about, early access and contact are separate routes. Privacy and terms are explicitly unpublished placeholders, excluded from the sitemap and marked noindex. Content is fully available in English, French and Arabic. The selected language persists on the device; Arabic sets document direction and typography. Initial server rendering is English.

## Early access — deliberately not connected

No backend, database, authentication, payments, form service or email-sending service is connected. The form validates full name, email, city and Customer/Hrayfi user type, without a phone field. It explicitly explains that no submission is sent or stored. Contact email links let visitors write directly to contact@fixgad.tech using their own email application; opening one is not proof of delivery.

`src/lib/early-access.ts` is the typed, Zod-validated future integration boundary. Replace the `not-connected` result only after the owner authorizes a real delivery integration. No personal data is logged or persisted. Email sending requires a verified sending domain and further owner permission; it is not currently configured.

## Map and media

The MapLibre map uses free OpenFreeMap Positron tiles with provider attribution intact. It is loaded after hydration and includes selectable sample category markers, zoom and recenter controls. Everything shown is illustrative, not live availability. Photos are generated visual representations, not identified customers or professionals. The supplied logo is preserved and used for the favicon. Optimized WebP imagery is served through Lovable Assets pointers.

## Design and accessibility

Semantic OKLCH tokens and shared styles live in `src/styles.css`. Montserrat headings, DM Sans body and Noto Sans Arabic load through root head links. Layouts support mobile, tablet, desktop, RTL, keyboard navigation and reduced motion.

## Search and deployment

Each content route has unique title, description and Open Graph metadata. `/sitemap.xml` derives eligible URLs from the router using the owner's supplied `https://fixgad.tech` origin. `public/robots.txt` preserves crawler access. Publish and connect the domain before expecting public search visibility. No registration or marketplace features are claimed live.
