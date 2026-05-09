const CACHE = 'todonono-v1';
const SHELL = ['/'];

// Installation — mise en cache de l'app shell
self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(SHELL)));
  self.skipWaiting();
});

// Activation — suppression des anciens caches
self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch — cache-first pour l'app, réseau pour les APIs externes
self.addEventListener('fetch', e => {
  const url = e.request.url;
  // Toujours réseau pour Firebase, APIs, fonts
  if (url.includes('firebase') || url.includes('googleapis') ||
      url.includes('groq.com') || url.includes('open-meteo') ||
      url.includes('fonts.g') || url.includes('gstatic')) {
    return;
  }
  e.respondWith(
    caches.match(e.request).then(cached => {
      if (cached) return cached;
      return fetch(e.request).then(res => {
        if (res.ok) {
          const clone = res.clone();
          caches.open(CACHE).then(c => c.put(e.request, clone));
        }
        return res;
      });
    })
  );
});
