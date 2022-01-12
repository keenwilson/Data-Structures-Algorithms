// Each node must contain some value
// and a pointer to the next node in the list.
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.first = null;
    this.last = null;
  }

  _isEmpty() {
    return this.first == null;
  }

  addLast(item) {
    // create a new node
    const node = new Node(item);
    // Check if the list is empty
    if (this._isEmpty()) {
      // simply create a new node and assign it
      // assign both first and last to this new node
      this.first = this.last = node;
    } else {
      // assign the node into the next pointer
      this.last.next = node;
      // update last to point to this new node
      this.last = node;
    }
  }

  addFirst(item) {
    const node = new Node(item);
    if (this._isEmpty()) {
      this.first = this.last = node;
    } else {
      // We want a new node to point to our first node
      node.next = this.first;
      // Set the first node to this new node
      this.first = node;
    }
  }

  indexOf(item) {
    // traverse through this list all the way to the end
    // as soon as we find a value, we return the index of the item
    let index = 0;
    let current = this.first;
    while (current != null) {
      if (current.value == item) return index;
      // otherwise, set current to the next node
      // and increment index
      current = current.next;
      index++;
    }
    // if we cannot find node with this value
    return -1;
  }

  contains(item) {
    return this.indexOf(item) != -1;
  }

  removeFirst() {
    if (this._isEmpty()) {
      throw new CustomException("No Such Element");
    }

    // If the list has a single item
    if (this.first == this.last) {
      this.first = this.last = null;
      return;
    }
    // [10 --> 20 --> 30]
    // We need two different references
    // i.e., second is pointing to 20
    let second = this.first.next;
    // now we can remove the link without losing track to a second point
    // because we have a second variable as a backup
    this.first.next = null;
    this.first = second;
  }

  _getPrevious(node) {
    var current = this.first;
    while (current != null) {
      if (current.next == node) return current;
      // otherwise, set the current to point to the next node
      current = current.next;
    }
    // if we traverse the list to the end and we couldn't find the node
    return null;
  }

  removeLast() {
    // [10 --> 20 --> 30]
    // last --> 30
    // previous --> 20
    // find a previos node, keep a reference so that we  can update last
    var previous = this._getPrevious(this.last);
    this.last = previous;
    // remove the link so that garbage collector remove the node in memoey
    this.last.next = null;
  }
}

function CustomException(message) {
  const error = new Error(message);
  error.code = "THIS_IS_A_CUSTOM_ERROR_CODE";
  return error;
}

CustomException.prototype = Object.create(Error.prototype);

var list = new LinkedList();
list.addLast(10);
list.addLast(20);
list.addLast(30);
console.log(list);
list.addFirst(5);
console.log(list);
console.log(list.indexOf(10));
console.log(list.indexOf(30));
console.log(list.indexOf(40));
console.log(list.contains(40));
console.log(list.contains(10));
list.removeFirst();
console.log(list);
list.removeLast();
console.log(list);
var emptylist = new LinkedList();
try {
  emptylist.removeFirst();
} catch (error) {
  console.log(error.code, error.message);
}

var singleItemList = new LinkedList();
singleItemList.addLast(10);
singleItemList.removeFirst();
console.log("singleItemList", singleItemList);

// To run: node LinkedList.js
