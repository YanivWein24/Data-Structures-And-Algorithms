//! Binary Heap:
//? Very similar to a "Binary Search Tree", but with some different rules!
//? In binary heaps, there are no 'left' and 'right' relationships!

//* Each parent has AT MOST 2 child nodes.
//* * In a 'MaxBinaryHeap', parent nodes are always *larger* than child nodes,
//*   but there are no guarantees between sibling nodes.
//!   The root node is always the *largest* node.
//* * In a 'MinBinaryHeap', parent nodes are always *smaller* than child nodes,
//*   but there are no guarantees between sibling nodes.
//!   The root node is always the *smallest* node.
//* A binary heap is as compact as possible.
//! All the children of each node are as full as they can be and left children are filled out first.

//* Binary heaps are used to implement 'Priority Queues', which are very commonly used data structures.
//* They are also used with graph traversal algorithms.


//?          Valid MaxBinaryHeap!         |    Valid MinBinaryHeap   |    *NOT* a binary heap!
//*          Valid MaxBinaryHeap!        |   Valid MinBinaryHeap!   |     (it's actually a binary tree)

//                      32 - root (largest)          5 - root (smallest)          7 - root
//                 ____|___                      ____|___                       ___|___
//                |        |                    |       |                      |      |
//                V        V                    V       V                      V      V
//               12       26                    25      37                     6      19
//          _____|______   |___              ___|___    |___                 leaf     |___
//         |           |       |            |      |       |                             |
//         V           V       V            V      V       V                             V
//         6           2       20           34    30       42                            52
//       leaf        leaf      leaf        leaf  leaf     leaf                          leaf


//? Representing a binary heap using an array:

//  100  (first)
//   |______
//      |  |
//     19  36
//      |   |__________
//      |_______  |   |
//         |   |  25  15
//         17  21  |   |_______________
//         |   |   |_____________  |  |
//         |   |__________   |  |  |  |
//         |_______  |  |   |  |   |  |
//             |  |  |  |   |  |   |  |
//             9 15  6  11  13 8  1  4 (last)

//* [100,19,36,17,21,25,15,9,15,6,11,13,8,1,4]


//? If we want to find the *children* of a specific node:
//* * For any index of an array 'n...'
//* * The left child is stored at index 2n + 1
//* * The right child is stored at index 2n + 2
// if we're looking at the 3rd index we have '17', which is the *parent* of the nodes at indexes (2*3) + 1 and (2*3) + 2 ->
// -> Arr[(2*3)+1] = Arr[7] = 9
// -> Arr[(2*3)+2] = Arr[8] = 15

//? If we want to find the *parent* of a specific node:
//* * For any index of an array 'n...'
//* * Its parent is stored at index - Math.floor((n-1)/2)
// if we're looking at the 5th index we have '25', which is the *child* of the node at index Math.floor((5-1)/2) ->
// -> Arr[Math.floor((5-1)/2)] = Arr[Math.floor(2.5)] = arr[2] = 36


//? Methods Pseudocode (for MaxBinaryHeap):
//? * Push the value into the end values property on the heap.
//? * 'Bubble' the value up to it's correct spot (by comparing the value with the parent's value and swaping them accordingly).
//? How To Bubble:
//?   * Create a variable called 'index' which is the length of the 'values' property - 1.
//?   * Create a variable called 'parentIndex' which is the floor of (index-1)/2.
//?   * Keep looping as long as the values of the parent nodes is less then the value of the element at the child index.
//?     * Swap the value of the element at the parentIndex with the value of the element at the child index
//?     * Set the index to be the parent index, and start over!


class MaxBinaryHeap {
    constructor() {
        this.values = [41, 39, 33, 18, 27, 12] // an array of values that represents the binary heap
    }
    insert(value) {
        this.values.push(value)
        this.bubbleUp()
    }
    bubbleUp() {
        let index = this.values.length - 1  // the index of the last value, where we temporary store the new value
        const newElement = this.values[index]
        while (index > 0) {  // if we reached the beginning of the array, there's nothing more to compare, we're done! 
            let parentIndex = Math.floor((index - 1) / 2)
            let parent = this.values[parentIndex]
            if (newElement <= parent) break  // else, we swap the new element and the parent, and then update the index
            this.values[parentIndex] = newElement
            this.values[index] = parent
            index = parentIndex
        }
    }
}

let maxBinaryHeap = new MaxBinaryHeap()


maxBinaryHeap.insert(55)
console.log(maxBinaryHeap.values)  // [55, 39, 41, 18,27, 12, 33]
maxBinaryHeap.insert(1)
console.log(maxBinaryHeap.values)  // [55, 39, 41, 18,27, 12, 33,  1]
maxBinaryHeap.insert(45)
console.log(maxBinaryHeap.values)  // [55, 45, 41, 39, 2, 12, 33, 1, 18]