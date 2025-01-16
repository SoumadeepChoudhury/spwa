self.addEventListener('install', (event) => {
    console.log('Service Worker installing...');
    event.waitUntil(self.skipWaiting());
  });
  
  self.addEventListener('activate', (event) => {
    event.waitUntil(self.clients.claim());
    console.log('Service Worker activated');
  });
  