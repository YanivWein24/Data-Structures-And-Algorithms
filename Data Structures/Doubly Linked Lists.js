//! Doubly Linked Lists.js

//* A data structure that contains a *head*, *tail* and *length* properties.
//* Linked lists consist of nodes, and each node has a *value* and a *pointer* to another node or null.
//* In a *doubly* linked list, each node can point to both the "next" AND the "prev" nodes.
//* Comparing to a *singly* linked list, this data structure is using MORE MEMORY (because of the additional "prev" variable)
//* Since we are using more memory we can be more flexible.

//* Example Of Doubly Linked List:

//*            Head      length = 4      Tail
//*        prev    prev     prev     prev    prev
//*   null <--> 4  <-->  6  <-->  8  <--> 2  <-->  null
//*        next    next     next     next    next


//? Methods Pseudocode:

//? push(value) - Adding to the *end* of the list:
//? * Create a new node with the value passed to the function.
//? * If the head property is null (or this.length === 0) set the "head" AND "tail" to be the newly created node.
//? * Otherwise, set the "next" property on the tail to be the new node.
//? * Set the "prev" property on the newly node the be the old tail.
//? * Set the tail to be the newly created node.
//? * Increase "length" by 1 
//? * Return the Doubly Linked List.

//? pop() - Removing from the end of the list:
//? * If the head property is null (or this.length === 0) return null.
//? * Store the current tail in a variable to return later.
//? * If the length is 1, set the "head" and "tail" properties to be null.
//? * Update the tail to be the previous node.
//? * set the newTail's "next" property to be null.
//? * Decrease "length" by 1.
//? * Return old tail we stored earlier.

//? shift() - Removing the node from the *beginning* of the linked list: (O(1) time complexity - compared to O(n) with arrays!)
//? * If the head property is null (or this.length === 0) return null.
//? * Store the current head in a variable to return later.
//? * if the length is one:
//?    * set the head to be null
//?    * set the tail to be null
//? * Update the head to be the next node (oldHead.next).
//? * Set the head's "prev" property to null.
//? * Set the oldHead's "next" property to null.
//? * Decrease "length" by 1.
//? * Return old head we stored earlier.

//? unshift(value) - Adding to the *beginning* of the list: (O(1) time complexity - compared to O(n) with arrays!)
//? * Create a new node with the value passed to the function.
//? * If the length is 0:
//?     * Set the *head* to be the new node.
//?     * Set the *tail* to be the new node.
//? * Otherwise:
//?     * Set the "prev" property on the head of the list to be the new node.
//?     * Set the "next" property on the new node to be the head.
//?     * Update the head to be the new node.
//? * Increment the length
//? * Return the list

class Node {
    // val - piece of data, next - reference to the next node
    constructor(val) {
        this.val = val
        this.next = null
        this.prev = null
    }
}

class DoublyLinkedList {
    constructor() {
        this.head = null
        this.tail = null
        this.length = 0
    }
    push(value) {
        let newNode = new Node(value)
        if (!this.head) { // we could also check if (this.length === 0) or if (this.head === this.tail)
            this.head = newNode
            this.tail = this.head // (we could also use 'newNode' instead, it doesn't matter)
        } else {
            this.tail.next = newNode // setting 'next' for the previous tail
            newNode.prev = this.tail // connect between the tail and the "prev" property of our new node
            this.tail = newNode // now newNode is the current tail
        }
        this.length++
        return this
    }
    pop() {
        if (this.length === 0) return null  // we could also check if (!this.head) or if (this.head === this.tail)
        let poppedNode = this.tail
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.tail = poppedNode.prev
            this.tail.next = null
            poppedNode.prev = null
        }
        this.length--
        return poppedNode
    }
    shift() {
        if (!this.head) return null  // we could also check if (this.length === 0) or if (this.head === this.tail)
        let oldHead = this.head
        if (this.length === 1) {
            this.head = null
            this.tail = null
        } else {
            this.head = oldHead.next
            this.head.prev = null  // remove the first connection with the node we want to shift
            oldHead.next = null  // remove the second connection with the node we want to shift
        }
        this.length--
        return oldHead
    }
    unshift(value) {
        let newNode = new Node(value)
        if (!this.head) {
            this.head = newNode
            this.tail = newNode // (we could also use 'this.head' instead, it doesn't matter)
        } else {
            this.head.prev = newNode
            newNode.next = this.head
            this.head = newNode
            this.length++
            return this
        }
    }
}

let list = new DoublyLinkedList()

list.push(3)
list.push(2)
list.push(5)

list.shift()
list.unshift(3)
console.log(list)
// DoublyLinkedList {
//    head: <ref *1> Node {
//      val: 3,
//      next: Node { val: 5, next: null, prev: [Circular *1] },
//      prev: null
//    },
//    tail: <ref *2> Node {
//      val: 5,
//      next: null,
//      prev: <ref *1> Node { val: 3, next: [Circular *2], prev: null }
//    },
//    length: 2
//  }