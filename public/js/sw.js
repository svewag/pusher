self.addEventListener('push', function (event) {
  self.registration.showNotification(event.data.text(), {
    body: 'body',
    requireInteraction: true
  })
});

self.addEventListener('notificationclick', function (event) {
  console.log('clicked')
});
