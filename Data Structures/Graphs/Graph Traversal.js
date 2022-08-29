//! Graph Traversal:

// Graph Traversal - visiting / updating / checking each vertex on a graph.

//* Graph Traversal Uses:
//* * Peer To Peer Networking
//* * Web crawlers
//* * Finding "closest" matches / recommendations
//* * Shortest path problems:
//*    * GPS Navigation
//*    * Solving mazes
//*    * AI (shortest path to win the game)


//? Depth First Search:
//? Explore as far as possible down one branch before "backtracking".


//                A                   {
//              /   \                  "A": ["B","C"]
//             B     C                 "B": ["A","D"]
//             |     |                 "C": ["A","E"]
//             D --- E                 "D": ["B","E","F"]
//             \    /                  "E": ["C","D","F"]
//               F                     "F": ["D","E"]
//                                    }


//    Checking for "A"          checking for "B"         checking for "D"        checking for "E"
//   {                       {                       {                       {
//     "A": ["B","C"]          "A": ["B","C"]           "A": [null, "C"]        "A": [null, "C"]
//     "B": ["A","D"]          "B": ["null","D"]        "B": [null, "D"]        "B": [null, "null"]
//     "C": ["A","E"]          "C": ["null","E"]        "C": ["null","E"]       "C": ["null","E"]
//     "D": ["B","E","F"]      "D": ["B","E","F"]       "D": ["null","E","F"]   "D": ["null","E","F"]
//     "E": ["C","D","F"]      "E": ["C","D","F"]       "E": ["C","D","F"]      "E": ["C","null","F"]
//     "F": ["D","E"]          "F": ["D","E"]           "F": ["D","E"]          "F": ["null","E"]
//    }                      }                        }                        }

//    Checking for "C"          checking for "F"             Done Traversing!
//   {                         {                           {
//     "A": [null, "C"]          "A": ["null","null"]        "A": [null, "C"]
//     "B": [null, "null"]       "B": ["null","null"]        "B": [null, "D"]
//     "C": ["null","null"]      "C": ["null","null"]        "C": ["null","E"]
//     "D": ["null","null","F"]  "D": ["null","null","F"]    "D": ["null","E","F"]
//     "E": ["C","null","F"]     "E": ["null","null","F"]    "E": ["C","D","F"]
//     "F": ["null","null"]      "F": ["null","null"]        "F": ["D","E"]
//    }                        }                           }

//* DFSRecursive(startNode):
//*    If vertex is empty:
//*        return (this is the base case)
//*    Add vertex to results list
//*    Mark vertex as visited
//*    For each neighbor in vertex's neighbors:
//*       if neighbor is not visited:
//*          recursively call DFS on neighbor

//* DFSIterative(start):
//* let "s" be a stack (or an array representing a stack)
//* s.push(start)
//* while s is not empty:
//*   vertex = s.pop()
//*   if vertex is not labeled as discovered:
//*     visit vertex (add to 'results' array)
//*     label vertex as discovered
//*     for each of vertex's neighbors, N do
//*     s.push(N)


//? Methods Pseudocode:
//? DFSRecursive(vertex):
//? * The function should accept a starting vertex.
//? * Create a list to store the  end result, to be returned at the very end.
//? * Create an object to store visited vertices.
//? * Create a helper function which accepts a vertex.
//?   * The helper function should return early if the vertex is empty.
//?   * The helper function should place the vertex it accepts into the 'visited' object
//?     and push that vertex into the result array. 
//?   * Loop over all of the values in the adjacencyList for that vertex.
//?   * If any of those values have not been visited, recursively invoke the helper function
//?     with that vertex
//? * Invoke the helper function with the starting vertex.
//? * Return the result array.

//? DFSIterative(vertex):
//? * The function should accept a starting vertex.
//? * Create a stack to help use keep track of vertices (use a list / array).
//? * Create a list to store the end result, to be returned at the very end.
//? * Create an object to store visited vertices.
//? * Add the starting vertex to the stack, and mark it as visited.
//? * While the stack has something in it:
//? *   Pop the next vortex from the stack.
//? *   If that vortex hasn't been visited yet:
//?       * Mark it as visited
//?       * Add it to the result list
//?       * Push all of it's neighbors into the stack
//? * Return the result array.

