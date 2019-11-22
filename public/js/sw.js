self.addEventListener('push', function (event) {
  self.registration.showNotification(event.data.text())
});
