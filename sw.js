// Service Worker para PWA
const CACHE_NAME = 'erick-adrian-pwa-v1';

const urlsToCache = [
    '/',
    '/index.html',
    '/styles.css',
    '/script.js',
    '/manifest.json',
    '/main.js',
    '/src/icono32.png',
    '/src/icono64.png',
    '/src/icono128.png',
    '/src/icono256.png',
    '/src/icono512.png',
    '/src/icono1024.png',
    '/src/icono96.png',
    '/src/icono192.png',
    '/src/icono144.png',
    '/src/icono384.png'
];

// instalar service worker
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
            .then(() => self.skipWaiting())
    );
});

// activar y limpiar cache viejo
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];

    e.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (!cacheWhitelist.includes(cacheName)) {
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches.match(e.request).then((response) => {
      if (response) {
        return response;
      }

      return fetch(e.request);
    })
  );
});