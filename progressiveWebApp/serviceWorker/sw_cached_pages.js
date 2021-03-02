// set as version 1, might have different sets of caches and this is used for tracking
const cacheName = 'v1';

// this is a manual way of caching all pages, not recommended to do it this way
const cacheAssets = [
  'index.html',
  'about.html',
  '/css/style.css',
  '/js/main.js',
];

// Call Install Event
self.addEventListener('install', e => {
  console.log('Service Worker: Installed');

  // cache all assets
  e.waitUntil(
    caches
      .open(cacheName) // cache label
      .then(cache => {
        console.log('Service Worker: Caching Files');
        cache.addAll(cacheAssets);
      })
      .then(() => self.skipWaiting())
  );
});

// Call Activate Event
self.addEventListener('activate', e => {
  console.log('Service Worker: Activated');
  // Remove unwanted caches
  e.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== cacheName) {
            console.log('Service Worker: Clearing Old Cache');
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Call Fetch Event
self.addEventListener('fetch', e => {
  console.log('Service Worker: Fetching');
  // show cache files if we are offline
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
