self.addEventListener('install', (e) => {
    const cachePromesa = caches.open('cache-v1').then(cache => {
        return cache.addAll([
            '/',
            '/index.html',
            'https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css',
            '/img/logo.jpg',
            '/js/app.js',
            '/js/geo.js',
            '/js/photo.js',
            '/favicon.ico',
            '/manifest.json'
        ]);
    });
    e.waitUntil(cachePromesa);
});

self.addEventListener('fetch', (e) => {
const respuesta = fetch(e.request).then(res => {
        if (res) {
            caches.open('cache-v1').then(cache => {
                if (caches.match(e.request.url)) cache.delete(e.request.url);
                cache.put(e.request.url, res);
            });
            return res.clone();
        }
        return caches.match(e.request);
    }).catch(() => caches.match(e.request));
    e.respondWith(respuesta);
})