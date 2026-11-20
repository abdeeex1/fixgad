import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { PageHeading,AboutSection,MoroccoSection,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/about')({staticData:{sitemap:true},head:()=>pageHead('About FIXGAD','A Moroccan startup making local expertise easier to discover. Rooted in Morocco, starting in Agadir, with nationwide ambition.','/about',false),component:Page});
function Page(){return <><PageHeading kind="about"/><AboutSection/><MoroccoSection/><EarlyAccess/></>}
