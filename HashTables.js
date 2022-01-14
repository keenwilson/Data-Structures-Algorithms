var Utils = require('./Utils')

// Hash Map
const employeeMap = {
  1: 'Mosh',
  2: 'Josh',
  3: 'Mary',
  4: null,
  null: null,
}

const str = employeeMap[3]
// containsKey
const a = employeeMap.hasOwnProperty(3)
// console.log('employeeMap.hasOwnProperty(3)', a)

// containsValue
const containsValue = (obj, value) => {
  return Object.values(obj).indexOf(value) >= 0
}
const b = containsValue(employeeMap, 'Josh')
// console.log('employeeMap containsValue("Josh")', b)
const c = containsValue(employeeMap, 'Keen')
// console.log('employeeMap containsValue("Keen")', c)

// console.log('Object.keys(obj)', Object.keys(employeeMap))
// console.log('Object.entries(obj)', Object.entries(employeeMap))

// SET
// Remove duplicated
// [1, 2, 3, 3, 2, 1, 4, 5]
let set = {}
const numbers = [1, 2, 3, 3, 2, 1, 4, 5]
for (let number of numbers) {
  set[number] = true
}

function CharacterFinder() {
  // Find the First Non-repeated Character
  // A Green Apple

  const findFirstNonRepeatingChar = (str) => {
    // Create a map to character and integer
    let map = {}

    // Iterate over the sting
    const chars = str.toLowerCase()
    for (let char of chars) {
      // See if we already have count for this character in our hash table
      let count = map.hasOwnProperty(char) ? map[char] : 0
      map[char] = count + 1
    }

    for (let ch of chars) {
      // Look up this character in hash table
      if (map[ch] == 1) {
        return ch
      }
    }
    return null
  }

  const findFirstRepeatingChar = (str) => {
    // Create a set to character and integer
    let set = {}
    // Iterate over the sting
    const chars = str.toLowerCase()
    for (let char of chars) {
      if (set.hasOwnProperty(char)) {
        return char
      }
      set[char] = true
    }

    return null
  }
  this.findFirstNonRepeatingChar = findFirstNonRepeatingChar
  this.findFirstRepeatingChar = findFirstRepeatingChar
}
const charFinder = new CharacterFinder()
const firstNon = charFinder.findFirstNonRepeatingChar('A Green Apple')
const firstRepeating = charFinder.findFirstRepeatingChar('A Green Apple')

const hash = (number) => {
  return number % 100
}

const hashCodeExample = hash(123456)
// console.log("example hash function", example)

const hashCode = (key) => {
  let hash = 0

  for (let i = 0; i < key.length; i++) {
    let character = key.charCodeAt(i)
    // Shifts left by pushing zeros in from the right and let the leftmost bits fall off
    hash = (hash << 5) - hash + character
    console.log('first hash', hash)
    // Sets each bit to 1 if both bits are 1
    hash = hash & hash
    console.log('Convert to 32bit integer hash', hash)
  }
  return hash
}

class Entry {
  constructor(key, value) {
    this.key = key
    this.value = value
  }
}
class LinkedList {
  #size
  constructor() {
    // declare fields
    this.first = null
    this.last = null
    this.#size = 0
  }

  #isEmpty() {
    return this.first == null
  }
}
class HashTable {
  // HashTable
  // put(k,v)
  // get(k): v
  // remove(k)
  // k: int
  // v: string
  // Collissions: chaining
  // *Store both k and v together in a hash table
  // LinkedList<Entry>[] initialized on demand
  // [ LL, LL, LL, LL]
  constructor() {
    let entries = Array(5)

    this._hash = (key) => {
      // Figure out which index to store this key-value pair
      let positiveKey = Math.abs(key)
      return positiveKey % entries.length
    }
    this._addLast = (k, v, index) => {
      entries[index].push({ [k]: v })
    }
    this.put = (k, v) => {
      let index = this._hash(k)
      if (!entries[index]) {
        // Initialize that cell in the array
        entries[index] = []
        console.log('add', k, v, index)
        this._addLast(k, v, index)
      } else {
        console.log('index exists', index)
        let bucket = entries[index]
        for (let entry of bucket) {
          console.log('entry.hasOwnProperty(k)', entry.hasOwnProperty(k))
          if (entry.hasOwnProperty(k)) {
            console.log('same key found in bucket', entry, k)
            // Same key is found
            // Update the value to the new value
            console.log('Update the value to the new value')
            entry[k] = v
            console.log('Update the value to the new value', entry)
          } else {
            // If we dont' find an entry with the same key
            // add new key-value pair to the end of this new LL
            console.log('add', k, v, index)
            this._addLast(k, v, index)
            console.log('entries', entries)
            return
          }
        }
      }
      console.log('entries', entries)
    }

    this._getOrCreateBucket = (k) => {
      let index = this._hash(k)
      let bucket = entries[index]
      if (!bucket) {
        entries[index] = []
      }

      return bucket
    }
    this._getBucket = (k) => {
      return entries[this._hash(k)]
    }

    this._getEntry = (k) => {
      let bucket = this._getBucket(k)
      if (bucket) {
        for (let i = 0; i < bucket.length; i++) {
          if (bucket[i].hasOwnProperty(k)) {
            console.log('bucket[i].hasOwnProperty(k)', bucket[i], k)
            return bucket[i]
          }
        }
      }
      return null
    }
    this.get = (k) => {
      let entry = this._getEntry(k)
      return entry ? entry[k] : null
    }
    this.remove = (k) => {
      let entry = this._getEntry(k)
      if (!entry) {
        throw Utils.CustomException('No entry with key')
      }
      let index = this._hash(k)
      console.log('key', k, 'looking at index', index)

      let bucket = entries[index]
      console.log('bucket at that index', bucket)
      if (!bucket) {
        throw Utils.CustomException('No bucket at the index')
      }

      for (let i = 0; i < bucket.length; i++) {
        if (bucket[i].hasOwnProperty(k)) {
          console.log('bucket[i].hasOwnProperty(k)', bucket[i], k)
          bucket.splice(i, 1)
          break
        }
      }

      entries[index] = bucket
      console.log('entries', entries)
    }
  }
}

const testHashTable = new HashTable()
testHashTable.put(1, 'Mosh')
testHashTable.put(2, 'Josh')
testHashTable.put(3, 'Mary')
testHashTable.put(3, 'Marriana')
testHashTable.put(6, 'Hello')
const first = testHashTable.get(3)
console.log('get at key 3', first)
const second = testHashTable.get(6)
console.log('get at key 6', second)
const third = testHashTable.get(10)
console.log('get at key not exist', third)

testHashTable.remove(6)
testHashTable.remove(8)
