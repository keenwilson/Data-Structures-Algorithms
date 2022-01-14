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
console.log('set', set)
console.log('keys in set', Object.keys(set))

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
      set[char] = set.hasOwnProperty(char) ? true : false
    }
    for (let ch of chars) {
      // Look up this character in hash table
      if (set[ch]) {
        return ch
      }
    }
    return null
  }
  this.findFirstNonRepeatingChar = findFirstNonRepeatingChar
  this.findFirstRepeatingChar = findFirstRepeatingChar
}
const charFinder = new CharacterFinder()
const firstNon = charFinder.findFirstNonRepeatingChar('A Green Apple')

const firstRepeating = charFinder.findFirstRepeatingChar('A Green Apple')
console.log('firstRepeating', firstRepeating)
