import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { LegalSection } from '@/components/sections';
export const Route=createFileRoute('/privacy')({staticData:{sitemap:false},head:()=>pageHead('Privacy policy — coming soon','The FIXGAD privacy policy is being prepared. Contact us with any privacy questions.','/privacy',true),component:Page});
function Page(){return <><LegalSection type="privacy"/></>}
