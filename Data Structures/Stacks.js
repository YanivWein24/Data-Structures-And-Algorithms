//! Stacks:

//? LIFO - *Last* In *First* Out

//* A LIFO data structure!
//* The LAST element added to the stack will be the FIRST element to be removed from the stack.
//* An example of daily used stack is the call stack - when we use recursion we use the call stack to stack all
//* The iterations that are still awaiting. and when we hit the base case, the call stack will start to shrink
//* from top to bottom (or "last in first out").

//* Where stacks are being used:
//* * Managing functions invocations (the "call stack")
//* * Undo / Redo functionality
//* * Routing (the history object is treated like a stack)

//* Example Of A Stack:

//*    last   size = 4     first
//*  <-  4  <-  6  <-  8  <-  2
//*        next   next   next
//* The LAST item added to the stack will be the FIRST item to remove.

//? Array Implementation:

//? 1. Using an array with push() & pop():
//? *    * Using "push" to add items to the *end* of the list.
//? *    * Using "pop" to remove items from the *end* of the list.

//? let stack = []
//? stack.push("do 1")
//? stack.push("do 2")
//? stack.push("do 3")
//? console.log(stack) // (["do 1", "do 2", "do 3"])
//? stack.pop()
//? console.log(stack) // (["do 1", "do 2"])

//? 2. Using an array with shift() & unshift():
//? *    * Using "unshift" to add items to the *beginning* of the list.  // O(1)
//? *    * Using "shift" to remove items from the *end* of the list.  // O(1)
//! It's less efficient than using "pop" and "push" because adding or removing items from the *beginning*
//! of the array causes a re-index of all the other items.

//? let stack = []
//? stack.unshift("do 1")
//? stack.unshift("do 2")
//? stack.unshift("do 3")
//? console.log(stack) // (["do 3", "do 2", "do 1"])
//? stack.pop()
//? console.log(stack) // (["do 1", "do 2"])


//? Implementing using a "Stack" class :

//! Time Complexity:

//! Insertion - O(1)
//! Removal - O(1)
//! Searching (less relevant) - O(n)
//! Access (less relevant) - O(n)

//? Methods Pseudocode:

//* Since we are NOT using arrays, the nodes are not indexed. meaning adding / removing from the stack doesn't causes re-indexes.
//* Making insertions and deletions constant times O(1).
//? Push(value) - same as "unshift" with arrays (pushing from the beginning, instead of the end. takes O(1) instead of O(n))
//? * The function should accept a value.
//? * Create a new node with that value.
//? * If there are no nodes in the stack, set the "first" and "last" properties to the newly created node.
//? * If there is at least one node, create a variable that stores the current "first" property on the stack.
//? * Reset the first property to be the newly created node.
//? * Set the "next" property on the node to be the previously created variable.
//? * Increment the size of the stack by 1.
//? * Return the size of the stack.

//? Pop(value) - same as "shift" with arrays (removing from the beginning, instead of the end. takes O(1) instead of O(n))
//? * If there are no nodes in the stack, return null.
//? * Create a temporary variable to store the "first" property of the stack (to be returned later).
//? * If there is only 1 node (this.size === 1 or this.first === this.last), set the "first" and "last" properties to be null.
//? * If there is more than one node, set the "first" property to be the "next" property on the current "first".
//? * Decrease the size of the stack by 1.
//? * Return the value of the removed node.


class Node {
    constructor(value) {
        this.value = value
        this.next = null
    }
}

class Stack {
    constructor() {
        this.first = null // same as "head" with linked lists
        this.last = null // same as "tail" with linked lists
        this.size = 0
    }
    push(value) {
        let newNode = new Node(value)
        if (!this.first) {
            this.first = newNode
            this.last = this.first // (we could also use 'newNode' instead, it doesn't matter)
        } else {
            let firstNode = this.first
            this.first = newNode
            this.first.next = firstNode
        }
        this.size++
        return this.size
    }
    pop() {
        if (!this.first) return null  // we could also check if (this.length === 0) or if (this.head === this.tail)
        const oldFirst = this.first
        if (this.length === 1) { // or if (this.first === this.last)
            this.last = null
        }
        this.first = this.first.next
        this.size--
        return oldFirst.value
    }
}

const stack = new Stack()

console.log(stack.push(5)) // 1
console.log(stack.push(4)) // 2 
console.log(stack.push(4)) // 3
console.log(stack.push(2)) // 4
console.log(stack)

// Stack {
//     first: Node { value: 2, next: Node { value: 4, next: [Node] } },
//     last: Node { value: 5, next: null },
//     size: 4
//   }

console.log(stack.pop()) // 2
console.log(stack)

// Stack {
//     first: Node { value: 4, next: Node { value: 4, next: [Node] } },
//     last: Node { value: 5, next: null },
//     size: 3
//   }

console.log(stack.pop()) // 4
console.log(stack.pop()) // 4
console.log(stack.pop()) // 5
console.log(stack.pop()) // null
