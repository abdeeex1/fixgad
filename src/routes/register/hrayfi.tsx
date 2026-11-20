import { createFileRoute } from "@tanstack/react-router";
import { pageHead } from "@/lib/seo";
import { EarlyAccess } from "@/components/sections";

export const Route = createFileRoute("/register/hrayfi")({
  staticData: { sitemap: true },
  head: () => pageHead("Hrayfi early access — FIXGAD", "Register your trade and interest in joining FIXGAD as an independent service provider.", "/register/hrayfi"),
  component: () => <EarlyAccess page initialRole="hrayfi" />,
});
