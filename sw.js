const cacheName = "To-Do-App-v1";      // cache for local assets
const dataCacheName = "toDoApp-data";  // cache for dynamic data

const filesToCache = [				   // local assets
	'/',
	'/index.html',
	'/styles/bootstrap.min.css',
	'/scripts/main.js',
	'/scripts/bootstrap.min.js'
];

self.addEventListener('install', async e => {
	console.log('service worker install');
	const cache = await caches.open(cacheName);
	await cache.addAll(filesToCache);
})

self.addEventListener('activate', async e => {
	console.log('service worker activating');
	const keys = await caches.keys();

	await keys.map(key => {
		if (key !== cacheName) {
			console.log('removing old cache', key);
			caches.delete(key);
		}
	});
	return self.clients.claim();
})

self.addEventListener('fetch', async e => {
	console.log('service worker fetch', e.request);
	const req = e.request;
	const dataUrl = 'http://localhost:3000/tasks';

	if(req.url.indexOf(dataUrl) > -1) {
		e.respondWith(networkFirst(req));
	} else {
		e.respondWith(cacheFirst(req));
	}
});

async function cacheFirst(req) {
	console.log('cache first');
	const cache = await caches.open(cacheName);
	const cachedResponse = await cache.match(req);
	return cachedResponse || networkFirst(req);
};

async function networkFirst(req) {
	console.log('network first');
	const cache = await caches.open(cacheName);
	try {
		console.log('fetching fresh data')
		const fresh = await fetch(req);
		cache.put(req, fresh.clone());
		return fresh;
	} catch (e) {
		console.log('falling back to cached data')
		const cachedResponse = await cache.match(req);
		return cachedResponse
	}
};

// interacting with the push notification api
self.addEventListener('notificationclose', (e) => {
	let notification = e.notification;
	let primaryKey = notification.data.primaryKey;

	console.log('Closed notification: ' + primaryKey);
})


// self.addEventListener('install', (e) => {
// 	e.waitUntil(
// 		caches.open(cacheName).then(cache => {
// 			console.log('service worker installed')
// 			return cache.addAll(filesToCache);
// 		})
// 		.then(() => {
// 			self.skipWaiting();
// 		})
// 	);
// });

// self.addEventListener('activate', (e) => {
// 	console.log('service worker activate')
// 	e.waitUntil(
// 		createDB(),
// 		caches.keys().then(keyList => {
// 			console.log('caching')
// 			return Promise.all(keyList.map(key => {
// 				if(key !== cacheName && key !== dataCacheName) {
// 					console.log('removing old cache', key);
// 					return caches.delete(key)
// 				}
// 			}));
// 		})
// 	);
// 	return self.clients.claim();
// })

// self.addEventListener('fetch', (e) => {
// 	console.log('Service Worker is fetching from ', e.request.url);
// 	const dataUrl ='http://localhost:3000/tasks';
// 	if(e.request.url.indexOf(dataUrl) > -1) {
// 		e.respondWith(
// 			caches.open(dataCacheName)
// 			  .then(cache => {
// 			  	console.log('this is the caching of fresh data', cache)
// 			  	return fetch(e.request)
// 			  	  .then(response => {
// 			  	  	console.log('this is the response from fresh ', response)
// 			  	  	cache.put(e.request.url, response.clone());
// 			  	  	return response;
// 			  	  })
// 			  })
// 		)
// 	} else {
// 		e.respondWith(
// 			caches.match(e.request)
// 		 	  .then(response => {
// 		 	  	console.log('this getting old cache')
// 		  	    return response || fetch(e.request)
// 		 	  })
// 		);
// 	}
// });

// const createDB = () => {
// 	console.log('creating indexedDB');
// }