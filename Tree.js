var Utils = require('./Utils')

// Node class
class Node {
  constructor(value) {
    this.value = value
    this.leftChild = null
    this.rightChild = null
  }
}

class Tree {
  constructor() {
    // root of a binary search tree
    this.root = null
    this._toString = (node) => {
      console.log(`Node = ${node.value}`)
    }

    this.insert = (value) => {
      var node = new Node(value)
      if (this.root === null) {
        // root is null then node will
        // be added to the tree and made root.
        this.root = node
        return
      }

      let current = this.root
      while (true) {
        if (value < current.value) {
          if (current.leftChild === null) {
            // we found the parent
            current.leftChild = node
            break
          }
          // otherwise, go one level down
          current = current.leftChild
        } else {
          if (current.rightChild === null) {
            // we found the parent
            current.rightChild = node
            break
          }
          // otherwise, go one level down
          current = current.rightChild
        }
      }
    }

    this.find = (value) => {
      let current = this.root
      while (current) {
        if (value < current.value) {
          // go to the left sub tree
          if (current.leftChild) {
            current = current.leftChild
          } else {
            return false
          }
        } else if (value > current.value) {
          // go to the right sub tree
          if (current.rightChild) {
            current = current.rightChild
          } else {
            return false
          }
        } else {
          return true
        }
      }
      return false
    }
  }
}

const binarySearchTree = new Tree()
const testArray = [10, 5, 15, 6, 1, 8, 12, 18, 17]
testArray.forEach(binarySearchTree.insert)

console.log('find 17', binarySearchTree.find(17))
console.log('find 39', binarySearchTree.find(39))
