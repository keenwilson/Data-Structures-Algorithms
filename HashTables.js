var Utils = require('./Utils')

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
  this.findFirstNonRepeatingChar = findFirstNonRepeatingChar
}
const charFinder = new CharacterFinder()
const first = charFinder.findFirstNonRepeatingChar('A Green Apple')
console.log('first', first)
