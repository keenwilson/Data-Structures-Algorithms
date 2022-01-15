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

    this.traversePreOrder = () => {
      this._traversePreOrder(this.root)
    }

    this._traversePreOrder = (root) => {
      // Base Condition to avoid a cycle
      if (!root) {
        console.log('That was the leaf: stop going forward, go back!')
        return
      }
      // root (print)
      console.log(`_traversePreOrder found root (${root.value})`)
      // left, recursively call the method itself
      this._traversePreOrder(root.leftChild)
      // right
      this._traversePreOrder(root.rightChild)
    }

    this.traverseInOrder = () => {
      this._traverseInOrder(this.root)
    }
    this._traverseInOrder = (root) => {
      // Base Condition to avoid a cycle
      if (!root) {
        console.log('That was the leaf: stop going forward, go back!')
        return
      }
      // left, recursively call the method itself
      this._traverseInOrder(root.leftChild)
      // root (print)
      console.log(`_traverseInOrder found root (${root.value})`)
      // right
      this._traverseInOrder(root.rightChild)
    }

    this.traversePostOrder = () => {
      this._traversePostOrder(this.root)
    }
    this._traversePostOrder = (root) => {
      // Base Condition to avoid a cycle
      if (!root) {
        console.log('That was the leaf: stop going forward, go back!')
        return
      }
      // left, recursively call the method itself
      this._traversePostOrder(root.leftChild)
      // right
      this._traversePostOrder(root.rightChild)
      // root (print)
      console.log(`_traversePostOrder found root (${root.value})`)
    }
  }
}

const binarySearchTree = new Tree()
const testArray = [7, 4, 9, 1, 6, 8, 10]
testArray.forEach(binarySearchTree.insert)

// binarySearchTree.traversePreOrder()
// binarySearchTree.traverseInOrder()
binarySearchTree.traversePostOrder()
