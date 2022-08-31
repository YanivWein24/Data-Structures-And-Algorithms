//! Intro To Dynamic Programming:

//? What Is Dynamic Programming?
//? "A method for solving a complex problem by breaking it down into a collection of simpler subproblem,
//?  solving each of those subproblem just once, and storing their solutions."
//? "Using past knowledge to make solving a future problem easier."


//* Conditions to use dynamic programming:
//* 1. Overlapping Subproblem:
//*      A problem is said to have "Overlapping Subproblem" if it can be broken down into subproblem,
//*      which are reused several times.

//* 2. Optimal Substructure:
//*      A problem is said to have "Optimal Substructure" if an optimal solution can be constructed from
//*      optimal solutions of its subproblems.


//? Example for dynamic programming - using the fibonacci sequence:

//? Recursive solution:

const fib = (num) => {
    if (num <= 2) return 1
    return fib(num - 1) + fib(num - 2)
}

console.log(fib(2)) // 1
console.log(fib(7)) // 13  
console.log(fib(30)) // 832040 

//! Big O Of The Recursive solution:
//! Time Complexity: O(2^n) - Exponential Time (Super Slow!!!)
//! searching for fib(40) and above is dangerous, and can cause issues...
//! Space Complexity: O(n)


//? Using Memorization:

//? Storing the results of expensive functions calls
//? and returning the cached result when the same input occur again.

const fastFib = (num, memo = []) => {
    if (memo[num] !== undefined) return memo[num]
    // if we already discovered memo[num], we use it instead of searching again
    if (num <= 2) return 1
    var res = fastFib(num - 1, memo) + fastFib(num - 2, memo)
    memo[num] = res
    return res
}

console.log(fastFib(2)) // 1
console.log(fastFib(5)) // 5
console.log(fastFib(2000)) // Infinity

//! Going Above 2000 can cause a stack-overflow! 

//* Shorter syntax - we give an initial value to our memo, so we can remove the base case (if (num <= 2) ):

const shorterFib = (num, memo = [undefined, 1, 1]) => {
    if (memo[num] !== undefined) return memo[num]
    // if we already discovered memo[num], we use it instead of searching again
    var res = shorterFib(num - 1, memo) + shorterFib(num - 2, memo)
    memo[num] = res
    return res
}

//! Time Complexity With Memorization: O(n)


//? Tabulation - A Bottom Up Approach:
//? * Storing the result of a previous result in a "table" (usually an array).
//? * Usually Done Using Iterations.
//? * Better *Space Complexity* can be achieved using tabulation.

const tabulatedFib = (n) => {
    if (n <= 2) return 1
    const fibNums = [0, 1, 1]
    for (let i = 3; i <= n; i++) {
        fibNums[i] = fibNums[i - 1] + fibNums[i - 2]
    }
    return fibNums[n]
}

console.log(tabulatedFib(2)) // 1
console.log(tabulatedFib(7)) // 13  
console.log(tabulatedFib(10000)) // Infinity 

//! Since we are using iteration over recursion we can easily go above 'fib(2000)'
//! without having to worry about stack overflows.

//! Time Complexity With Tabulation: O(n)
