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


//? Find the shortest path from A to E:

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


class weightedGraph {
    constructor() {
        this.adjacencyList = {}
    }
    addVertex(vertex) {
        if (!this.adjacencyList[vertex]) this.adjacencyList[vertex] = []
    }
    addEdge(vertex1, vertex2, weight) {
        if (!this.adjacencyList[vertex1] || !this.adjacencyList[vertex2]) return undefined
        this.adjacencyList[vertex1].push({ node: vertex2, weight }) // weight -> weight: weight
        this.adjacencyList[vertex2].push({ node: vertex1, weight }) // weight -> weight: weight
    }
}


let graph = new weightedGraph()

graph.addVertex("A")
graph.addVertex("B")
graph.addVertex("C")
graph.addEdge("A", "B", 9)
graph.addEdge("A", "C", 5)
graph.addEdge("B", "C", 7)

console.log(graph.adjacencyList)
// {
//     A: [ { node: 'B', weight: 9 }, { node: 'C', weight: 5 } ],
//     B: [ { node: 'A', weight: 9 }, { node: 'C', weight: 7 } ],
//     C: [ { node: 'A', weight: 5 }, { node: 'B', weight: 7 } ]
// }