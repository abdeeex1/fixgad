import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { Hero,BrandStrip,MapSection,HowSection,ModeBand,AudienceSection,ServicesSection,MoroccoSection,AboutSection,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/')({staticData:{sitemap:true},head:()=>pageHead('FIXGAD','FIXGAD connects people with skilled independent Hrayfis nearby. A map-first home services marketplace, built for Morocco and starting in Agadir.','/'),component:Home});
function Home(){return <><Hero/><BrandStrip/><MapSection/><HowSection/><ModeBand/><AudienceSection mode="customer"/><AudienceSection mode="hrayfi"/><ServicesSection all/><MoroccoSection/><AboutSection/><EarlyAccess compact/></>}
