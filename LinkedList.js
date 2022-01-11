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
      this.last = null
  }

  addLast(item){
    // create a new node
    const node = new Node(item)
    console.log("a new node", node)

    // Check if the list is empty
    
    if (this.first == null) {
      // simply create a new node and assign it
      console.log("the list is empty")
      console.log("simply create a new node and assign it")
      this.first = this.last = node
    } else {
      // assign the node into the next pointer
      console.log("the list is NOT empty")
      console.log("assign the node into the next pointer")
      this.last.next = node
      // update last to point to this new node
      this.last = node
    }
  }
}

var list = new LinkedList()
list.addLast(10);
console.log("list", list)
list.addLast(20);
console.log("list", list)
list.addLast(30);

console.log("list", list)