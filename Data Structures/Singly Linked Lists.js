//* Singly Linked List:

//* A data structure that contains a *head*, *tail* and *length* properties.
//* Linked lists consist of nodes, and each node has a *value* and a *pointer* to another node or null.
//* There are no indexes in linked lists!

//* Example Of Singly Linked List:

//*  head   length = 4  tail
//*   4  ->  6  ->  8  -> 2  ->
//*     next   next   next   null

// if we want to get the data from the *third* node, we need to go to the *head* which is the first node,
// then this node points to the next node (second) which points to the next node - the one we want.

//? Comparison With Arrays:
//?       Lists:
//? * Do not have indexes!
//? * Random access is not allowed
//? * Connected vid nodes with a *next* pointer
//? * Great at handling Insertion and deletion

//?       Arrays:
//? * Indexes in order!
//? * Insertion and deletion can be expensive
//? * Can quickly be accessed at a specific index


//? Methods Pseudocode:

//? push() - Adding to the end of the list:
//? * This function should accept a value.
//? * Create a new node using the value passed to the function.
//? * If there is no head property on the list, set the head *and* the tail to be the newly created node.
//? * Otherwise set the next property on the tail to be the new node, and set the tail property
//?   on the list the be the newly created node.
//? * Increment the length property by 1.

//? pop() - Removing from the end of the list:
//? * If there are no nodes in the list, return undefined.
//? * Loop through the list until you reach the tail.
//? * Set the 'next' property of the *2nd* to last node to be null.
//? * Set the tail the be the 2nd to last node.
//? * Decrement the length of the list by 1.
//? * Return the value of the node removed.


// val - piece of data
// next - reference to the next node

class Node {
    constructor(val) {
        this.val = val
        this.next = null
    }
}

const first = new Node("Hi")
first.next = new Node("How")
first.next.next = new Node("Are")
first.next.next.next = new Node("You")
console.log(first) // Node {val: 'Hi',next: Node { val: 'How', next: Node { val: 'Are', next: [Node] } }}


class SinglyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(value) {
        let newNode = new Node(value)
        if (!this.head) {
            this.head = newNode
            this.tail = this.head // (we could also use 'newNode' instead, it doesn't matter)
        } else {
            this.tail.next = newNode // setting 'next' for the previous tail
            this.tail = newNode // now newNode is the current tail
        }
        this.length++
        return this
    }
    pop() {
        if (!this.head) return undefined  // we could also check if (this.length === 0) or if (this.head === this.tail)
        let current = this.head
        let newTail = current  // the 2nd to end node
        while (current.next) { // finding the node *right before* the tail 
            newTail = current
            current = current.next
        }
        this.tail = newTail
        this.tail.next = null // removes the connection to the node we want to pop.
        this.length--
        if (this.length === 0) {
            this.head = null
            this.tail = null
        }
    }
}

let list = new SinglyLinkedList()
list.push(5)
list.push(6)
list.push(8)
console.log(list)
// SinglyLinkedList {
//   head: Node { val: 5, next: Node { val: 6, next: [Node] } },
//   tail: Node { val: 8, next: null },
//   length: 3
// }
// console.log(list.tail) // Node { val: 8, next: null }
// console.log(list.head.next) // Node { val: 6, next: Node { val: 8, next: null } }

list.pop()
list.pop()
console.log(list)
// SinglyLinkedList {
//     head: Node { val: 5, next: null },
//     tail: Node { val: 5, next: null },
//     length: 1
//   }
list.pop()
console.log(list) // SinglyLinkedList { head: null, tail: null, length: 0 }
console.log(list.pop()) // undefined