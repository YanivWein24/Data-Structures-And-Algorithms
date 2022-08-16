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

//* Selection Sort:
//! Time Complexity: O(n^2)

//? Selection sort is similar to bubble sort, but instead of first placing large values into sorted position,
//? it places small values in sorted position.
//? At each iteration we find the smallest value in the array, and place them into order from smallest to largest.

//? Selection Sort pseudocode: 
//? * Store the first element as the smallest value  youv'e seen so far.
//? * Compare this item to the next item in the array until you find a smaller number.
//? * If a smaller number is found, designate that smaller number to be the new "minimum" and continue until
//?   the end of the array.
//? * If the "minimum" is not the value (index) you initially began with, swap the two values. 
//? * Repeat this with the next element until the array is sorted.


const selectionSort = (arr) => {
    for (let i = 0; i < arr.length; i++) {
        let min = i
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j
                if (i !== min) { // prevent an unnecessary swap if i is already the lowest number
                    swap(arr, i, min)
                }
            }
        }
    }
    return arr
}

console.log(selectionSort([2, 1, 5, 3, 8]))