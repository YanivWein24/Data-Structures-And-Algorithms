//! Priority Queues:

//* A data structure (very similar to a 'binary heap') where each element has a priority.
//* Elements with higher priorities are served BEFORE elements with lower priorities.
//? Usually the highest priorities is '1' (not always)


//? A Naive implementation - using arrays:
//* * Creating a priority queue using a list of lists of priorities. (for example from 1-5)
//* * Then for each new node, we add it to a priority queue according to its priority.

// [priority1 = [], priority2 = [], priority3 =[], priority4 = [], priority5 = []]

// Iterate over the entire thing to find the highest priority element.  //! O(n)
// If we accept a new node with the priority '2', it will be added to the priority queue '2'
// If we accept a new node with the priority '5', it will be added to the priority queue '5'
// The *first* nodes to get served are those that located in the priority queue '1'.
// The *last* nodes to get served are those that located in the priority queue '5'.


//? A Better implementation - using binary heaps (a MinBinaryHeap - where priority 1 comes first):

//! Time Complexity:

//! Insertion - O(log n)
//! Removal - O(log n)
//! Searching (less relevant) - O(n)

//? Methods Pseudocode:

//? * Write a *minBinaryHeap* - lower number means higher priority.
//? * Each node has a value and a priority. Use the priority to build the heap.
//? * Enqueue():
//?    * This function that accepts a value and a priority, and makes a new node.
//?    * Put it in the right spot in the heap based off of its priority
//? * Dequeue():
//?    * Remove the root element 
//?    * Rearrange the heap using the priority of the nodes
//?    * Return the old root


class Node {
    // val - piece of data, next - reference to the next node
    constructor(val, priority) {
        this.val = val
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.values = [] // an array of values that represents the binary heap / queue
    }
    enqueue(value, priority) {
        let newNode = new Node(value, priority)
        this.values.push(newNode)
        this.bubbleUp()
    }
    bubbleUp() {
        let index = this.values.length - 1  // the index of the last value, where we temporary store the new value
        const newElement = this.values[index]
        while (index > 0) {  // if we reached the beginning of the array, there's nothing more to compare, we're done! 
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.values[parentIndex]
            if (newElement.priority >= parent.priority) break  // else, we swap the new element and the parent, and then update the index
            this.values[parentIndex] = newElement
            this.values[index] = parent
            index = parentIndex
        }
    }
    dequeue() {
        const min = this.values[0]  // stores the 'old' min number
        const end = this.values.pop()
        if (this.values.length > 0) {  // if we just popped the *only* element, we will eventually return 'undefined'
            this.values[0] = end
            this.sinkDown()
        }
        return min
    }
    sinkDown() {
        let index = 0
        const length = this.values.length
        const element = this.values[0]
        while (true) {
            let leftChildIndex = 2 * index + 1
            let rightChildIndex = 2 * index + 2
            let leftChild, rightChild
            let swap = null
            if (leftChildIndex < length) {
                leftChild = this.values[leftChildIndex]
                if (leftChild.priority < element.priority) {
                    swap = leftChildIndex
                }
            }
            if (rightChildIndex < length) {
                rightChild = this.values[rightChildIndex]
                if ((swap === null && rightChild.priority < element.priority) ||
                    (swap === null && rightChild.priority < leftChild.priority)) {
                    swap = rightChildIndex
                }
            }
            if (swap === null) break
            this.values[index] = this.values[swap] // 'swap' can be either the left or the right child
            this.values[swap] = element
            index = swap  // 'swap' can be either the left or the right child
        }
    }
}

let queue = new PriorityQueue()
queue.enqueue("common cold", 5)
queue.enqueue("gunshot wound", 1)
queue.enqueue("high fever", 2)
queue.enqueue("virus", 2)
console.log(queue.values)

// [
//     Node { val: 'gunshot wound', priority: 1 },   // highest priority
//     Node { val: 'virus', priority: 2 },
//     Node { val: 'high fever', priority: 2 },
//     Node { val: 'common cold', priority: 5 }   // lowest priority
// ]

console.log(queue.dequeue())  // Node { val: 'gunshot wound', priority: 1 } - first priority
console.log(queue.dequeue())  // Node { val: 'virus', priority: 2 }
console.log(queue.dequeue())  // Node { val: 'high fever', priority: 2 }
console.log(queue.dequeue())  // Node { val: 'common cold', priority: 5 } - last priority