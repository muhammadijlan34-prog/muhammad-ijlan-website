/* ==========================================
   MUHAMMAD IJLAN
   FINAL LAUNCH READY
   service-worker.js
========================================== */

const CACHE_NAME = "muhammad-ijlan-v2.0.0";

const FILES_TO_CACHE = [

  "./",
  "./index.html",
  "./about.html",
  "./voice.html",

  "./style.css",
  "./script.js",
  "./manifest.json",

  "./assets/logo.png",
  "./assets/logo-192.png",
  "./assets/logo-512.png",
  "./assets/whatsapp-qr.png"

];

/* INSTALL */

self.addEventListener("install", (event) => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then((cache) => {

        return cache.addAll(FILES_TO_CACHE);

      })

  );

  self.skipWaiting();

});

/* ACTIVATE */

self.addEventListener("activate", (event) => {

  event.waitUntil(

    caches.keys().then((keys) => {

      return Promise.all(

        keys.map((key) => {

          if (key !== CACHE_NAME) {

            return caches.delete(key);

          }

        })

      );

    })

  );

  self.clients.claim();

});

/* FETCH */

self.addEventListener("fetch", (event) => {

  if (event.request.method !== "GET") return;

  event.respondWith(

    caches.match(event.request)

      .then((cachedResponse) => {

        if (cachedResponse) {

          return cachedResponse;

        }

        return fetch(event.request)

          .then((networkResponse) => {

            if (

              !networkResponse ||

              networkResponse.status !== 200 ||

              networkResponse.type !== "basic"

            ) {

              return networkResponse;

            }

            const responseClone = networkResponse.clone();

            caches.open(CACHE_NAME)

              .then((cache) => {

                cache.put(event.request, responseClone);

              });

            return networkResponse;

          });

      })

      .catch(() => {

        return caches.match("./index.html");

      })

  );

});