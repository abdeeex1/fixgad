import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { ContactSection } from '@/components/sections';
export const Route=createFileRoute('/contact')({staticData:{sitemap:true},head:()=>pageHead('Contact FIXGAD','Contact FIXGAD at contact@fixgad.tech for general inquiries or support@fixgad.tech for customer support.','/contact',false),component:Page});
function Page(){return <><ContactSection/></>}
