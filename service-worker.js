const CACHE_NAME = "mip-vox-v3";
const CORE = ["./", "./index.html", "./about.html", "./voice.html", "./style.css",
  "./script.js", "./manifest.json", "./assets/logo.png", "./assets/logo-192.png",
  "./assets/logo-512.png", "./assets/whatsapp-qr.png"];

self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE_NAME).then((c) =>
    Promise.allSettled(CORE.map((u) => c.add(u)))));
  self.skipWaiting();
});

self.addEventListener("activate", (e) => {
  e.waitUntil(caches.keys().then((keys) =>
    Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))));
  self.clients.claim();
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== location.origin) return;
  e.respondWith(
    fetch(req).then((res) => {
      if (res && res.status === 200 && res.type === "basic") {
        const copy = res.clone();
        caches.open(CACHE_NAME).then((c) => c.put(req, copy));
      }
      return res;
    }).catch(() => caches.match(req).then((r) => r || caches.match("./index.html")))
  );
});