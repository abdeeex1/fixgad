import { createFileRoute } from '@tanstack/react-router';
import { pageHead } from '@/lib/seo';
import { PageHeading,HowSection,MapSection,ModeBand,EarlyAccess } from '@/components/sections';
export const Route=createFileRoute('/how-it-works')({staticData:{sitemap:true},head:()=>pageHead('How FIXGAD works','Post a Mission, receive offers from nearby independent professionals and choose your Hrayfi.','/how-it-works',false),component:Page});
function Page(){return <><PageHeading kind="how"/><HowSection/><MapSection/><ModeBand/><EarlyAccess/></>}
