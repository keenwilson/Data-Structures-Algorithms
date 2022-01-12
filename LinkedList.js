// Each node must contain some value
// and a pointer to the next node in the list.
class Node {
  constructor(value) {
    this.value = value
    this.next = null
  }
}

class LinkedList {
  #size
  constructor() {
    // declare fields
    this.first = null
    this.last = null
    this.#size = 0
  }

  #isEmpty() {
    return this.first == null
  }

  addLast(item) {
    // create a new node
    const node = new Node(item)
    // Check if the list is empty
    if (this.#isEmpty()) {
      // simply create a new node and assign it
      // assign both first and last to this new node
      this.first = this.last = node
    } else {
      // assign the node into the next pointer
      this.last.next = node
      // update last to point to this new node
      this.last = node
    }
    this.#size++
  }

  addFirst(item) {
    const node = new Node(item)
    if (this.#isEmpty()) {
      this.first = this.last = node
    } else {
      // We want a new node to point to our first node
      node.next = this.first
      // Set the first node to this new node
      this.first = node
    }
    this.#size++
  }

  indexOf(item) {
    // traverse through this list all the way to the end
    // as soon as we find a value, we return the index of the item
    let index = 0
    let current = this.first
    while (current != null) {
      if (current.value == item) return index
      // otherwise, set current to the next node
      // and increment index
      current = current.next
      index++
    }
    // if we cannot find node with this value
    return -1
  }

  contains(item) {
    return this.indexOf(item) != -1
  }

  removeFirst() {
    if (this.#isEmpty()) {
      throw new CustomException('No Such Element')
    }

    // If the list has a single item
    if (this.first == this.last) {
      this.first = this.last = null
    } else {
      // [10 --> 20 --> 30]
      // We need two different references
      // i.e., second is pointing to 20
      let second = this.first.next
      // now we can remove the link without losing track to a second point
      // because we have a second variable as a backup
      this.first.next = null
      this.first = second
    }

    this.#size--
  }

  #getPrevious(node) {
    var current = this.first
    while (current != null) {
      if (current.next == node) return current
      // otherwise, set the current to point to the next node
      current = current.next
    }
    // if we traverse the list to the end and we couldn't find the node
    return null
  }

  removeLast() {
    if (this.#isEmpty()) {
      throw new CustomException('No Such Element')
    }

    // If the list has a single node in this list
    if (this.first == this.last) {
      this.first = this.last = null
    } else {
      // [10 --> 20 --> 30]
      // last --> 30
      // previous --> 20
      // find a previos node, keep a reference so that we  can update last
      var previous = this.#getPrevious(this.last)
      this.last = previous
      // remove the link so that garbage collector remove the node in memoey
      this.last.next = null
    }

    this.#size--
  }

  // O(n)
  size() {
    return this.#size
  }

  toArray() {
    // create an empty array of length size
    // In JS, it is no need to initialize the length of the array.
    // It grows dynamically.
    let array = new Array(this.#size)
    var current = this.first
    let index = 0
    while (current != null) {
      array[index++] = current.value
      current = current.next
    }
    return array
  }

  reverse() {
    if (this.#isEmpty()) return
    // [10 --> 20 --> 30]
    // p c
    // n = c.next
    // c.next = p
    // [10 <-- 20 30]
    //  [30 --> 20 --> 10]
    let previos = this.first
    let current = this.first.next

    // Change the direction of the link
    while (current != null) {
      let next = current.next
      previos = current
      current.next = previos
      current = next
    }

    this.last = this.first
    this.last.next = null
    this.first = previos
  }

  getKthFromTheEnd(k) {
    if (this.#isEmpty()) {
      throw new CustomException('Illegal State Exception')
    }
    // declare two pointers
    let a = this.first
    let b = this.first

    for (var i = 0; i < k - 1; i++) {
      // Move b forward until the right distance from a
      b = b.next
      if (b == null) {
        throw new CustomException('Illegal Argument Exception')
      }
    }

    // Now we have a and b pointers at the right distance
    // move both of them forward until b reaches the last node
    while (b !== this.last) {
      a = a.next
      b = b.next
    }
    // once b reach the last node
    return a.value
  }
}

function CustomException(message) {
  const error = new Error(message)
  error.code = 'THIS_IS_A_CUSTOM_ERROR_CODE'
  return error
}

CustomException.prototype = Object.create(Error.prototype)

var list = new LinkedList()
list.addLast(10)
list.addLast(20)
list.addLast(30)
console.log(list)
list.addFirst(5)
console.log(list)
console.log(list.indexOf(10))
console.log(list.indexOf(30))
console.log(list.indexOf(40))
console.log(list.contains(40))
console.log(list.contains(10))
list.removeFirst()
console.log(list)
list.removeLast()
console.log(list)
console.log('THE CURRENT SIZE', list.size())
list.toArray()

var emptylist = new LinkedList()
try {
  emptylist.removeFirst()
} catch (error) {
  console.log(error.code, error.message)
}

var singleItemList = new LinkedList()
singleItemList.addLast(10)
singleItemList.removeFirst()
console.log('singleItemList', singleItemList)

// To run: node LinkedList.js

var reverseList = new LinkedList()
reverseList.addLast(10)
reverseList.addLast(20)
reverseList.addLast(30)
reverseList.reverse()

var kthList = new LinkedList()
kthList.addLast(10)
kthList.addLast(20)
kthList.addLast(30)
kthList.addLast(40)
kthList.addLast(50)
console.log('kthList', kthList.getKthFromTheEnd(0))
