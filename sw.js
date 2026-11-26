// Cache-first app shell so the app opens offline. Bump VERSION on every release.
const VERSION = 'financas-v5';
const SHELL = ['./', 'index.html', 'app.js', 'firebase-config.js', 'manifest.webmanifest', 'icons/icon-192.png', 'icons/icon-512.png', 'icons/apple-touch-icon.png', 'vendor/anthropic.js', 'vendor/firebase.js', 'vendor/pdf.min.js', 'vendor/pdf.worker.min.js'];
self.addEventListener('install', e => { e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting())); });
self.addEventListener('activate', e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener('fetch', e => {
  const u = new URL(e.request.url);
  if (e.request.method !== 'GET') return;
  if (u.origin === location.origin) {
    // Network first for the page itself (gets updates), cache first for everything else.
    if (e.request.mode === 'navigate' || /\/(app|firebase-config)\.js$/.test(u.pathname)) {
      const key = e.request.mode === 'navigate' ? 'index.html' : u.pathname.split('/').pop();
      e.respondWith(fetch(e.request).then(r => { if (r.ok) { const c = r.clone(); caches.open(VERSION).then(x => x.put(key, c)); } return r; }).catch(() => caches.match(key)));
    } else {
      e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
    }
  } else if (/fonts\.(googleapis|gstatic)\.com$/.test(u.hostname)) {
    e.respondWith(caches.open(VERSION).then(c => c.match(e.request).then(r => r || fetch(e.request).then(n => { c.put(e.request, n.clone()); return n; }))));
  }
});
