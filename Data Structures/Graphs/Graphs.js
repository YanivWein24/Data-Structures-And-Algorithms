//! Graphs:

//* A graph is a data structure consists of a finite set of nodes that are somehow connected.
//* This are no "patterns" or rules about how nodes can be connected in a graph,
//* or how many connections each node can have.

//* Uses For Graphs:
//? * Social Networks - connections between users
//? * Recommendation systems ("people also watched...", "You might also like..." etc)
//? * Location / Mapping
//? * Routing Algorithms
//? * Visual hierarchy
//? * File System Optimizations
//? * E-V-E-R-Y-W-H-E-R-E-!

//* Essential Graph Terms:
//? * Vortex - a node
//? * edge - connections between nodes
//? * weighted / unweighted - values assigned to distances between vertices.
//? * directed / undirected - directions assigned to distances between vertices.


//* Types Of Graphs:

//* * Undirected Graph:
//? A graph where there's no "polarity" or direction to the edges of vertices.
//? Connected vertices are always directing at each other. meaning the direction is always two-sided.
//? For example: connection between FACEBOOK friends - when one user asks to become a friend with the other users,
//? if the other user accepts, then both of the users will be able to see each others posts and content.
//? Now *both* of the users are directing at each other. this is a TWO-SIDED connection.

//* * Directed Graph:
//? A graph where there is a "polarity" or direction to the edges of vertices.
//? Connection between vertices can be *both* one-sided or two-sided.
//? There can be connections where 1 vortex is directing to a different one, but the other one doesn't
//? direct back to the first one. - a ONE-SIDED connection.
//? For example: connection between INSTAGRAM followers - users can accept other users to follow them without
//? having to them follow back.
//? Many people can follow 1 person, and that 1 person can follow none of the people who follow him (for example).

//* * Unweighted Graph:
//? A graph with no values attached to the edges

//* * weighted Graph:
//? A graph with values attached to the edges


//* Storing graphs using adjacency matrix:

//?              Undirected Graph:               Adjacency Matrix:
//            A   <-->   B   <-->  C        -   A   B   C   D   E   F
//                                          A   0   1   0   0   0   1
//            ^                    ^        B   1   0   1   0   0   0
//            |                    |        C   0   1   0   1   0   0
//            V                    V        D   0   0   1   0   1   0
//                                          E   0   0   0   1   0   1
//            F    <-->  E  <-->   D        F   1   0   0   0   1   0
//? All the vertices are connected in both directions.
//? Number of connections: 12

//?               Directed Graph:                Adjacency Matrix:
//            A   -->   B   -->   C         -   A   B   C   D   E   F
//                                          A   0   1   0   0   0   1
//            ^                             B   0   0   0   0   0   0
//            |                   |         C   0   1   0   0   0   0
//                               V          D   0   0   1   0   0   0
//                                          E   0   0   0   1   0   0
//            F    <--  E  <--  D           F   0   0   0   0   1   0
//? The vertices are connected in one directions.
//? Number of connections: 6


//* Other Example - Using an *array* as adjacency list:

//?              Undirected Graph:         Adjacency List:
//            0   <-->   1   <-->  2          [
//                                          0   [1, 5],
//            ^                    ^        1   [0, 2],
//            |                    |        2   [1, 3],
//            V                    V        3   [2, 4],
//                                          4   [3, 5],
//            5    <-->  4  <-->   3        5   [4, 0]
//                                            ]


//* Other Example - Using a *hash map* as adjacency list:

//?              Undirected Graph:         Adjacency List:
//            A   <-->   B   <-->  C         {
//                                              A: ["F", "B"],
//            ^                    ^            B: ["A","C"],
//            |                    |            C: ["B","D"],
//            V                    V            D: ["C","E"],
//                                              E: ["D,"F"],
//            F    <-->  E  <-->   D            F: ["E","A"]
//                                           }


//! Comparison and differences in Big O:

//*                Adjacency List:                                     Adjacency Matrix:
//*   * Can take up less space (in sparse graphs)           * Faster to lookup specific edges
//*   * Faster to iterate over all edges
//!   *  Can be slower to lookup specific edges             * Takes up more space (in sparse graphs)
//!                                                         * Slower to iterate over all edges

