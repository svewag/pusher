const webpush = require('web-push')
import { Response, Request } from "express"

let queue: any = []

webpush.setVapidDetails(
  'mailto:svenw@posteo.de',
  'BINvvYRy3WY2aG4jID2u-YHC5K13kqOxyahDX0fkdpvS24M8KxDEmzXdB6aabnycHgozpRP00r8koEZTJGuhgIY',
  'Y7tXpR_TmbxLNMlkUvvODOqayD-i98q8jlPQ1it1cGw',
);

module.exports = (req: Request, res: Response) => {
  const action = req.params[0]

  switch (action) {
    case 'subscribe':
      queue.push(req.body)
      webpush.sendNotification(req.body.pushSubscription, 'Your Push Payload Text');
      break;
    default:
      break;
  }

  res.send(JSON.stringify({
    status: 'ok'
  }))
}
