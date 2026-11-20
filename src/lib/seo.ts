export function pageHead(title:string, description:string, path:string, noindex=false) {
 const fullTitle=title==='FIXGAD'?'FIXGAD — Better services. Built for Morocco.':`${title} — FIXGAD`;
 return {meta:[{title:fullTitle},{name:'description',content:description},{property:'og:title',content:fullTitle},{property:'og:description',content:description},{property:'og:type',content:'website'},{property:'og:url',content:path},{name:'twitter:card',content:'summary_large_image'},...(noindex?[{name:'robots',content:'noindex, follow'}]:[])],links:[{rel:'canonical',href:path}]};
}
