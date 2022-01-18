function Node(char) {
  this.value = char
  // children are stored as Map, where key is the letter and value is a TrieNode for that letter
  this.children = Array(26)
  // false by default, a green node means this flag is true
  this.isEndOfWord = false
}

class Trie {
  constructor() {
    this.root = new Node(null)
  }

  insert(word) {
    word = word.toLowerCase()
    let current = this.root

    for (let ch of word) {
      // calculate an index for each child
      // subtract the numerical value of character from each other
      let index = ch.charCodeAt(0) - 'a'.charCodeAt(0)

      if (!current.children[index]) {
        // If we don't have this child,
        // we are going to create it
        current.children[index] = new Node(ch)
      }
      // Then set current to point to that node
      current = current.children[index]
    }
  }
}

const trie = new Trie()
trie.insert('cat')
trie.insert('can')
console.log('DONE')
