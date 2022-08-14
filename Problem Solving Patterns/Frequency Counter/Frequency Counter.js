//* Frequency Counter:

//? Write a function calls "same", which accepts two arrays.
//? The function should return 'true' if every value in the first array has
//? it's corresponding value squared (**2) in the second array.
//? The frequency of values must be the same.

//? Examples:
//? same([1,2,3], [4,1,9]) // true
//? same([1,2,3], [1,9]) // false
//? same([1,2,1], [4,4,1]) // false (must be same frequency)

//! A naive solution:

const same = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false
    }
    for (let i = 0; i < arr1.length; i++) {
        let correctIndex = arr2.indexOf(arr1[i] ** 2)
        if (correctIndex === -1) {
            return false
        }
        arr2.splice(correctIndex, 1)
    }
    return true
}

console.log(same([1, 2, 3], [4, 1, 9])) // true
console.log(same([1, 2, 3], [1, 9])) // false

//! Time Complexity - O(n^2)
// (inside the 'for' loop we use 'indexOf' method which is O(n), meaning we have a nested loop.)


//* Better solution:

const same2 = (arr1, arr2) => {
    if (arr1.length !== arr2.length) {
        return false
    }
    let frequencyCounter1 = {}
    let frequencyCounter2 = {}
    for (let val of arr1) {
        frequencyCounter1[val] = (frequencyCounter1[val] || 0) + 1
    }
    for (let val of arr2) {
        frequencyCounter2[val] = (frequencyCounter2[val] || 0) + 1
    }
    for (let key in frequencyCounter1) {
        if (!(key ** 2 in frequencyCounter2)) {
            return false
        }
        if (frequencyCounter2[key ** 2] !== frequencyCounter1[key]) {
            return false
        }
    }
    return true
}

console.log(same2([1, 2, 3], [4, 1, 9])) // true
console.log(same2([1, 2, 3], [1, 9])) // false

//! Time Complexity - O(n)
