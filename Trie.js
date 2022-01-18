class Node {
  constructor(char) {
    this.value = char
    // children are stored as Map, where key is the letter and value is a TrieNode for that letter
    this.children = {}
    // false by default, a green node means this flag is true
    this.isEndOfWord = false
  }

  hasChild = function (ch) {
    return this.children.hasOwnProperty(ch)
  }

  addChild = function (ch) {
    return (this.children[ch] = new Node(ch))
  }

  getChild = function (ch) {
    return this.children[ch]
  }

  getChildren = function () {
    return Object.keys(this.children)
  }

  hasChildren = function () {
    return Object.keys(this.children).length !== 0
  }

  removeChild = function (ch) {
    this.children.remove(ch)
  }
}

class Trie {
  constructor() {
    this.root = new Node(null)
  }

  insert(word) {
    word = word.toLowerCase()
    let current = this.root

    for (let ch of word) {
      if (!current.hasChild(ch)) {
        // If we don't have this child,
        // we are going to create it
        current.addChild(ch)
      }
      // Then set current to point to that node
      current = current.getChild(ch)
    }
    // mark the last inserted character as end of the word
    current.isEndOfWord = true
  }

  contains(word) {
    if (!word) {
      return false
    }

    word = word.toLowerCase()

    let current = this.root

    for (let ch of word) {
      if (!current.hasChild(ch)) {
        console.log(`could not find ${ch} in seq uence`)
        return false
      }

      current = current.getChild(ch)
    }
    return current.isEndOfWord
  }

  traverse() {
    this._traverse(this.root)
  }

  _traverse(root) {
    // pre-order: visit the root first
    console.log(root.value)
    for (let child of root.getChildren()) {
      this._traverse(root.children[child])
    }
  }

  remove(word) {
    if (!word) {
      return
    }
    this._remove(this.root, word, 0)
  }
  _remove(root, word, index) {
    if (index === word.length) {
      console.log('terminate recursion', root.value)
      root.isEndOfWord = false
      return
    }
    const ch = word.charAt(index)
    console.log('word.charAt(index)', ch)

    const child = root.getChild(ch)
    if (!child) {
      return
    }

    this._remove(child, word, index + 1)

    // check to see if this child node has any children
    if (!child.hasChildren() && !child.isEndOfWord) {
      root.removeChild(ch)
    }
    console.log(root.value)
  }
}

const trie = new Trie()
trie.insert('car')
trie.insert('care')
// trie.insert('cat')
// trie.insert('canada')
// trie.insert('care')
// trie.insert('dog')
// trie.insert('denmark')
// trie.insert('door')
// trie.insert('elephant')
// trie.insert('fox')
// trie.insert('fiber')
console.log('DONE', trie.contains(null))
trie.remove('car')
trie.contains('car')
trie.contains('care')
