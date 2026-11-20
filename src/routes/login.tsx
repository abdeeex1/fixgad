import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/login")({
  staticData: { sitemap: false },
  component: LoginPage,
});

function LoginPage() {
  return (
    <main className="admin-page">
      <meta httpEquiv="refresh" content="0; url=/admin/early-access" />
      <a href="/admin/early-access">Continue to FIXGAD administration</a>
    </main>
  );
}
