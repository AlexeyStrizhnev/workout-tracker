const CACHE_NAME = 'workout-tracker-v4';
const urlsToCache = [
  '/',
  '/index.html',
  '/chart.js',
  '/chart.umd.js.map',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Установка Service Worker
self.addEventListener('install', (event) => {
  self.skipWaiting(); // Принудительная активация нового SW
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Активация Service Worker
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// Перехват запросов
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});