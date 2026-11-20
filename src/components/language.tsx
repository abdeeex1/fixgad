import { createContext, useContext, useEffect, useState, type ReactNode } from 'react';
import { content, type Language, type Copy } from '@/lib/content';
const LanguageContext = createContext<{lang:Language; setLang:(lang:Language)=>void; t:Copy}>({lang:'en',setLang:()=>{},t:content.en});
export function LanguageProvider({children}:{children:ReactNode}) {
 const [lang,setLang] = useState<Language>('en');
 useEffect(()=>{const saved=localStorage.getItem('fixgad-language'); if(saved==='en'||saved==='fr'||saved==='ar')setLang(saved);},[]);
 useEffect(()=>{document.documentElement.lang=lang; document.documentElement.dir=lang==='ar'?'rtl':'ltr';},[lang]);
 function changeLanguage(value:Language){setLang(value);localStorage.setItem('fixgad-language',value);}
 return <LanguageContext.Provider value={{lang,setLang:changeLanguage,t:content[lang]}}>{children}</LanguageContext.Provider>;
}
export const useLanguage=()=>useContext(LanguageContext);
