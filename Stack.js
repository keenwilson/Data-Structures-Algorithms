var CustomException = require('./CustomException')
throw new CustomException('Hello World')
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
const reversedString = StringReverser.reverse('abcd')
console.log('reversedString', reversedString)
