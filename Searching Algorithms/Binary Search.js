//* Binary search is much faster form of searching, comparing to Linear search.
//* Rather than eliminating one element at a time, we can eliminate HALF of the remaining elements.
//* This searching algorithm is using the "Divide And Conquer" pattern.

//! Binary search only works on sorted arrays!

//! Time Complexity: O(log(n))

//? Write a function called "binarySearch" which accepts a *sorted* array and a value and returns the index
//? at which the value exists. Otherwise, return -1.

const binarySearch = (arr, val) => {
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

console.log(binarySearch([1, 2, 3, 4, 5], 2)) // 1
console.log(binarySearch([1, 2, 3, 4, 5], 3)) // 2
console.log(binarySearch([1, 2, 3, 4, 5], 5)) // 4
console.log(binarySearch([1, 2, 3, 4, 5], 6)) // -1
console.log(binarySearch([
    5, 6, 10, 13, 14, 18, 30, 34, 35, 37,
    40, 44, 64, 79, 84, 86, 95, 96, 98, 99
], 10)) // 2