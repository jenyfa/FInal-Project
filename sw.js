const staticCache = "Static-cache-v15";
const dynamicCache = "Dynamic-cache-v15";

const assets = [
    "/",
    "/pages/index.html",
    "pages/counsel.html",
    "js/app.js",
    "sw.js",
    "/js/ui.js",
    "/js/materialize.min.js",
    "/css/app.css",
    "/css/materialize.min.css",
    "/images/homeworkicon128.png",
    "/images/homeworkicon48.png",
    "https://fonts.googleapis.com/icon?family=Material+Icons",
    "/favicon/favicon.ico",
    "/favicon/android-chrome-192x192.png",
    "/favicon/android-chrome-512x512.png",
    "/favicon/apple-touch-icon.png",
    "/favicon/favicon-16x16.png",
    "/favicon/favicon-32x32.png",
    "/favicon/site.webmanifest",
];

//Cache size limit
const limitCacheSize = (name, size) => {
  caches.open(name).then((cache) => {
    cache.keys().then((keys) => {
      if (keys.length > size) {
        cache.delete(keys[0]).then(limitCacheSize(name, size));
      }
    });
  });
};

self.addEventListener("install", function (event) {
  //fires when the browser install the app
  //here we're just logging the event and the contents of the object passed to the event.
  //the purpose of this event is to give the service worker a place to setup the local
  //environment after the installation completes.
  console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.open(staticCache).then(function (cache) {
      console.log("SW: Precaching App shell");
      cache.addAll(assets);
    })
  );
});

self.addEventListener("activate", function (event) {
  //fires after the service worker completes its installation.
  // It's a place for the service worker to clean up from
  // previous service worker versions.
  // console.log(`SW: Event fired: ${event.type}`);
  event.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys
          .filter((key) => key !== staticCache && key !== dynamicCache)
          .map((key) => caches.delete(key))
      );
    })
  );
});
//comment
self.addEventListener("fetch", function (event) {
  //fires whenever the app requests a resource (file or data)
  // console.log(`SW: Fetching ${event.request.url}`);
  //next, go get the requested resource from the network
  if (event.request.url.indexOf ("firestore.googleapis.com")=== -1){
    event.respondWith(
      caches
        .match(event.request)
        .then((response) => {
          return (
            response ||
            fetch(event.request).then((fetchRes) => {
              return caches.open(dynamicCache).then((cache) => {
                cache.put(event.request.url, fetchRes.clone());
                limitCacheSize(dynamicCache,15);
                return fetchRes;
              });
            })
          );
        })
        .catch(() => caches.match("/pages/fallback.html"))
      );
    }
  });
