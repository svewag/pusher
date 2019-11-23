document.querySelectorAll('[data-subscription]').forEach(function (element) {
  element.addEventListener('click', async function () {
    const response = await fetch('/api/queue', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        pushSubscription: JSON.parse(element.dataset.subscription),
        data: {
          message: 'foo bar',
        }
      })
    })
    location.reload()
  })
})
