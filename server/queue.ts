const queue: Array<any> = []

module.exports.all = () => queue
module.exports.add = (entry) => queue.push(entry)
module.exports.next = () => queue.shift()
