var Utils = require('./Utils')

const employeeMap = {
  1: 'Mosh',
  2: 'Josh',
  3: 'Mary',
  4: null,
  null: null,
}

console.log('employeeMap', employeeMap)
const str = employeeMap[3]
console.log('str', str)
// containsKey
const a = employeeMap.hasOwnProperty(3)
console.log('employeeMap.hasOwnProperty(3)', a)

// containsValue
const containsValue = (obj, value) => {
  return Object.values(obj).indexOf(value) >= 0
}
const b = containsValue(employeeMap, 'Josh')
console.log('employeeMap.containsValue("Josh")', b)
const c = containsValue(employeeMap, 'Keen')
console.log('employeeMap.containsValue("Keen")', c)

console.log('Object.keys(obj)', Object.keys(employeeMap))
console.log('Object.entries(obj)', Object.entries(employeeMap))
