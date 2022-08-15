//* Divide And Conquer:

//? Given a *sorted* array of integers, write a function called "search",
//? that accepts a value and returns the index where the value passed to the function is located.
//? If the value is not found, return -1.

//? Examples:
//? search([1,2,3,4,5,6], 4) // 3
//? search([1,2,3,4,5,6], 6) // 5
//? search([1,2,3,4,5,6], 11) // -1


//! A naive solution - Linear Search:

const search = (arr, value) => {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] === value) {
            return i
        }
    }
    return -1
}

console.log(search([1, 2, 3, 4, 5, 6], 4)) // 3
console.log(search([1, 2, 3, 4, 5, 6], 6)) // 5
console.log(search([1, 2, 3, 4, 5, 6], 11)) // -1


//! Time Complexity - O(n)
//! Space Complexity - O(1)


//* Better solution - Binary Search:

const search2 = (arr, val) => {
    let min = 0
    let max = arr.length - 1

    while (min <= max) {
        let middle = Math.floor((min + max) / 2)
        let currentElement = arr[middle]

        if (currentElement < val) {
            min = middle + 1
        } else if (currentElement > val) {
            max = middle - 1
        } else return middle
    }
    return -1
}


console.log(search2([1, 2, 3, 4, 5, 6], 4)) // 3
console.log(search2([1, 2, 3, 4, 5, 6], 6)) // 5
console.log(search2([1, 2, 3, 4, 5, 6], 11)) // -1 


//! Time Complexity - O(log(n))
//! Space Complexity - O(1)