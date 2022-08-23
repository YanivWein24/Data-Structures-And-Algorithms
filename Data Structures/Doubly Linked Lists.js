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

//? get(index) - Retrieving a node by it's position in the linked list:
//? * If the index is less than 0 or greater than or equal to the length of the list, return null.
//? * If the index is less than or equal to *half* of the length og the lift:
//?     * Loop through the list, starting from the *head* and loop towards the middle
//?     * Return the node once it is found
//? * If the index is greater than *half* of the length og the lift:
//?     * Loop through the list, starting from the *tail* and loop towards the middle
//?     * Return the node once it is found

//? set(index, value) - Updating a node by it's position in the linked list:
//? * This function should accept an index and a value.
//? * Use the 'get' method to find the specific node.
//? * If the node is not found, return false.
//? * Otherwise, set the value of that node to be the value passed to the function and return true.

//? insert(index, value) - Adding a new node at a *specific* location:
//? * This function should accept an index and a value.
//? * If the "index" is less than zero or greater than the length of the list, return false.
//? * If the "index" is the same as the length of the list, use "push" to add  a new node to the end of the list.
//? * If the "index" is 0, use "unshift" to add a new node to the beginning of the list.
//? * Otherwise, using the "get" method, access the node at the position of (index - 1).
//? * Set the "next" and "prev" properties on the correct nodes to link everything together.
//? * Increase length property by 1.
//? * Return true.

//? remove(index) - Removing a new node from the linked list at a *specific* location:
//? * If the "index" is less than zero or greater than or equal to the length of the list, return null.
//? * if the index is equal to (this.length -1), use the "pop" method to remove the node from the *end* of the list.
//? * if the index is 0, use the "shift" method to remove the node from the *beginning* of the list.
//? * Otherwise, using the "get" method, access the node at the given index - 1.
//? * Update the "next" and "prev" properties to remove the found node from the list.
//? * Set the "next" and "prev" properties to null on the found node.
//? * Decrement the length by 1.
//? * Return the value of the removed node.


//! Time Complexity:

//! Insertion - O(1)
//! Removal - O(1)
//! Searching - O(n) Technically it's O(n/2) because we only search *half* of the list. but that still counts as O(n)
//! Access - O(n)


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
    get(index) {
        if (index < 0 || index >= this.length) return null
        let current, counter
        if (index <= (this.length / 2)) {
            // console.log("Working from BOTTOM")
            counter = 0
            current = this.head
            while (counter !== index) {
                current = current.next
                counter++
            }
        } else {
            // console.log("Working from TOP")
            counter = this.length - 1
            current = this.tail
            while (counter !== index) {
                current = current.prev
                counter--
            }
        }
        return current
    }
    set(index, value) {
        let foundNode = this.get(index) // can return the specific node , or null
        if (foundNode) {
            foundNode.val = value
            return true
        }
        return false
    }
    insert(index, value) {
        if (index < 0 || index > this.length) return null
        if (index === 0) return !!this.unshift(value) // (!! - executes the unshift method, then returns true)
        if (index === this.length) return !!this.push(value) // (!! - executes the push method, then returns true)
        // (!!) - executes what comes after, and then returns true / false
        // for example: "return !!this.push(value)" -> this.push returns some {value} -> !{value} = false -> !false = true
        let newNode = new Node(value)
        let beforeNode = this.get(index - 1)
        let afterNode = beforeNode.next // (faster than doing this.get(index), and use the 'get' method again )
        beforeNode.next = newNode, newNode.prev = beforeNode // connecting the new Node and the "before" node
        newNode.next = afterNode, afterNode.prev = newNode // connecting the new Node and the "after" node
        this.length++
        return true
    }
    remove(index) {
        if (index < 0 || index >= this.length) return null
        if (index === 0) return this.shift()
        if (index === this.length - 1) return this.pop()
        let removedNode = this.get(index)
        let beforeNode = removedNode.prev // faster then using this.get(index) again
        let afterNode = removedNode.next
        beforeNode.next = afterNode
        afterNode.prev = beforeNode
        removedNode.next = null
        removedNode.prev = null
        this.length--
        return removedNode
    }
}

let list = new DoublyLinkedList()

list.push(3)
list.push(2)
list.push(5)
list.push(7)
list.push(8)

console.log(list)

// DoublyLinkedList {
//   head: <ref *1> Node {
//     val: 3,
//     next: Node { val: 2, next: [Node], prev: [Circular *1] },
//     prev: null
//   },
//   tail: <ref *2> Node {
//     val: 8,
//     next: null,
//     prev: Node { val: 7, next: [Circular *2], prev: [Node] }
//   },
//   length: 5
// }