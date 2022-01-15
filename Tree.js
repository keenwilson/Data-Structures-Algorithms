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

    this.height = () => {
      return this._height(this.root)
    }

    this._height = (root) => {
      // Base Condition
      if (!root) {
        return -1
      }
      // If we reach the leaf node
      if (this._isLeaf(root)) {
        return 0
      }
      const max = Math.max(
        this._height(root.leftChild),
        this._height(root.rightChild),
      )
      console.log('max at value', root.value, max)
      return 1 + max
    }

    this._isLeaf = (node) => {
      return !node?.leftChild && !node?.rightChild
    }

    // O(n)
    this.min = () => {
      return this._min(this.root)
    }

    //  O(log n)
    this.minForBinarySearchTree = () => {
      if (this.root) {
        throw Utils.CustomException(
          'We cannot find a minimum value in an empty tree',
        )
      }
      let current = this.root
      let last = current
      while (current) {
        last = current
        // Keep going down the left subtree
        current = current.leftChild
      }
      // return the leftmost child
      return last.value
    }

    this._min = (root) => {
      if (!root) {
        return 0
      }
      // If we get to the leaf node
      // return the value of that node itself
      if (this._isLeaf(root)) {
        return root.value
      }

      let left = this._min(root.leftChild)
      let right = this._min(root.rightChild)

      return Math.min(Math.min(left, right), root.value)
    }
  }
}

const binarySearchTree = new Tree()
const testArray = [7, 4, 9, 1, 6, 8, 10]
testArray.forEach(binarySearchTree.insert)

// binarySearchTree.traversePreOrder()
// binarySearchTree.traverseInOrder()
// binarySearchTree.traversePostOrder()
const height = binarySearchTree.height()
console.log('height', height)

const min = binarySearchTree.min()
console.log('min', min)
