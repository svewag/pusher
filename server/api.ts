const webpush = require('web-push')
import { Response, Request } from "express"
const subscriptionDB = require('./subscriptionDB')
const queue = require('./queue')

webpush.setVapidDetails(
  'mailto:svenw@posteo.de',
  'BINvvYRy3WY2aG4jID2u-YHC5K13kqOxyahDX0fkdpvS24M8KxDEmzXdB6aabnycHgozpRP00r8koEZTJGuhgIY',
  'Y7tXpR_TmbxLNMlkUvvODOqayD-i98q8jlPQ1it1cGw',
);

const sendNotification = (pushSubscription: any, { message }: { message: string }) => {
  return webpush.sendNotification(pushSubscription, message)
}

setInterval(function () {
  const entry = queue.next()
  if (entry) {
    sendNotification(entry.pushSubscription, { message: entry.data.message })
  }
}, 3000)

module.exports = (req: Request, res: Response) => {
  const action = req.params[0]

  switch (action) {
    case 'subscribe':
      subscriptionDB.add(req.body)
      res.send(JSON.stringify({
        status: 'ok'
      }))
      break;
    case 'queue':
      queue.add({
        ...req.body
      })
      res.send(JSON.stringify({
        status: 'ok'
      }))
      break;
    default:
      break;
  }
}
