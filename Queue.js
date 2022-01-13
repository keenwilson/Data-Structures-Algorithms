const Utils = require('./Utils')

class QueuePrototype {
  constructor() {
    const queue = []

    const add = (i) => {
      queue.push(i)
    }
    const remove = (i) => {
      const firstElement = queue.shift()
      return firstElement
    }

    const reverse = (inputQueue) => {
      if (!inputQueue || inputQueue.length === 0) {
        throw Utils.CustomException('No Input')
      }

      let stack = []
      // Loop as long as the input queue is not empty
      while (inputQueue.length !== 0) {
        const firstElement = inputQueue.shift()
        // Remove one item from the queue and push it on the top of our stack
        stack.push(firstElement)
      }
      // As long as the stack is not empty
      while (stack.length !== 0) {
        // Add item on top of the stack (last-in-first-out)
        inputQueue.push(stack.pop())
      }
      return inputQueue
    }
    this.queue = queue
    this.add = add
    this.remove = remove
    this.reverse = reverse
  }
}
const reverseQueue = new QueuePrototype()
reverseQueue.add(10)
reverseQueue.add(20)
reverseQueue.add(30)
console.log('queue', reverseQueue.queue)
console.log('reversed', reverseQueue.reverse(reverseQueue.queue))
