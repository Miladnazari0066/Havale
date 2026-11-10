const CACHE_NAME = 'havale-pwa-v1';
const urlsToCache = [
  './index.html',
  './manifest.json',
  'https://fonts.googleapis.com/css2?family=Vazirmatn:wght@300;400;700;900&display=swap'
];

self.addEventListener('install', event => {
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) return response;
        return fetch(event.request);
      })
  );
});