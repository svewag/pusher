const subscriptionDB = require('./subscriptionDB')
const queue = require('./queue')

module.exports = (req: any, res: any) => {
  res.render('pages/admin', {
    subscriptions: subscriptionDB.all(),
    queue: queue.all(),
  })
}
