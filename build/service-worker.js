if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let s=Promise.resolve();return c[e]||(s=new Promise(async s=>{if("document"in self){const c=document.createElement("script");c.src=e,document.head.appendChild(c),c.onload=s}else importScripts(e),s()})),s.then(()=>{if(!c[e])throw new Error(`Module ${e} didn’t register its module`);return c[e]})},s=(s,c)=>{Promise.all(s.map(e)).then(e=>c(1===e.length?e[0]:e))},c={require:Promise.resolve(s)};self.define=(s,r,i)=>{c[s]||(c[s]=Promise.resolve().then(()=>{let c={};const t={uri:location.origin+s.slice(1)};return Promise.all(r.map(s=>{switch(s){case"exports":return c;case"module":return t;default:return e(s)}})).then(e=>{const s=i(...e);return c.default||(c.default=s),c})}))}}define("./service-worker.js",["./workbox-dce9cbc5"],(function(e){"use strict";self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"./editor.worker.js",revision:"a031439ec56cf9a4eae5e1a648aa675f"},{url:"./index.html",revision:"02ed55514ba268379ffe6a775c907bbe"},{url:"./json.worker.js",revision:"cc373d547f121c07a78147c12015b9ce"},{url:"./static/css/2.3f16f1f3.chunk.css",revision:"bc295c08e6b379c3fe091ea19efdbdc3"},{url:"./static/css/main.e3e1b685.chunk.css",revision:"289b7dfc971ddb3fbc33c4ec566e9176"},{url:"./static/js/2.89a945f1.chunk.js",revision:"3a55bae4fb47108ff28e96fb24736915"},{url:"./static/js/2.89a945f1.chunk.js.LICENSE.txt",revision:"c836aaadfe43dfd9fcb8ddeddfd61e18"},{url:"./static/js/3.d720a5ec.chunk.js",revision:"3eb02255001c02e3571f1766daaabae4"},{url:"./static/js/main.4b2efb8d.chunk.js",revision:"c6a49ece6cd4bb172719608cda2ab503"},{url:"./static/js/runtime-main.7fa9625f.js",revision:"a35bbdbafe4c97942f0047d888efb513"},{url:"./static/media/codicon.9242107d.ttf",revision:"a609dc0f334a7d4e64205247c4e8b97c"}],{}),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("./index.html"),{denylist:[/^\/_/,/\/[^/?]+\.[^/]+$/]}))}));
//# sourceMappingURL=service-worker.js.map