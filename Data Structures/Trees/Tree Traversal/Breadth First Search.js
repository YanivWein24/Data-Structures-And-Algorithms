//! Breadth First Search:

//                              Root
//     ->   ->   ->    ->       10
//                        ______|_______
//                       |             |
//                       V             V
//     ->   ->   ->     6   ->    ->  15
//                 ____|           ___|___
//                |               |      |
//                V               V      V
//     ->   ->   12   ->    ->    7  ->  25
//                               leaf   leaf

// Order: [10, 6, 15, 12, 7, 25]

//? Steps - iterative:
//? * Create a queue (this can be an array) and a variable to store the values of the nodes visited.
//? * Place the root node in the queue
//? * Loop as long as there is anything in the queue
//?     * Dequeue a node from the queue and push the value of the node into the variable that stores the nodes.
//?     * If there is a "left" property on the node dequeued - add it to the queue.
//?     * If there is a "right" property on the node dequeued - add it to the queue.
//? * Return the variables that stored the values.

// Using the shell of a binary search tree from ../Binary Search Tree.js 
class Node {
    constructor(value) {
        this.value = value
        this.left = null
        this.right = null
    }
}

class BST {
    constructor() {
        this.root = null
    }
    insert(value) {
        let newNode = new Node(value)
        if (!this.root) {
            this.root = newNode
            return this
        }
        let current = this.root
        while (true) {  // since there is no end-case, we need to use 'return' in order to stop iterating
            if (value === current.value) return null
            if (value < current.value) {
                if (current.left === null) {
                    current.left = newNode
                    return this
                } else {
                    current = current.left
                }
            } else if (value > current.value) {
                if (current.right === null) {
                    current.right = newNode
                    return this
                } else {
                    current = current.right
                }
            }
        }
    }
    find(value) {
        if (!this.root) return false
        let current = this.root, found = false
        while (current && !found) {
            if (value < current.value) {
                current = current.left
            } else if (value > current.value) {
                current = current.right
            } else { // value === current
                found = true
            }
        }
        return found
    }
    BFS() {
        let node = this.root, data = [], queue = []
        queue.push(node)
        while (queue.length) { // we can't just write if (queue) because in js [] === true
            node = queue.shift()
            data.push(node.value)
            if (node.left) queue.push(node.left)
            if (node.right) queue.push(node.right)
        }
        return data
    }
}

let tree = new BST()
tree.insert(10)
tree.insert(6)
tree.insert(3)
tree.insert(15)
tree.insert(20)
tree.insert(8)
console.log(tree.BFS()) // [ 10, 6, 15, 3, 8, 20 ]