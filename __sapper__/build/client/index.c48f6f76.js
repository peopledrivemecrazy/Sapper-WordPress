import{S as t,i as s,s as e,e as r,t as l,b as n,f as o,g as a,d as h,h as c,j as f,k as u,l as i,a as p,q as d,c as g,n as m,m as v}from"./client.19517dc8.js";function E(t,s,e){const r=t.slice();return r[1]=s[e],r}function j(t){let s,e,p,d,g=t[1].title.rendered+"";return{c(){s=r("li"),e=r("a"),p=l(g),this.h()},l(t){s=n(t,"LI",{});var r=o(s);e=n(r,"A",{rel:!0,href:!0});var l=o(e);p=a(l,g),l.forEach(h),r.forEach(h),this.h()},h(){c(e,"rel","prefetch"),c(e,"href",d="blog/"+t[1].slug)},m(t,r){f(t,s,r),u(s,e),u(e,p)},p(t,s){1&s&&g!==(g=t[1].title.rendered+"")&&i(p,g),1&s&&d!==(d="blog/"+t[1].slug)&&c(e,"href",d)},d(t){t&&h(s)}}}function b(t){let s,e,i,b,x,q=t[0],w=[];for(let s=0;s<q.length;s+=1)w[s]=j(E(t,q,s));return{c(){s=p(),e=r("h1"),i=l("Recent posts"),b=p(),x=r("ul");for(let t=0;t<w.length;t+=1)w[t].c();this.h()},l(t){d('[data-svelte="svelte-hfp9t8"]',document.head).forEach(h),s=g(t),e=n(t,"H1",{});var r=o(e);i=a(r,"Recent posts"),r.forEach(h),b=g(t),x=n(t,"UL",{class:!0});var l=o(x);for(let t=0;t<w.length;t+=1)w[t].l(l);l.forEach(h),this.h()},h(){document.title="Blog",c(x,"class","svelte-1frg2tf")},m(t,r){f(t,s,r),f(t,e,r),u(e,i),f(t,b,r),f(t,x,r);for(let t=0;t<w.length;t+=1)w[t].m(x,null)},p(t,[s]){if(1&s){let e;for(q=t[0],e=0;e<q.length;e+=1){const r=E(t,q,e);w[e]?w[e].p(r,s):(w[e]=j(r),w[e].c(),w[e].m(x,null))}for(;e<w.length;e+=1)w[e].d(1);w.length=q.length}},i:m,o:m,d(t){t&&h(s),t&&h(e),t&&h(b),t&&h(x),v(w,t)}}}function x({params:t,query:s}){return this.fetch("https://sudo.anoram.com/madhu/wp-json/wp/v2/posts").then(t=>t.json()).then(t=>({posts:t}))}function q(t,s,e){let{posts:r}=s;return t.$$set=t=>{"posts"in t&&e(0,r=t.posts)},[r]}export default class extends t{constructor(t){super(),s(this,t,q,b,e,{posts:0})}}export{x as preload};