//?  ******************** Swaping in JS: ********************

// ES-5
function swap(arr, idx1, idx2) {
    const temp = arr[idx1];
    arr[idx1] = arr[idx2]
    arr[idx2] = temp
}

// ES-2015
const swap2 = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

//?  ******************** Swaping in JS: ********************

//* Insertion Sort:
//! Time Complexity: O(n^2)

//? Insertion Sort pseudocode:
//? * Start by picking the *2nd* element in the array.
//? * Now compare the second element with the one before it and swap if necessary.
//? * Continue to the next element and if it is in the correct order, iterate through the sorted portion
//? * (i.e the left side) to place to element ib the correct place.
//? * Repeat until the array is sorted.

const insertionSort = (arr) => {
    for (let i = 1; i < arr.length; i++) {
        let currentVal = arr[i];
        for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
            // console.log(`j: ${arr[j]}, J+1: ${arr[j + 1]}`)
            // console.log(arr)
            arr[j + 1] = arr[j]
            arr[j] = currentVal
        }
    }
    return arr
}

console.log(insertionSort([2, 1, 9, 5, 76, 4])) // [ 1, 2, 4, 5, 9, 76 ]