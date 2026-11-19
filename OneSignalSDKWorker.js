importScripts("https://cdn.onesignal.com/sdks/web/v16/OneSignalSDK.sw.js");
// Simpan salinan aplikasi supaya tetap bisa dibuka saat internet putus (ambil versi terbaru kalau online)
var CACHE = 'absensi-v1';
var FILES = ['./', 'index.html', 'config.js', 'manifest.json', 'icon-192.png', 'icon-512.png'];
self.addEventListener('install', function (e) { e.waitUntil(caches.open(CACHE).then(function (c) { return c.addAll(FILES); }).catch(function () {})); });
self.addEventListener('fetch', function (e) {
  var u = new URL(e.request.url);
  if (e.request.method !== 'GET' || u.origin !== self.location.origin) return;
  e.respondWith(fetch(e.request).then(function (r) {
    if (r && r.ok) { var c = r.clone(); caches.open(CACHE).then(function (x) { x.put(e.request, c); }); }
    return r;
  }).catch(function () {
    return caches.match(e.request, { ignoreSearch: true }).then(function (r) { return r || caches.match('index.html'); });
  }));
});
