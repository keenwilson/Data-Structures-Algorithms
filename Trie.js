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
}

const trie = new Trie()
trie.insert('cat')
trie.insert('canada')

console.log('DONE', trie.contains(null))
