// Bunk Escape offline support: opens without internet after the first online visit.
const C='bunk-v18';
const CORE=['./','./index.html','https://cdn.jsdelivr.net/npm/mqtt@5.3.4/dist/mqtt.min.js','https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://fonts.googleapis.com/css2?family=Lilita+One&display=swap'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>Promise.all(CORE.map(u=>fetch(u,{cache:'no-store'}).then(r=>c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET'||!r.url.startsWith('http'))return;
 e.respondWith(fetch(r).then(res=>{if(res&&(res.ok||res.type==='opaque')){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp)).catch(()=>{})}return res}).catch(()=>caches.match(r,{ignoreSearch:true}).then(x=>x||caches.match('./index.html'))))});
