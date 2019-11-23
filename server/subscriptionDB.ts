let subscriptions: any = []

module.exports.all = () => {
  return subscriptions
}

module.exports.add = (subscription) => {
  subscriptions.push(subscription)
}
