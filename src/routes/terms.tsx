import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { LegalSection } from '@/components/sections';
export const Route=createFileRoute('/terms')({staticData:{sitemap:false},head:()=>pageHead('Terms — coming soon','The FIXGAD terms are being prepared. Contact us for questions before launch.','/terms',true),component:Page});
function Page(){return <><LegalSection type="terms"/></>}
