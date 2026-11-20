import { createFileRoute, Link } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";

export const Route = createFileRoute("/register")({
  staticData: { sitemap: true },
  head: () => pageHead("Register for FIXGAD early access", "Choose customer or Hrayfi early-access registration.", "/register"),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <section className="section container audience-grid register-entry">
      <article>
        <span className="eyebrow">Customer early access</span>
        <h1>Find skilled Hrayfis for your home</h1>
        <p>Join the FIXGAD early-access list to receive updates before launch.</p>
        <Link to="/register/customer" className="admin-primary">Register as a customer</Link>
      </article>
      <article>
        <span className="eyebrow">Hrayfi early access</span>
        <h1>Join as an independent service provider</h1>
        <p>Tell us your profession, services and experience.</p>
        <Link to="/register/hrayfi" className="admin-primary">Register as a Hrayfi</Link>
      </article>
    </section>
  );
}
