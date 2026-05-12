const CACHE = "art-platform-v1";
const ASSETS = [
  "/",
  "/courses",
  "/courses/creative",
  "/courses/basic",
  "/gallery",
  "/create",
  "/auth",
  "/profile",
  "/manifest.json",
  "/icon.svg",
];

// Install: pre-cache core pages
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network first, fallback to cache, cache new responses
self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;

  // Skip non-http requests and API calls
  const url = new URL(event.request.url);
  if (url.pathname.startsWith("/api/")) return;
  if (url.origin !== location.origin) return;

  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const clone = response.clone();
        caches.open(CACHE).then((cache) => cache.put(event.request, clone));
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});
