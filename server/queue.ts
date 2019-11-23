const QUEUE: Array<any> = []

module.exports.all = () => QUEUE
module.exports.add = (entry: any) => QUEUE.push(entry)
module.exports.next = () => QUEUE.shift()