//? BFS(vertex):
//? * The function should accept a starting vertex.
//? * Create a queue to help use keep track of vertices (use a list / array).
//? * Create a list to store the end result, to be returned at the very end.
//? * Create an object to store visited vertices.
//? * Add the starting vertex to the queue, and mark it as visited.
//? * While the queue has something in it:
//? *   remove (shift()) the first vortex in the stack and push it into the array that stores nodes visited.
//? * Loop over each vertex in the adjacency list for the vertex you are visiting.
//? *   If that vortex hasn't been visited yet:
//?       * Mark it as visited
//?       * Add it to the result list
//?       * Enqueue that vertex
//? * Return the result array.


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
            const adjacentVertex = this.adjacencyList[vertex]
            this.removeEdge(vertex, adjacentVertex)
        }
        delete this.adjacencyList[vertex] // entirely removes the vertex from the adjacency list
    }
    DFSRecursive(startVertex) {
        const result = []
        const visited = {}
        const adjacencyList = this.adjacencyList
        let helper = (vertex) => {
            if (!vertex) return null
            visited[vertex] = true
            result.push(vertex)
            adjacencyList[vertex].forEach(neighbor => {
                if (!visited[neighbor]) return helper(neighbor)
            })
        }
        helper(startVertex)
        return result
    }
    DFSIterative(startVertex) {
        const stack = [startVertex]
        // initialize with the starting value, instead of creating an empty array and then pushing that value.
        const result = []
        const visited = {}
        visited[startVertex] = true // we already added the starting vertex to the stack, now we mark as visited
        while (stack.length) {
            const currVertex = stack.pop()  // .pop() returns the *last* vertex (the deleted vortex)
            result.push(currVertex)
            this.adjacencyList[currVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true
                    stack.push(neighbor)
                }
            })
        }
        return result
    }
    BFS(startVertex) {
        const queue = [startVertex]
        // initialize with the starting value, instead of creating an empty array and then pushing that value. 
        const result = []
        const visited = {}
        visited[startVertex] = true // we already added the starting vertex to the queue, now we mark as visited
        let currVertex
        while (queue.length) {
            currVertex = queue.shift() // .shift() returns the *first* vertex (the deleted vortex)
            result.push(currVertex)
            this.adjacencyList[currVertex].forEach(neighbor => {
                if (!visited[neighbor]) {
                    visited[neighbor] = true
                    queue.push(neighbor)
                }
            })
        }
        return result
    }
}


//? Creating the graph from the example above:

let g = new Graph()
g.addVertex("A")
g.addVertex("B")
g.addVertex("C")
g.addVertex("D")
g.addVertex("E")
g.addVertex("F")

g.addEdge("A", "B")
g.addEdge("A", "C")
g.addEdge("B", "D")
g.addEdge("C", "E")
g.addEdge("D", "E")
g.addEdge("D", "F")
g.addEdge("E", "F")

console.log(g)
// Graph {
//     adjacencyList: {
//       A: [ 'B', 'C' ],
//       B: [ 'A', 'D' ],
//       C: [ 'A', 'E' ],
//       D: [ 'B', 'E', 'F' ],
//       E: [ 'C', 'D', 'F' ],
//       F: [ 'D', 'E' ]
//     }
//   }


console.log(g.DFSRecursive("A"))
// [ 'A', 'B', 'D', 'E', 'C', 'F' ] - when starting from "A" (same results as the example at the top)

console.log(g.DFSRecursive("B"))
// [ 'B', 'A', 'C', 'E', 'D', 'F' ] - when starting from "B" 

console.log(g.DFSIterative("A"))
// [ 'A', 'C', 'E', 'F', 'D', 'B' ] - when starting from "A"

console.log(g.BFS("A"))
// [ 'A', 'B', 'C', 'D', 'E', 'F' ] - when starting from "A"