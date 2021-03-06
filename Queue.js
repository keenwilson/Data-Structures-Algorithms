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
// const reverseQueue = new QueuePrototype()
// reverseQueue.add(10)
// reverseQueue.add(20)
// reverseQueue.add(30)
// console.log('queue', reverseQueue.queue)
// console.log('reversed', reverseQueue.reverse(reverseQueue.queue))

class ArrayQueue {
  constructor(capacity) {
    let items = Array(capacity)
    let _count = 0
    let _front = 0
    let _rear = 0

    const enqueue = (item) => {
      console.log('item', item)
      // If the queue is full
      if (_count == items.length) throw Utils.CustomException('Queue is full')
      items[_rear] = item
      _rear = (_rear + 1) % items.length
      console.log('new rear', _rear)
      _count++
    }
    const dequeue = () => {
      // return an item at the front of the queue
      let item = items[_front]
      console.log('item at the front', item)
      items[_front] = 0
      _front = (_front + 1) % items.length

      --_count
      return item
    }

    this.items = items
    this.enqueue = enqueue
    this.dequeue = dequeue
  }
}
// const example = new ArrayQueue(5)
// example.enqueue(10)
// example.enqueue(20)
// example.enqueue(30)
// console.log(example.items)
// example.dequeue()
// example.dequeue()
// console.log(example.items)
// example.enqueue(40)
// example.enqueue(50)
// example.enqueue(60)
// example.enqueue(70)
// console.log(example.items)

class QueueWithTwoStacks {
  constructor() {
    let _stack1 = []
    let _stack2 = []

    const enqueue = (item) => {
      _stack1.push(item)
    }

    const _moveStack1toStack2 = () => {
      console.log('_moveStack1toStack2 is called')
      if (_stack2.length === 0) {
        // stack2 is empty
        // move all items from stack1 to stack2
        while (_stack1.length !== 0) {
          _stack2.push(_stack1.pop())
        }
      }
    }
    const dequeue = () => {
      // if either stack is empty
      if (_stack1.length === 0 && _stack2.length === 0) {
        throw Utils.CustomException('Illegal State Exception')
      }
      _moveStack1toStack2()

      return _stack2.pop()
    }
    this.enqueue = enqueue
    this.dequeue = dequeue
  }
}

// const qwts = new QueueWithTwoStacks()
// qwts.enqueue(10)
// qwts.enqueue(20)
// qwts.enqueue(30)
// const first = qwts.dequeue()
// console.log('first', first)

class PriorityQueue {
  constructor(capacity) {
    let items = Array(capacity)
    let _count = 0

    const isEmpty = () => {
      return _count == 0
    }
    const remove = () => {
      console.log('remove is called')
      if (isEmpty()) {
        throw Utils.CustomException('Illegal state exception - count is zero')
      }

      return items[--_count]
    }

    const shiftItemsToInsert = (item) => {
      // This for-loop is for shifting items
      let i
      for (i = _count - 1; i >= 0; i--) {
        // each iteration
        // get item at the current index
        // If the item is greater than the value inserted
        // shift this item to the next index
        if (items[i] > item) {
          items[i + 1] = items[i]
        } else {
          // Insert a new item
          break
        }
      }
      // return index to insert new item
      return i + 1
    }

    const isFull = () => {
      return _count == items.length
    }

    const add = (item) => {
      if (isFull()) {
        throw Utils.CustomException('Illegal state exception - array is full')
      }
      // iterate the array from the end
      //  and find the right position to insert a new item
      let i = shiftItemsToInsert(item)

      // Insert a new item
      items[i + 1] = item
      _count++
    }

    this.add = add
    this.remove = remove
    this.isEmpty = isEmpty
  }
}

const priority = new PriorityQueue(5)
priority.add(5)
priority.add(3)
priority.add(6)
priority.add(1)
priority.add(4)
while (!priority.isEmpty()) {
  const first = priority.remove()
  console.log('first', first)
}
