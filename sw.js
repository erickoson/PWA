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
    '/src/icono384.png',
    '/src/Projecto.mp4',
    'https://via.placeholder.com/300x200?text=E-Commerce+PWA',
    'https://via.placeholder.com/300x200?text=App+Tareas',
    'https://via.placeholder.com/300x200?text=Dashboard'
];

// Evento install: cachear recursos
self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                return cache.addAll(urlsToCache)
                    .then(() => {
                    self.skipWaiting();
                })
            })
            .catch(err => console.log('Error al cachear recursos:', err))
    );
});

// Evento activate: limpiar caches antiguos
self.addEventListener('activate', e => {
    const cacheWhitelist = [CACHE_NAME];
    e.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        console.log('Eliminando cache antiguo:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
        .then(() =>{
            self.clients.claim();
        })
    );
});

self.addEventListener('fetch', e =>{
    e.respodWith(
        cache.match(e.request)
            .then(response=> {
                if(response){
                    return response;
                }
            })
    )
})

// // Evento fetch: servir desde cache, actualizar desde red
// self.addEventListener('fetch', (event) => {
//     // Estrategia: Cache first, fall back to network
//     event.respondWith(
//         caches.match(event.request)
//             .then((response) => {
//                 if (response) {
//                     return response;
//                 }
                
//                 return fetch(event.request).then((response) => {
//                     // No cachear si la respuesta no es exitosa
//                     if (!response || response.status !== 200 || response.type !== 'basic') {
//                         return response;
//                     }
                    
//                     // Clonar la respuesta
//                     const responseToCache = response.clone();
                    
//                     caches.open(CACHE_NAME)
//                         .then((cache) => {
//                             cache.put(event.request, responseToCache);
//                         });
                    
//                     return response;
//                 });
//             })
//             .catch(() => {
//                 // Retornar página de offline si está disponible
//                 return new Response('Offline - Página no disponible', {
//                     status: 503,
//                     statusText: 'Service Unavailable',
//                     headers: new Headers({
//                         'Content-Type': 'text/plain'
//                     })
//                 });
//             })
//     );
// });

// // Escuchar mensajes desde la aplicación
// self.addEventListener('message', (event) => {
//     if (event.data && event.data.type === 'SKIP_WAITING') {
//         self.skipWaiting();
//     }
// });
