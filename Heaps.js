var Utils = require('./Utils')
// Heaps are complete binary treemore efficient implementing with an array

class Heap {
  constructor() {
    this.items = Array(10).fill(null)
    this.size = 0

    this.insert = (value) => {
      console.log('insert is called', value)
      if (this.isFull()) {
        throw Utils.CustomException('The array is full')
      }
      // See which index to insert heap
      // Store new iteam in the next available slot
      this.items[this.size++] = value

      this._bubbleUp()
      console.log(this.items)
    }

    this._bubbleUp = () => {
      let index = this.size - 1
      // while index is greater than 0
      // if index is 0, parent index will be a negative number
      // if new item > item at parent index: bubble up
      console.log('this.items[index] -- > new item', this.items[index])
      console.log(
        'this.items[this._parent(index)] -- > current parent item',
        this.items[this._parent(index)],
      )
      console.log(
        'should swap?',
        this.items[index] > this.items[this._parent(index)],
      )
      while (index > 0 && this.items[index] > this.items[this._parent(index)]) {
        console.log('new item > parent: bubble up')

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

    this._parent = (index) => {
      // calculate an index to the parent dynamically
      return parseInt((index - 1) / 2)
    }

    this._swap = (first, second) => {
      console.log('swap item at index', first, 'and', second)
      let temp = this.items[first]
      this.items[first] = this.items[second]
      this.items[second] = temp
    }

    this.remove = (value) => {}
  }
}

const heap = new Heap()
heap.insert(10)
heap.insert(5)
heap.insert(17)
heap.insert(4)
heap.insert(22)
