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
    console.log('getChildren', Object.keys(this.children))
    return Object.keys(this.children).length === 0
      ? []
      : Object.keys(this.children)
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
      root.isEndOfWord = false
      return
    }
    const ch = word.charAt(index)

    const child = root.getChild(ch)
    if (!child) {
      return
    }

    this._remove(child, word, index + 1)

    // check to see if this child node has any children
    if (!child.hasChildren() && !child.isEndOfWord) {
      root.removeChild(ch)
    }
  }

  findWords(prefix) {
    let words = []
    let lastNode = this._findLastNodeOf(prefix)
    this._findWords(lastNode, prefix, words)
    return words
  }

  _findLastNodeOf(prefix) {
    if (!prefix) {
      return null
    }
    prefix = prefix.toLowerCase()
    let current = this.root
    for (let ch of prefix) {
      let child = current.getChild(ch)
      if (!child) {
        return null
      }
      current = child
    }
    return current
  }

  _findWords(root, prefix, words) {
    console.log(
      '_findWords is called at root of',
      root.value,
      'with prefix',
      prefix,
      'current words',
      words,
    )
    // pre-order traversal
    // check if root represents ends of word
    console.log('checking', root.value, root.isEndOfWord)
    if (root.isEndOfWord) {
      words.push(prefix)
      console.log('end of words --> add to words:', words)
    }

    for (let child of root.getChildren()) {
      console.log('root.children[child]', root.children[child])
      if (root.children[child].value) {
        // pass the value of the child node as prefix
        this._findWords(
          root.children[child],
          prefix + root.children[child].value,
          words,
        )
      }
    }
  }
}

const trie = new Trie()
trie.insert('car')
trie.insert('card')
trie.insert('care')
trie.insert('careful')
trie.insert('egg')
// trie.insert('cat')
// trie.insert('canada')
// trie.insert('care')
// trie.insert('dog')
// trie.insert('denmark')
// trie.insert('door')
// trie.insert('elephant')
// trie.insert('fox')
// trie.insert('fiber')
// console.log('DONE', trie.contains(null))
// console.log("trie.contains('car')", trie.contains('car'))
// console.log("trie.contains('care')", trie.contains('care'))
let words = trie.findWords('car')
console.log('car', words)

let words2 = trie.findWords('egg')
console.log('egg', words2)

let words3 = trie.findWords('')
console.log('', words3)
