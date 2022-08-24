//! Depth First *PreOrder*:

//* Going all the way *down* and to the *left* first (while adding nodes to the array).
//* Then going back up and looking from left to right, adding the nodes to the array.
//* The root node should be the FIRST to be added to the array.
//* Good use case - can be used to "export" a tree structure so that it is easily reconstructed or copied! 

//                              Root
//                              10
//                        ______|_______
//                       |             |
//                       V             V
//                      6             15
//                 ____|___           |___
//                |        |             |
//                V        V             V
//                3        8             20
//              leaf      leaf          leaf

// Order: [ 10, 6, 3, 8, 15, 20 ]
//        root, left-side, right-side
//* If we will create a new tree and push values to it according to the array we just received,
//* the new tree will look exactly like this one!

//? Steps - recursively:

//? * Create a variable to store the values of nodes visited (an array will be fine).
//? * Store the root of the BST in a variable called current.
//? * Write a helper function (called 'traverse') which accepts a node.
//?     * Push the value of the current node to the variable that stores the values.
//?     * If the node has e "left" property, call the helper function with the "left" property of the current node.
//?     * If the node has e "right" property, call the helper function with the "right" property of the current node.
//? * Invoke the helper function the the current variable.
//? * Return the array of values.


//! Depth First *PostOrder*:

//* Basically the same approach as "Depth First *PreOrder* and *InOrder*, but in different order.
//* only difference is that we first iterate over the *left* AND *right* sides of the tree,
//* and then we add the value of the  current node.
//* Meaning we are going all the way *down* and to the *left* first (*WITHOUT* adding nodes to the array).
//* Then going up from the left to the right.
//* The root node should be the LAST to be added to the array.

//                              Root
//                              10
//                        ______|_______
//                       |             |
//                       V             V
//                      6             15
//                 ____|___           |___
//                |        |             |
//                V        V             V
//                3        8             20
//              leaf      leaf          leaf

// Order: [ 3, 8, 6, 20, 15, 10 ]
//       left-side, right-side, root

//? Steps - recursively: (Same steps as "Depth First *PreOrder*", but different order)

//? * Create a variable to store the values of nodes visited (an array will be fine).
//? * Store the root of the BST in a variable called current.
//? * Write a helper function (called 'traverse') which accepts a node.
//?     * If the node has e "left" property, call the helper function with the "left" property of the current node.
//?     * If the node has e "right" property, call the helper function with the "right" property of the current node.
//?     * Push the value of the current node to the variable that stores the values.
//? * Invoke the helper function the the current variable.
//? * Return the array of values.


//! Depth First *InOrder*:

//* Basically the same approach as "Depth First *PreOrder* and *PostOrder*, but in different order.
//* only difference is that we first iterate over the *left* side of the tree, then we add the value of the 
//* current node, then we iterate over the *right* side of the tree.
//* Meaning we are going all the way *down* and to the *left* first (*WITHOUT* adding nodes to the array).
//* Then going up from the left to the right.
//* Meaning we are adding all the left side nodes (from bottom to top), and if there are no other left nodes,
//* we add all the right side nodes (from bottom to top).
//* The root node should be located EXACTLY BETWEEN the left and right sides.
//! This should return the data in SORTED order!

//                              Root
//                              10
//                        ______|_______
//                       |             |
//                       V             V
//                      6             15
//                 ____|___           |___
//                |        |             |
//                V        V             V
//                3        8             20
//              leaf      leaf          leaf

// Order: [ 3, 6, 8, 10, 15, 20 ]   // values are located in sorted order
//       left-side, root, right-side

//? Steps - recursively: (Same steps as "Depth First *PreOrder*", but different order)

//? * Create a variable to store the values of nodes visited (an array will be fine).
//? * Store the root of the BST in a variable called current.
//? * Write a helper function (called 'traverse') which accepts a node.
//?     * If the node has e "left" property, call the helper function with the "left" property of the current node.
//?     * Push the value of the current node to the variable that stores the values.
//?     * If the node has e "right" property, call the helper function with the "right" property of the current node.
//? * Invoke the helper function the the current variable.
//? * Return the array of values.


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
    DFSPreOrder() {
        let data = []
        const traverse = (node) => {
            data.push(node.value)
            if (node.left) traverse(node.left)
            if (node.right) traverse(node.right)
        }
        traverse(this.root) // the starting point
        return data
    }
    DFSPostOrder() {
        let data = []
        const traverse = (node) => {
            if (node.left) traverse(node.left)
            if (node.right) traverse(node.right)
            data.push(node.value)
        }
        traverse(this.root) // the starting point 
        return data
    }
    DFSInOrder() {
        let data = []
        const traverse = (node) => {
            node.left && traverse(node.left)  // using ES-6 conditionals
            data.push(node.value)
            node.right && traverse(node.right)  // using ES-6 conditionals
        }
        traverse(this.root) // the starting point 
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

console.log(tree.DFSPreOrder()) // [ 10, 6, 3, 8, 15, 20 ]
console.log(tree.DFSPostOrder()) // [ 10, 6, 3, 8, 15, 20 ]
console.log(tree.DFSInOrder()) // [ 3, 6, 8, 10, 15, 20 ]