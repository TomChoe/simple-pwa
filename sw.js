const cacheName = "To-Do-App-v1";
const dataCacheName = "toDoApp-data";
const filesToCache = [
	'/',
	'/index.html',
	'/styles/bootstrap.min.css',
	'/scripts/main.js',
	'/scripts/bootstrap.min.js'
];

self.addEventListener('install', (e) => {
	e.waitUntil(
		caches.open(cacheName).then(cache => {
			console.log('service worker installed')
			return cache.addAll(filesToCache);
		})
		.then(() => {
			self.skipWaiting();
		})
	);
});

self.addEventListener('activate', (e) => {
	console.log('service worker activate')
	e.waitUntil(
		caches.keys().then(keyList => {
			return Promise.all(keyList.map(key => {
				if(key !== cacheName && key !== dataCacheName) {
					console.log('removing old cache', key);
					return caches.delete(key)
				}
			}));
		})
	);
	return self.clients.claim();
})

self.addEventListener('fetch', (e) => {
	console.log('Service Worker is fetching from ', e.request.url);
	const url ='http://localhost:3000/tasks';
	if(e.request.url.indexOf(dataUrl) > -1) {
		e.respondWith(
			caches.open(dataCacheName)
			  .then(cache => {
			  	console.log('this is the caching of fresh data', cache)
			  	return fetch(e.request)
			  	  .then(response => {
			  	  	console.log('this is the response from fresh ', response)
			  	  	cache.put(e.request.url, response.clone());
			  	  	return response;
			  	  })
			  })
		)
	} else {
		e.respondWith(
			console.log('fetching from the cache')
			caches.match(e.request)
		 	  .then(response => {
		  	    return response || fetch(e.request)
		 	  })
		);
	}
});




