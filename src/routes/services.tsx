import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { PageHeading,ServicesSection,MapSection,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/services')({staticData:{sitemap:true},head:()=>pageHead('Home services','Explore planned home service categories including plumbing, electrical work, carpentry, cleaning and renovation, starting with the Agadir pilot.','/services',false),component:Page});
function Page(){return <><PageHeading kind="services"/><ServicesSection all/><MapSection/><EarlyAccess/></>}
