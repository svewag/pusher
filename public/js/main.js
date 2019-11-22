import { urlBase64ToUint8Array } from './utils.js'

(async () => {
  const hasServiceWorkerSupport = 'serviceWorker' in navigator
  const hasPushManagerSupport = 'PushManager' in window
  const hasNotificationSupport = 'Notification' in window

  if (hasServiceWorkerSupport && hasPushManagerSupport && hasNotificationSupport) {
    const registration = await navigator.serviceWorker.register('/js/sw.js')

    console.log('Permission is', Notification.permission)

    const subscription = await registration.pushManager.getSubscription()
    console.log('Subscription', subscription)

    const requestPermission = async (event) => {
      event.preventDefault()

      await Notification.requestPermission()

      return false
    }

    let pushSubscription

    const subscribe = async (event) => {
      event.preventDefault()

      if (Notification.permission !== 'granted') {
        await requestPermission(event)
      }

      const subscribeOptions = {
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(
          'BINvvYRy3WY2aG4jID2u-YHC5K13kqOxyahDX0fkdpvS24M8KxDEmzXdB6aabnycHgozpRP00r8koEZTJGuhgIY'
        )
      }

      pushSubscription = await registration.pushManager.subscribe(subscribeOptions)

      console.log('pushSubscription', pushSubscription)

      if (pushSubscription && pushSubscription.endpoint) {
        const response = await fetch('/api/subscribe', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            pushSubscription
          })
        })
      }

      return false
    }

    document.getElementById('request_permission').addEventListener('click', requestPermission)
    document.getElementById('subscribe').addEventListener('click', subscribe)
  }
})()
