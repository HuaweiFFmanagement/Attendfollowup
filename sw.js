// ── Huawei Field Force — Service Worker ──
// Versión: cambia este número cada vez que actualices el contenido
const CACHE_VERSION = 'hff-v3';
const CACHE_NAME = `asistente-hff-${CACHE_VERSION}`;

// Archivos que se guardan en caché para uso offline
const PRECACHE_ASSETS = [
  './index.html',
  './manifest.json'
];

// ── INSTALACIÓN: guarda los archivos en caché ──
self.addEventListener('install', function(event) {
  console.log('[SW] Instalando versión:', CACHE_VERSION);
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(PRECACHE_ASSETS);
    }).then(function() {
      // Activa el nuevo SW inmediatamente sin esperar
      return self.skipWaiting();
    })
  );
});

// ── ACTIVACIÓN: elimina cachés viejos ──
self.addEventListener('activate', function(event) {
  console.log('[SW] Activando versión:', CACHE_VERSION);
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames
          .filter(function(name) {
            // Elimina cualquier caché que no sea el actual
            return name.startsWith('asistente-hff-') && name !== CACHE_NAME;
          })
          .map(function(name) {
            console.log('[SW] Eliminando caché viejo:', name);
            return caches.delete(name);
          })
      );
    }).then(function() {
      // Toma control de todas las pestañas abiertas
      return self.clients.claim();
    })
  );
});

// ── FETCH: estrategia Network First (siempre intenta la red primero) ──
// Así cuando actualizas el HTML en GitHub, los celulares reciben la versión nueva
// y solo usan el caché si no hay conexión.
self.addEventListener('fetch', function(event) {
  // Solo maneja peticiones HTTP/HTTPS del mismo origen
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    fetch(event.request)
      .then(function(networkResponse) {
        // Si la red responde, actualiza el caché y devuelve la respuesta
        if (networkResponse && networkResponse.status === 200) {
          var responseClone = networkResponse.clone();
          caches.open(CACHE_NAME).then(function(cache) {
            cache.put(event.request, responseClone);
          });
        }
        return networkResponse;
      })
      .catch(function() {
        // Sin conexión → usa el caché
        return caches.match(event.request).then(function(cached) {
          if (cached) return cached;
          // Si es la página principal y no está en caché, retorna la del index
          if (event.request.mode === 'navigate') {
            return caches.match('./index.html');
          }
        });
      })
  );
});
