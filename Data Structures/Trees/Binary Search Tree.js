//! Binary Search Trees:

//* Each parent in a *binary* tree can have at most 2 children nodes.
//* Every node to the *left* of a parent node is *always LESS* than the parent.
//* Every node to the *right* of a parent node is *always GREATER* than the parent.

//?       *NOT* a valid binary tree     |    *NOT* a valid binary tree     |    A valid binary tree!
//*  '12' have more than 2 children     |   left child bigger than parent  |    A valid binary tree!
//                      32 - root                    65 - root                    7 - root
//                 ____|                          ___|___                      ___|___
//                |                              |      |                     |      |
//                V                              V      V                     V      V
//               12                              85     87                    6      19
//          _____|______                        leaf   leaf                 leaf     |___
//         |     |     |                                                                 | 
//         V     V     V                                                                 V 
//        90    32    2                                                                  52
//       leaf  leaf  leaf                                                               leaf


//! Time Complexity:

//! Insertion - O(log(n)) - average / best case
//! Searching - O(log(n)) - average / best case

//! A Worst case scenario will look something like this:
//! (O(n) - similar to linked lists)

//                                          3
//                                          |__
//                                             |
//                                             6
//                                              |__
//                                                 |
//                                                 9
//                                                 |__
//                                                    |
//                                                    12
//                                                     |__
//                                                        |
//                                                        15


//? Methods Pseudocode:

//? insert() - can be iterative or recursive:
//? * This function should accept a value.
//? * Create a new node using the given value.
//? * Starting at the root:
//?     * Check if there is a root. if not - the root becomes now becomes the new node .
//?     * IF there is a root, check if the value of the new node is greater than or less than the value of the root.
//?         * If it's *GREATER* than the value of the root:
//?             * Check to see if there is a node to the right.
//?                 * If there is, move to that node and repeat these steps. 
//?                 * If there is not, add that node as the "right" property.
//?         * If it's *LESS* than the value of the root:
//?             * Check to see if there is a node to the left.
//?                 * If there is, move to that node and repeat these steps. 
//?                 * If there is not, add that node as the "left" property
//? * Return the final tree.

//? find() - can be iterative or recursive:
//? * This function should accept a value.
//? * Create a new node using the given value.
//? * Check if there is a root. if not - we're done searching, return false.
//?     * IF there is a root, check if the value of the new node is rhe value we are looking for.
//?       if it is, return true.
//?     * If not, check to see if the value if greater than or less than the root (or the current node):
//?         * If it's *greater* than the root (or the current node):
//?             * Check to see if there is a node to the right:
//?                 * If there is, move to that node and repeat this steps.
//?                 * If there is not, we're done searching! return true.
//?         * If it's *less* than the root (or the current node):
//?             * Check to see if there is a node to the right:
//?                 * If there is, move to that node and repeat this steps.
//?                 * If there is not, we're done searching! return true.


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
}

let binarySearchTree = new BST()

binarySearchTree.insert(10)
binarySearchTree.insert(5)
binarySearchTree.insert(13)
binarySearchTree.insert(11)
binarySearchTree.insert(2)
binarySearchTree.insert(16)
binarySearchTree.insert(7)

console.log(binarySearchTree)

//      10
//   5     13
// 2  7  11  16

console.log(binarySearchTree.find(13)) // true
console.log(binarySearchTree.find(11)) // true
console.log(binarySearchTree.find(2)) // true
console.log(binarySearchTree.find(12)) // false
console.log(binarySearchTree.find(0)) // false
