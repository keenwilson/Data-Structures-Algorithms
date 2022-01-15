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
      this._setHeight(root)
      // balance factor
      //  > 1 => left heavy
      //  < -1 => right heavy

      return this._balance(root)
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

    this._balance = (root) => {
      if (this._isLeftHeavy(root)) {
        console.log(root.value, 'is left heavy')
        if (this._balanceFactor(root.leftChild) < 0) {
          root.leftChild = this._rotateLeft(root.leftChild)
        }
        // Since the root is left heavy, perform right rotation
        return this._rotateRigh(root)
      } else if (this._isRightHeavy(root)) {
        if (this._balanceFactor(root.rightChild) > 0) {
          root.rightChild = this._rotateRight(root.rightChild)
        }
        // Since it is right heavy, perform left rotation
        console.log('left rotate on', root.value)
        return this._rotateLeft(root)
      }

      return root
    }

    this._setHeight = (node) => {
      node.height =
        Math.max(this._height(node.leftChild), this._height(node.rightChild)) +
        1
    }

    this._rotateLeft = (root) => {
      // Get a reference to the right child of a root node
      let newRoot = root.rightChild
      // Perform rotation
      root.rightChild = newRoot.leftChild
      newRoot.leftChild = root

      // Reset the height
      this._setHeight(root)
      this._setHeight(newRoot)

      return newRoot
    }
    this._rotateRight = (root) => {
      // Get a reference to the right child of a root node
      let newRoot = root.leftChild
      // Perform rotation
      root.leftChild = newRoot.rightChild
      newRoot.rightChild = root

      // Reset the height
      this._setHeight(root)
      this._setHeight(newRoot)

      return newRoot
    }
  }
}

let tree = new AVLTree()
tree.insert(10)
tree.insert(30)
tree.insert(20)
