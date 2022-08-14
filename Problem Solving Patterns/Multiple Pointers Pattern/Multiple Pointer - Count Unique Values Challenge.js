//* Multiple Pointers Pattern - Count Unique Values:

//? Implement a function called "countUniqueValues", which accepts a *sorted* array, and counts 
//? the number of unique values in the array.
//? There can be negative numbers in the array, but it will always be sorted.

//? Examples:
//? countUniqueValues([1, 1, 1, 1, 1, 1, 2]) // 2
//? countUniqueValues([-1, 1, 1, 1, 1, 1, 2]) // 3
//? countUniqueValues([]) // 0
//? countUniqueValues([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3]) // 3
//? countUniqueValues([1, 1, 1, 1, 1, 1, 2, 2, 3, 15]) // 4

const countUniqueValues = (arr) => {
    let left = 0
    let right = arr.length - 1
    let uniqueValues = 0
    let numbers = []
    while (left < right) {
        if (!(numbers.includes(arr[left]))) {
            numbers.push(arr[left])
            uniqueValues += 1
        } else {
            left++
        }
        if (!(numbers.includes(arr[right]))) {
            numbers.push(arr[right])
            uniqueValues += 1
        } else {
            right--
        }
    }
    return uniqueValues
}

console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2])) // 2
console.log(countUniqueValues([-1, 1, 1, 1, 1, 1, 2])) // 3
console.log(countUniqueValues([])) // 0
console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3])) // 3
console.log(countUniqueValues([1, 1, 1, 1, 1, 1, 2, 2, 3, 15])) // 4

//! Time Complexity - O(n)
//! Space Complexity - O(1)

//! Other solution based on the same approach: (same time & space complexity)

const countUniqueValues2 = (arr) => {
    if (arr.length === 0) {
        return 0
    }
    let i = 0
    for (let j = 1; j < arr.length; j++) {
        if (arr[i] !== arr[j]) {
            i++
            arr[i] = arr[j]
        }
        // console.log(i, j)
    }
    return i + 1
}

console.log(countUniqueValues2([1, 1, 1, 1, 1, 1, 2])) // 2
console.log(countUniqueValues2([-1, 1, 1, 1, 1, 1, 2])) // 3
console.log(countUniqueValues2([])) // 0
console.log(countUniqueValues2([1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 3])) // 3
console.log(countUniqueValues2([1, 1, 1, 1, 1, 1, 2, 2, 3, 15])) // 4