const cacheName = 'get-lean-v1';
const assets = [
  'index.html',
  'getlean-functions.js',
  'manifest.json',
  'icon.png',
  'https://cdn.jsdelivr.net/npm/chart.js'
];

// Install Service Worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(assets))
  );
});

// Activate Service Worker
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => { if(key !== cacheName) return caches.delete(key); })
    ))
  );
});

// Fetch cached assets
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
