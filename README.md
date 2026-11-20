# FIXGAD — official public website

A public company and marketing website, not the FIXGAD marketplace. Built with React 19, TypeScript, TanStack Start and Tailwind CSS v4.

## Development

- `bun install`
- `bun dev` starts the local preview.
- `bun test` runs tests.

## Pages and languages

Home, how it works, customer and Hrayfi pages, services, about, early access and contact are separate routes. Privacy and terms are explicitly unpublished placeholders, excluded from the sitemap and marked noindex. Content is fully available in English, French and Arabic. The selected language persists on the device; Arabic sets document direction and typography. Initial server rendering is English.

## Early access

The public form validates and submits full name, email, city and Customer/Hrayfi user type to a controlled Supabase RPC. Duplicate normalized email addresses are rejected by a unique database constraint. A 10-minute IP-based attempt limit provides basic abuse protection. No phone number or unnecessary personal information is collected.

The Supabase project must provide `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in local and Cloudflare environment settings. Use the publishable/anon key only; never configure or expose the service-role key in frontend or build variables.

Admin access is available at `/admin/early-access`. Create the administrator in Supabase Auth, then insert its user UUID and email into `public.early_access_admins`. The admin page has search, customer/Hrayfi filtering, status updates and CSV export. Registrations are protected by RLS and are not readable by anonymous visitors.

## Map and media

The MapLibre map uses free OpenFreeMap Positron tiles with provider attribution intact. It is loaded after hydration and includes selectable sample category markers, zoom and recenter controls. Everything shown is illustrative, not live availability. Photos are generated visual representations, not identified customers or professionals. The supplied logo is preserved and used for the favicon. Production images are served as local PNG assets from `public/images/`, with Cloudflare-safe absolute public paths.

## Design and accessibility

Semantic OKLCH tokens and shared styles live in `src/styles.css`. Montserrat headings, DM Sans body and Noto Sans Arabic load through root head links. Layouts support mobile, tablet, desktop, RTL, keyboard navigation and reduced motion.

## Search and deployment

Each content route has unique title, description and Open Graph metadata. `/sitemap.xml` derives eligible URLs from the router using the owner's supplied `https://fixgad.app` origin. `public/robots.txt` preserves crawler access. Publish and connect the domain before expecting public search visibility. No registration or marketplace features are claimed live.
