import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { AudienceSection,ModeBand,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/for-hrayfis')({staticData:{sitemap:true},head:()=>pageHead('For independent Hrayfis','Your skills deserve more opportunities. Discover the FIXGAD concept for independent skilled professionals in Morocco.','/for-hrayfis',false),component:Page});
function Page(){return <><AudienceSection mode="hrayfi" page/><ModeBand/><EarlyAccess/></>}
