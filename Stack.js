var Utils = require('./Utils')

// The Array class has 2 methods that provide stack functionality
// push() and pop()
let stack = []
stack.push(10)
stack.push(20)
stack.push(30)
// console.log("stack", stack)
let top = stack.pop() // Remove and return the last item
// console.log("top", top)
// console.log("stack", stack)

// going back or doing something in a reverse order

class StringReverser {
  static reverse(input) {
    if (!input) {
      throw Utils.CustomException('No Input String')
    }
    // convert input string into an array
    let inputArray = [...input]
    let stack = []
    // push each character into a stack
    inputArray.forEach((char) => {
      stack.push(char)
    })

    let reversed = []
    // pop it one by one as long as the stack is not empty
    while (stack.length !== 0) {
      let last = stack.pop()
      console.log('last', last)
      reversed.push(last)
    }

    let reversedString = reversed.join('')
    return reversedString
  }
}
// const reversedString = StringReverser.reverse('abcd')
// console.log('reversedString', reversedString)
// try {
//   const noString = StringReverser.reverse('')
// } catch (error) {
//   console.log(error.code, error.message)
// }

// Balanced Expression
// Whether the pair and order of bracket are balanced
function BalandedExpression() {
  const _leftBrackets = ['(', '<', '{', '[']
  const _rightBrackets = [')', '>', '}', ']']

  const _isLeftBracket = (char) => {
    return _leftBrackets.includes(char)
  }
  const _isRightBracket = (char) => {
    return _rightBrackets.includes(char)
  }

  const _bracketsMatch = (left, right) => {
    return _leftBrackets.indexOf(left) == _rightBrackets.indexOf(right)
  }

  const isBalanced = (input) => {
    const charArray = [...input]
    let stack = []
    // Iterate over an input character array string, get each character at a time
    for (let char of charArray) {
      if (_isLeftBracket(char)) {
        // If it is an openning bracket, push it on the top of our stack
        stack.push(char)
      }
      if (_isRightBracket(char)) {
        // If it is a closing bracket
        // First, check if the stack is empty
        if (stack.length === 0) return false

        // Pop an item from the stack
        // and check if the brackets match
        let top = stack.pop()
        if (!_bracketsMatch(top, char)) {
          return false
        }
      }
    }
    return stack.length === 0
  }
  this.isBalanced = isBalanced
}
// const myPrototype = new BalandedExpression()
// const firstExample = myPrototype.isBalanced('(([1] + <2>)) [a]')
// console.log('(([1] + <2>)) [a]', firstExample, 'should be true')
// const second = myPrototype.isBalanced('(')
// console.log('(', second, 'should be false')
// const third = myPrototype.isBalanced('[[)]')
// console.log('[[)]', third, 'should be false')
// const forth = myPrototype.isBalanced('{[]}')
// console.log('{[]}', forth, 'should be true')

function StackImplementation() {
  let items = Array(5)
  console.log('StackImplementation items', items)
  let count = 0
  const push = (item) => {
    if (count == items.length) {
      throw Utils.CustomException('Stack Overflow Error')
    }
    items[count++] = item
  }
  const pop = () => {
    if (count == 0) {
      throw Utils.CustomException('Illefal State Exception')
    }
    return items[--count]
  }

  this.items = items
  this.push = push
  this.pop = pop
}
const myStackImplementation = new StackImplementation()
myStackImplementation.push(10)
myStackImplementation.push(20)
console.log('first', myStackImplementation.items)
myStackImplementation.push(30)
myStackImplementation.push(40)
myStackImplementation.push(50)

const popNumber = myStackImplementation.pop()
console.log('popNumber', popNumber)
console.log('second', myStackImplementation.items)
