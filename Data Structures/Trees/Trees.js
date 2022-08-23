//! Trees:

//? Lists - linear
//? Trees - nonlinear


//* Tree terminology:

//* Root - The top node in the tree.
//* Child - A node directly connected to another node when moving away from the root.
//* Parent - The converse notion of a child.
//* Siblings - A group of nodes with the same parent.
//* Leaf - A node with no children.
//* Edge - The connection between one node and another.

//! We can't be more than one root in a tree.
//! Nodes can't be connected to their siblings (only parent-child relationships allowed).

//* Where trees are being used:
//* * HTML - DOM Tree
//* * Network routing
//* * Abstract syntax trees
//* * Artificial intelligence
//* * Folders in operation systems
//* * Computer file systems
//* * JSON inner structure

// Example of a tree:

//                              Root
//                              1
//                        ______|_______
//                       |             |
//                       V             V
//                      32            65
//                 ____|           ___|___
//                |               |      |
//                V               V      V
//               12               7      25
//          _____|______          leaf   leaf
//         |     |     |
//         V     V     V
//        90    32    2
//       leaf  leaf  leaf
//