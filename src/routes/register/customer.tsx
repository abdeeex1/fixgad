import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { EarlyAccess } from "@/components/sections";

export const Route = createFileRoute("/register/customer")({
  staticData: { sitemap: true },
  head: () => pageHead("Customer early access — FIXGAD", "Register your interest in finding trusted Hrayfis through FIXGAD.", "/register/customer"),
  component: () => <EarlyAccess page initialRole="customer" />,
});
