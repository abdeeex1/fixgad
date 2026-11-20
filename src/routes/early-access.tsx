import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/early-access')({staticData:{sitemap:true},head:()=>pageHead('Early access','Discover early access to FIXGAD in Agadir for customers and independent Hrayfis. Registration preview only; no data is stored.','/early-access',false),component:Page});
function Page(){return <><EarlyAccess page/></>}
