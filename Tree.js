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

    this.equals = (other) => {
      if (!other) {
        return false
      }
      // Compare two nodes, make sure are equal
      // Then use recursion to make sure left and right sub trees are equal
      return this._equals(this.root, other.root)
    }

    // Pre-order traversal
    // root
    // left
    // right
    this._equals = (first, second) => {
      if (!first && !second) {
        return true
      }
      if (first && second) {
        return (
          first.value == second.value &&
          this._equals(first.leftChild, second.leftChild) &&
          this._equals(first.rightChild, second.rightChild)
        )
      }
      return false
    }

    this.swapRoot = () => {
      let temp = this.root.leftChild
      this.root.leftChild = this.root.rightChild
      this.root.rightChild = temp
    }

    this.isBinarySearchTree = () => {
      // Traverse the tree, visit each node only one
      // Check if the value is in the possible range
      return this._isBinarySearchTree(
        this.root,
        Number.MIN_VALUE,
        Number.MAX_VALUE,
      )
    }

    this._isBinarySearchTree = (node, min, max) => {
      if (!node) {
        console.log('Empty tree is binary search tree')
        return true
      }
      // root
      console.log('_isBinarySearchTree receive', min, node.value, max)
      console.log('node.value < min ', node.value < min)
      console.log('node.value > max', node.value > max)
      if (node.value < min || node.value > max) {
        console.log('out of range')
        return false
      }

      return (
        this._isBinarySearchTree(node.leftChild, min, node.value - 1) &&
        this._isBinarySearchTree(node.rightChild, node.value + 1, max)
      )
    }

    this.getNodesAtDistance = (distance) => {
      let list = []
      this._getNodesAtDistance(this.root, distance, list)
      return list
    }

    this._getNodesAtDistance = (root, distance, list) => {
      if (!root) {
        return
      }
      // Base Condition
      if (root && distance == 0) {
        list.push(root.value)
        return
      }

      this._getNodesAtDistance(root.leftChild, distance - 1, list)
      this._getNodesAtDistance(root.rightChild, distance - 1, list)
    }

    this.traverseLevelOrder = () => {
      for (var i = 0; i <= this.height(); i++) {
        for (let value of this.getNodesAtDistance(i)) {
          console.log(value)
        }
      }
    }
  }
}

const binarySearchTree = new Tree()
const testArray = [7, 4, 9, 1, 6, 8, 10]
testArray.forEach(binarySearchTree.insert)

// binarySearchTree.traversePreOrder()
// binarySearchTree.traverseInOrder()
// binarySearchTree.traversePostOrder()
// const height = binarySearchTree.height()
// console.log('height', height)

// const min = binarySearchTree.min()
// console.log('min', min)

const tree1 = new Tree()
tree1.insert(7)
tree1.insert(4)
tree1.insert(9)
tree1.insert(1)
tree1.insert(6)
tree1.insert(8)
tree1.insert(10)
// const list = tree1.getNodesAtDistance(2)
// console.log('list', list)
tree1.traverseLevelOrder()

// const tree2 = new Tree()
// tree2.insert(7)
// tree2.insert(4)
// tree2.insert(9)
// tree2.insert(1)
// tree2.insert(6)
// tree2.insert(8)
// tree2.insert(10)

// const isEqual = tree1.equals(null)
// console.log('isEqual', isEqual)

const tree3 = new Tree()
tree3.insert(20)
tree3.insert(10)
tree3.insert(30)
tree3.insert(21)
tree3.insert(6)
tree3.insert(3)
tree3.insert(4)
tree3.swapRoot()
// console.log('isBinarySearchTree', tree3.isBinarySearchTree())