//? v - number of vertices
//? e - number of edges

//?       Operation         Adjacency List       Adjacency Matrix
//
//       Add Vertex             O(1)                   O(v^2)
//       Add Edge               O(1)                    O(1)
//       Remove Vertex        O(v + e)                 O(v^2)
//       Remove Edge            O(e)                    O(1)
//       Query                O(v + e)                  O(1)
//       Storage              O(v + e)                 O(v^2)


//? Methods Pseudocode:
//? addVertex(value):
//? * Write a function called 'addVertex', which accepts a name of a vertex.
//? * It should add a key do the adjacency list with the name of the vertex and set its value to be an empty array.
//?  Example of the wanted result: g.addVertex("Tokyo")    // {  "Tokyo": []  }

//? addEdge(value):
//? * This function should accept two vertices, we can call them vertex1 and vertex2.
//? * The function should find in the adjacency list the key of vertex1 and push vertex2 to the array.
//? * The function should find in the adjacency list the key of vertex2 and push vertex1 to the array.
//? * Don't worry about handling errors / invalid vertices

//? removeEdge(value):
//? * This function should accept two vertices, we can call them vertex1 and vertex2.
//? * The function should reassign the key of vortex1 to be an array that doesn't contain vertex2.
//? * The function should reassign the key of vortex2 to be an array that doesn't contain vertex1.
//? * Don't worry about handling errors / invalid vertices

//? removeVertex(value):
//? * This function should accept a name of a vertex to remove.
//? * The function should loop as long as there are any other vertices in the adjacency list for that vertex.
//? * Inside the loop, call our "removeEdge" function with the vertex we are removing
//?   and any values in the adjacency list for that vertex. (in other words, find all the edges for that vertex and remove them)
//? * Delete the key in the adjacency list for that vertex.

//? Implementing *Undirected* Graph With Adjacency *List*:

class Graph {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
    }
    addEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return undefined
        this.adjacencyList[vertex1].push(vertex2)
        this.adjacencyList[vertex2].push(vertex1)
        // if we will want to change this to a *directed* graph, we will just need to remove one of these 2 lines 
    }
    removeEdge(vertex1, vertex2) {
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return undefined
        this.adjacencyList[vertex1] = this.adjacencyList[vertex1].filter((vortex) => vortex !== vertex2)
        this.adjacencyList[vertex2] = this.adjacencyList[vertex2].filter((vortex) => vortex !== vertex1)
        // if we will want to change this to a *directed* graph, we will just need to remove one of these 2 lines 
    }
    removeVertex(vertex) {
        if (!this.adjacencyList[vertex]) return undefined
        while (this.adjacencyList[vertex].length) {
            // looping through the array vertices that are 'connected' to deleteVertex,
            // remove each vertex from the array and the 'connection' to deleteVertex.
            const adjacentVertex = this.adjacencyList[vertex].pop()
            this.removeEdge(vertex, adjacentVertex)
        }
        delete this.adjacencyList[vertex] // entirely removes the vertex from the adjacency list
    }
}

let graph = new Graph()

graph.addVertex("hello")
graph.addVertex("world")
graph.addVertex("!")

graph.addEdge("world", "hello") // the order doesn't matter since it's an undirected graph
graph.addEdge("world", "!") // the order doesn't matter since it's an undirected graph
graph.addEdge("hello", "!") // the order doesn't matter since it's an undirected graph

console.log(graph)
// Graph {
//     adjacencyList: {
//       hello: [ 'world', '!' ],
//       world: [ 'hello', '!' ],
//       '!': [ 'world', 'hello' ]
//     }
//   }

weight.removeEdge("hello", "!") // removing the edges on both vertices
console.log(weight)
// Graph {
//     adjacencyList: { hello: [ 'world' ], world: [ 'hello', '!' ], '!': [ 'world' ] }
//   }

weight.removeVertex('!') // removing this vertex entirely
console.log(weight)
// Graph { adjacencyList: { hello: [ 'world' ], world: [ 'hello' ] } }