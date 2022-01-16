var Utils = require('./Utils')
// Heaps are complete binary treemore efficient implementing with an array

class Heap {
  constructor() {
    this.items = Array(10).fill(null)
    this.size = 0

    this.insert = (value) => {
      if (this.isFull()) {
        throw Utils.CustomException('The array is full')
      }
      // See which index to insert heap
      // Store new iteam in the next available slot
      this.items[this.size++] = value

      this._bubbleUp()
    }

    this._bubbleUp = () => {
      let index = this.size - 1
      // while index is greater than 0
      // if index is 0, parent index will be a negative number
      // if new item > item at parent index: bubble up
      while (index > 0 && this.items[index] > this.items[this._parent(index)]) {
        this._swap(index, this._parent(index))
        // Re calculate an index
        // an index after bubbleUp will point to the parent node
        // The index after bubbleUp will be smaller and smaller
        index = this._parent(index)
      }
    }

    this.isFull = () => {
      return this.size == this.items.length
    }
    this.isEmpty = () => {
      return this.size == 0
    }

    this._parent = (index) => {
      // calculate an index to the parent dynamically
      return parseInt((index - 1) / 2)
    }

    this._swap = (first, second) => {
      let temp = this.items[first]
      this.items[first] = this.items[second]
      this.items[second] = temp
    }

    this._bubbleDown = () => {
      let index = 0
      // item (root) < children ==> bubbleDown
      while (index <= this.size && !this._isValidParent(index)) {
        // if the parent is invalid
        // swap with the larger child
        let largerChildIndex = this._largerChildIndex(index)
        this._swap(index, largerChildIndex)
        // reset the index to the larger child index, who now becomes a parent
        index = largerChildIndex
      }
    }

    this.remove = () => {
      // if the heap is empty
      if (this.isEmpty()) {
        throw Utils.CustomException('The heap is empty')
      }
      let root = this.items[0]
      // Remove the root node, which is the largest value
      // First, move the item at the last node to the root node
      // and decrement size by 1
      this.items[0] = this.items[--this.size]
      this._bubbleDown()
      return root
    }

    this._largerChildIndex = (index) => {
      if (!this._hasLeftChild(index)) {
        return index
      }
      if (!this._hasRightChild(index)) {
        // no right child? return the index of the left child
        return this._leftChild(index)
      }
      return this._leftChild(index) > this._rightChild(index)
        ? this._leftChildIndex(index)
        : this._rightChildIndex(index)
    }

    this._hasLeftChild = (index) => {
      return this._leftChildIndex(index) <= this.size
    }

    this._hasRightChild = (index) => {
      return this._rightChildIndex(index) <= this.size
    }
    this._isValidParent = (index) => {
      // parent has to greathan or equal both of its children
      if (!this._hasLeftChild(index)) {
        return true
      }

      let isValid = this.items[index] >= this._leftChild(index)

      if (this._hasRightChild(index)) {
        // no right child? just check that the value of this node is greater than the left child
        isValid &= this.items[index] >= this._rightChild(index)
      }
      return isValid
    }
    this._leftChild = (index) => {
      return this.items[this._leftChildIndex(index)]
    }
    this._rightChild = (index) => {
      return this.items[this._rightChildIndex(index)]
    }
    this._leftChildIndex = (index) => {
      return parseInt(index * 2) + 1
    }
    this._rightChildIndex = (index) => {
      return parseInt(index * 2) + 2
    }
  }
}

// const heap = new Heap()
// heap.insert(10)
// heap.insert(5)
// heap.insert(17)
// heap.insert(4)
// heap.insert(22)

// const maxHeap = new Heap()
// const numbers = [5,3,10,1,4,2]
// for (let n of numbers) {
//   maxHeap.insert(n)
// }
// for (let i = 0; i < numbers.length; i++ ) {
//   numbers[i] = maxHeap.remove()
// }
// console.log(numbers)

class PriorityQueueWithHeap {
  constructor() {
    this.heap = new Heap()
  }

  enqueue(item) {
    heap.insert(item)
  }

  dequeue() {
    return this.heap.remove()
  }

  isEmpty() {
    return this.heap.isEmpty()
  }
}

// transforming an array into a heap
// In a heap, every node should be greater than or equal to both children
// optimization: we don't have to perform this operation on the leaf node
// the taller a tree is, the more recursion we will have
// change the direction of the for loop to start at the last parent nde,
// we will have fewer recursion
class MaxHeap {
  constructor() {}
  heapify(array) {
    // loop over an array
    // make sure number is in the right position
    // else, bubble it down
    // use index of the last parent
    let lastParentIndex = array.length / 2 - 1
    for (let i = lastParentIndex; i >= 0; i--) {
      this._heapify(array, i)
    }
  }

  _heapify(array, index) {
    // first assume the root is the largest
    let largerIndex = index

    let leftIndex = parseInt(index * 2 + 1)
    // make sure that leftIndex and rightIndex don't fall outside of an array
    if (leftIndex < array.length && array[leftIndex] > array[largerIndex]) {
      // if left child is greater
      // reset a larger index to point to a left child
      largerIndex = leftIndex
    }

    let rightIndex = parseInt(index * 2 + 2)
    if (rightIndex < array.length && array[rightIndex] > array[largerIndex]) {
      // if right child is greater than current index
      // reset a larger index to point to a right child
      largerIndex = rightIndex
    }

    if (index == largerIndex) {
      // this item is in the right position
      // our recurssion is terminated here
      return
    }

    // swap
    this._swap(array, index, largerIndex)
    // recursively goes down the tree
    this._heapify(array, largerIndex)
  }

  _swap(array, first, second) {
    let temp = array[first]
    array[first] = array[second]
    array[second] = temp
  }
}

const maxHeap = new MaxHeap()
let numbers = [5, 3, 8, 4, 1, 2]
maxHeap.heapify(numbers)
console.log('numbers', numbers)
