//! Dijkstra's Algorithm:

//* What Is It: 
//* Finds the shortest path between two vertices on a graph.

//* The Approach:
//* 1. Every time we look to visit a new node, we pick the node with the smallest known distance to visit first.
//* 2. Once we've moved to the node we're going to visit, we look at each of it's neighbors.
//* 3. For each neighbor node, we calculate the distance by summing the total edges that lead to the
//*    node we're checking from the starting node.
//* 4. If the new total distance to a node is less than the previous total, we store the new shorter
//*    distance for that node.

//? Example: Find the shortest path from A to E:

//? Letters = Vertices
//* Numbers = weight / distance

//?                         A
//                        /   \                      
//*                     2      4                      
//                     /       \
//?                   C --2-- D B                    
//                     \     |\  \                    
//*                     4   1  3  3                  
//                       \  |   \  \
//?                       F --1--- E                 


//* Initial state:                                                  

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                      []          {           
//      B           Infinity                                 A: null,             
//      D           Infinity                                 B: null,          
//      C           Infinity                                 C: null,          
//      E           Infinity                                 D: null,          
//      F           Infinity                                 E: null,          
//                                                           F: null,
//                                                        }


//? Pick The Smallest distance from A...  A:

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                      [A]         {           
//      B              4                                     A: null,             
//      D              2                                     B: A,          
//      C           Infinity                                 C: A,          
//      E           Infinity                                 D: null,          
//      F           Infinity                                 E: null,          
//                                                           F: null,
//                                                        }


//? Pick The Smallest distance from A...  C:

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                     [A,C]        {           
//      B              4                                     A: null,             
//      C              2                                     B: A,          
//      D              4                                     C: A,          
//      E           Infinity                                 D: C,          
//      F              6                                     E: null,          
//                                                           F: C,
//                                                        }


//? Pick The Smallest distance...  B:  (Gives a solution: A->B->E = 7, but still not optimal)

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                     [A,C,B]      {           
//      B              4                                     A: null,             
//      C              2                                     B: A,          
//      D              4                                     C: A,          
//      E              7                                     D: C,          
//      F              6                                     E: B,          
//                                                           F: C,
//                                                        }


//? Pick The Smallest distance...  D:  (Gives another solution: A->C->D->E = 7, but still not optimal)

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                   [A,C,B,D]      {           
//      B              4                                     A: null,             
//      C              2                                     B: A,          
//      D              4                                     C: A,          
//      E              7                                     D: C,          
//      F              5                                     E: D,          
//                                                           F: D,
//                                                        }


//* Pick The Smallest distance...  F:  (Gives the optimal solution: A->C->D->F->E = 6 !)

//?   Vertex   Shortest Dist From A         Visited:      previous:                                            
//      A              0                  [A,C,B,D,F]     {           
//      B              4                                     A: null,             
//      C              2                                     B: A,          
//      D              4                                     C: A,          
//      E              6                                     D: C,          
//      F              5                                     E: F,          
//                                                           F: D,
//                                                        }

//? Dijkstra's Algorithm Pseudocode:

//? * This function should accept a *Starting* and *Ending* vertex.
//? * Create an object ( we'll call it 'distances') and set each key to be EVERY vertex in the
//?   adjacency list with a value of Infinity, except for the *Starting* vertex which should have
//?   a value of 0 (the distance from the starting vertex to the starting vertex is 0).
//? * After setting a value in the 'distances' object, add each vertex with a priority of Infinity to the
//?   priority queue, except the starting vertex, which should have a priority of 0 because that's where we begin.
//? * Create another object called 'previous' and set each key to be every vertex in the adjacency list with 
//?   a value of null.
//? * Start looping as long as there is anything in the priority queue:
//?   * Dequeue a vertex from the priority queue.
//?   * If that vertex is the same as the ending vertex- we are done!
//?   * Otherwise, loop through each value in the adjacency list at that vertex:
//?     * Calculate the distance to that vertex from the starting vertex.
//?     * If the distance is less than what is currently stored in our distances object:
//?       * Update the 'distances' object with the new lower distance.
//?       * Update the 'previous' object to contain that vertex.
//?       * Enqueue the vertex with the total distance from the start node.


//* Implementing a priority queue:
//? For each node we push, we call sort() - which is O(n * log(n))

class Node {
    // val - piece of data, next - reference to the next node
    constructor(val, priority) {
        this.val = val
        this.priority = priority
    }
}

class PriorityQueue {
    constructor() {
        this.values = [];
    }
    enqueue(val, priority) {
        let newNode = new Node(val, priority);
        this.values.push(newNode);
        this.bubbleUp();
    }
    bubbleUp() {
        let idx = this.values.length - 1;
        const element = this.values[idx];
        while (idx > 0) {
            let parentIdx = Math.floor((idx - 1) / 2);
            let parent = this.values[parentIdx];
            if (element.priority >= parent.priority) break;
            this.values[parentIdx] = element;
            this.values[idx] = parent;
            idx = parentIdx;
        }
    }
    dequeue() {
        const min = this.values[0];
        const end = this.values.pop();
        if (this.values.length > 0) {
            this.values[0] = end;
            this.sinkDown();
        }
        return min;
    }
    sinkDown() {
        let idx = 0;
        const length = this.values.length;
        const element = this.values[0];
        while (true) {
            let leftChildIdx = 2 * idx + 1;
            let rightChildIdx = 2 * idx + 2;
            let leftChild, rightChild;
            let swap = null;

            if (leftChildIdx < length) {
                leftChild = this.values[leftChildIdx];
                if (leftChild.priority < element.priority) {
                    swap = leftChildIdx;
                }
            }
            if (rightChildIdx < length) {
                rightChild = this.values[rightChildIdx];
                if (
                    (swap === null && rightChild.priority < element.priority) ||
                    (swap !== null && rightChild.priority < leftChild.priority)
                ) {
                    swap = rightChildIdx;
                }
            }
            if (swap === null) break;
            this.values[idx] = this.values[swap];
            this.values[swap] = element;
            idx = swap;
        }
    }
}

class WeightedGraph {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
    }
    addEdge(vertex1, vertex2, weight) {
        this.adjacencyList[vertex1].push({ node: vertex2, weight })
        this.adjacencyList[vertex2].push({ node: vertex1, weight })
    }
    Dijkstra(start, finish) {
        const nodes = new PriorityQueue()
        const distances = {}
        const previous = {}
        let path = [] // to return at end
        let smallest
        //build up initial state
        for (let vertex in this.adjacencyList) {
            if (vertex === start) {
                distances[vertex] = 0
                nodes.enqueue(vertex, 0)
            } else {
                distances[vertex] = Infinity
                nodes.enqueue(vertex, Infinity)
            }
            previous[vertex] = null
        }
        // as long as there is something to visit
        while (nodes.values.length) {
            smallest = nodes.dequeue().val
            if (smallest === finish) {
                // WE ARE DONE
                // BUILD UP PATH TO RETURN AT END
                while (previous[smallest]) { // we stop when we get to "A" - it's 'previous' value is null 
                    path.push(smallest)
                    smallest = previous[smallest]
                }
                break // we are done, exit the loop
            }
            if (smallest || distances[smallest] !== Infinity) {
                for (let neighbor in this.adjacencyList[smallest]) {
                    //find neighboring node
                    let nextNode = this.adjacencyList[smallest][neighbor]
                    //calculate new distance to neighboring node
                    let candidate = distances[smallest] + nextNode.weight
                    let nextNeighbor = nextNode.node
                    if (candidate < distances[nextNeighbor]) {
                        //updating new smallest distance to neighbor
                        distances[nextNeighbor] = candidate
                        //updating 'previous' - How we got to neighbor
                        previous[nextNeighbor] = smallest
                        //enqueue in priority queue with new priority
                        nodes.enqueue(nextNeighbor, candidate)
                    }
                }
            }
        }
        return path.concat(smallest).reverse()
        // We first add the smallest value to the array, since it's missing.
        // Then we reverse the array to go from start to finish, instead of from finish to start.
    }
}

//! Mocking the weighted graph from the example at the top:

let graph = new WeightedGraph()

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addVertex("D")
graph.addVertex("E")
graph.addVertex("F")

graph.addEdge("A", "B", 4)
graph.addEdge("A", "C", 2)
graph.addEdge("B", "E", 3)
graph.addEdge("C", "D", 2)
graph.addEdge("C", "F", 4)
graph.addEdge("D", "E", 3)
graph.addEdge("D", "F", 1)
graph.addEdge("E", "F", 1)

console.log(graph.adjacencyList)
//{
//    A: [ { node: 'B', weight: 4 }, { node: 'C', weight: 2 } ],
//    B: [ { node: 'A', weight: 4 }, { node: 'E', weight: 3 } ],
//    C: [
//      { node: 'A', weight: 2 },
//      { node: 'D', weight: 2 },
//      { node: 'F', weight: 4 }
//    ],
//    D: [
//      { node: 'C', weight: 2 },
//      { node: 'E', weight: 3 },
//      { node: 'F', weight: 1 }
//    ],
//    E: [
//      { node: 'B', weight: 3 },
//      { node: 'D', weight: 3 },
//      { node: 'F', weight: 1 }
//    ],
//    F: [
//      { node: 'C', weight: 4 },
//      { node: 'D', weight: 1 },
//      { node: 'E', weight: 1 }
//    ]
//  }


console.log(graph.Dijkstra("A", "E"))

//? Initial state:
//   {
//     A: 0,
//     B: Infinity,
//     C: Infinity,
//     D: Infinity,
//     E: Infinity,
//     F: Infinity
//   }

//   { A: null, B: null, C: null, D: null, E: null, F: null }

//* Final Output:
//* [ 'A', 'C', 'D', 'F', 'E' ]
