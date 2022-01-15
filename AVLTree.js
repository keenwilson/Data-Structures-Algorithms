class AVLNode {
  constructor(value) {
    this.value = value
    this.leftChild = null
    this.rightChild = null
    this.height = 0
  }
}

class AVLTree {
  // compare the height of the left and right sub tree
  // of every node, and ensure that
  // the difference is not more than 1
  constructor() {
    this.root = null

    this.insert = (value) => {
      this.root = this._insert(this.root, value)
    }

    this._insert = (root, value) => {
      // if the tree is empty
      if (root === null) {
        root = new AVLNode(value)
        return root
      }
      // Go down the tree until we find the right place
      // to put a new node
      // Append new node as a child of a root node
      if (value < root.value) {
        root.leftChild = this._insert(root.leftChild, value)
      } else {
        root.rightChild = this._insert(root.rightChild, value)
      }
      // Once we done, we recursively go back up
      // On the way back up
      // Update the height of every node
      // until we get to the root node
      root.height =
        Math.max(this._height(root.leftChild), this._height(root.rightChild)) +
        1

      // balance factor
      //  > 1 => left heavy
      //  < -1 => right heavy
      let balanceFactor = this._balanceFactor(root)
      if (this._isLeftHeavy(root)) {
        console.log(root.value, 'is left heavy')
      } else if (this._isRightHeavy(root)) {
        console.log(root.value, 'is right heavy')
      }

      return root
    }

    this._height = (node) => {
      // the height of an empty tree is -1
      return !node ? -1 : node.height
    }

    this._isLeftHeavy = (node) => {
      return this._balanceFactor(node) > 1
    }
    this._isRightHeavy = (node) => {
      return this._balanceFactor(node) < -1
    }
    this._balanceFactor = (node) => {
      // An empty tree is balance
      return !node
        ? 0
        : this._height(node.leftChild) - this._height(node.rightChild)
    }
  }
}

let tree = new AVLTree()
tree.insert(30)
tree.insert(20)
tree.insert(10)

console.log('tree.root', tree.root)
