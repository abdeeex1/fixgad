import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { AudienceSection,HowSection,MapSection,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/for-customers')({staticData:{sitemap:true},head:()=>pageHead('For customers','Find the right hands for your home. Discover how FIXGAD helps customers compare independent professionals, starting in Agadir.','/for-customers',false),component:Page});
function Page(){return <><AudienceSection mode="customer" page/><HowSection/><MapSection/><EarlyAccess/></>}
