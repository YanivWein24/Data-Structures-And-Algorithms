//! Queues:

//? FIFO - *Last* In *First* Out

//* A FIFO data structure!
//* The FIRST element added to the queue will be the FIRST element to be removed from the queue.
//* This data structure is working similarly to "Stacks", only that here we add / remove items from 2 different
//* positions (instead of adding / removing from the same position - beginning or end).

//* Where queues are being used:
//* * Background tasks
//* * Uploading resources
//* * Printing / Task processing

//* Example Of A Queue:

//*    last   size = 4     first
//*  ->  4  ->  6  ->  8  ->  2  ->
//*        next   next   next
//* The FIRST item added to the queue will be the FIRST item to remove.

//? Array Implementation:

//? 1. Using an array with push() and shift():
//? *    * Using "push" to add items to the *end* of the list.  // O(1)
//? *    * Using "shift" to remove items from the *beginning* of the list. // O(n)

let q = []
q.push("do 1")
q.push("do 2")
q.push("do 3")
console.log(q) // [ 'do 1', 'do 2', 'do 3' ]
q.shift()
console.log(q) // [  'do 2', 'do 3' ]


//? 2. Using an array with unshift() and pop():
//? *    * Using "unshift" to add items to the *beginning* of the list.  // O(n)
//? *    * Using "pop" to remove items from the *end* of the list. // O(1)

let que = []
que.unshift("do 1")
que.unshift("do 2")
que.unshift("do 3")
console.log(que) // [ 'do 3', 'do 2', 'do 1' ]
que.pop()
console.log(que) // [  'do 3', 'do 2' ]


//? Implementing using a "Queue" class :

//! Time Complexity:

//! Insertion - O(1)
//! Removal - O(1)
//! Searching (less relevant) - O(n)
//! Access (less relevant) - O(n)

//* If we will add from the *beginning* and remove from the *end*, removing will be inefficient, because we will
//* need to find the node right before the "last" node (to make it the new "last").
//* meaning, we will need to iterate over the queue (causing time complexity of O(n)).
//* To avoid that we will add items from the *end* and remove from the *beginning*. (both O(1))

//? Methods Pseudocode:

//* Since we are NOT using arrays, the nodes are not indexed. meaning adding / removing from the queue doesn't causes re-indexes.
//* Making insertions and deletions constant times O(1).
//? enqueue(value) - same as "push" with arrays (pushing from the *end*. takes O(1) instead of O(n))
//? * This function accepts some value.
//? * Create a new node using the value passed to the function.
//? * If there are no nodes in the queue, set the new node to be the *first* and *last* properties of the queue.
//? * Otherwise, set the "next" property on the current *last* to be that node, and then set the *last* property
//?   of the queue to be the new node.
//? * Increase size by 1.
//? * Return the size of the queue.

//? dequeue(value) - same as "shift" with arrays (removing from the *beginning*. takes O(1))
//? * If there are no nodes (this.size === 0 or !this.first ) in the queue, return null.
//? * If there are no nodes in the queue, return null.
//? * Create a temporary variable to store the "first" property of the queue (to be returned later).
//? * If there is only 1 node (this.size === 1 or this.first === this.last), set the "first" and "last" properties to be null.
//? * If there is more than one node, set the "first" property to be the "next" property on the current "first".
//? * Decrease the size of the queue by 1.
//? * Return the value of the removed node.


class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Queue {
    constructor() {
        this.first = null // same as "head" with linked lists
        this.last = null // same as "tail" with linked lists
        this.size = 0
    }
    enqueue(value) {
        let newNode = new Node(value)
        if (!this.first) {
            this.first = newNode
            this.last = this.first // (we could also use 'newNode' instead, it doesn't matter)
        } else {
            this.last.next = newNode
            this.last = newNode
        }
        this.size++
        return this.size
    }
    dequeue() {
        if (!this.first) return null  // we could also check if (this.length === 0) or if (this.first === this.tail)
        let oldFirst = this.first
        if (this.length === 1) {
            this.last = null
        }
        this.first = oldFirst.next
        oldFirst.next = null  // remove the second connection with the node we want to shift
        this.size--
        return this.size
    }
}

let queue = new Queue()

queue.enqueue(1)
queue.enqueue(2)
queue.enqueue(3)
console.log(queue)

// Queue {
//     first: Node { value: 1, next: Node { value: 2, next: [Node] } },
//     last: Node { value: 3, next: null },
//     size: 3
//   }

console.log(queue.dequeue()) // 2
console.log(queue.dequeue()) // 1
console.log(queue.dequeue()) // 0
console.log(queue.dequeue()) // null