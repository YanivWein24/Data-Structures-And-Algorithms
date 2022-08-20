//* Quick Sort:

//* Quick sort (like 'Merge Sort'), exploits the fact that arrays of 0 or 1 elements are *always sorted*.
//* It works by selecting one element (called the "pivot") and finding the index where the pivot
//* should end up in the sorting array.
//* Once the pivot is positioned appropriately, quick sort can be applied on either side of the pivot.

//? Pivot Helper function Pseudocode:

//? * In order to implement Quick Sort, it's useful to first implement a function responsible arranging elements
//?   in an array on either side of the pivot.
//? * Given an array, this helper function should designate an element as the 'pivot'.
//? * It should then rearrange elements in the array so that all values less than the pivot are moved to
//?   the left side of the pivot, and all values greater than the pivot are moved to the right of the pivot.
//! * The helper function should do this *in place*, meaning not creating a new array.
//? * When complete, the helper function should return the *index* of the pivot.

//* For example:
//* Given an unsorted array of numbers between 1-8:
//? let arr =  [5,3,4,6,7,1,8,2]
//? pivot(arr) // 4
//* calling the function with this array (pivot(arr)) should return 4.
//* if we use the *first* element as the pivot,then our pivot would be 5.
//* and in this array there are 4 elements that are less than 5, so we move all of them to the left side of 5,
//* and putting 5 in the correct position, which is index 4.
//* the function then returns the new index - 4.
//? Other examples:
//? let arr =  [7,4,2,8,5,3,1,6]
//? pivot(arr) // 6
//? let arr =  [2,4,7,8,5,3,1,6]
//? pivot(arr) // 1
//? let arr =  [3,4,2,8,5,7,1,6]
//? pivot(arr) // 2


//* Pivot Helper Pseudocode:

//* * It will help to accept three arguments: an array, a start index, and a end index (these can default to 0 and
//*   the array length minus 1, respectively).
//* * Grab the pivot  from the start of the index.
//* * Store the current pivot index in a variable (this will keep track of where the pivot should end up).
//* * Loop through the array from start to end
//*   * If the pivot is greater than the current elements, increment the pivot index variable and then swap the
//*     current element with the element at the pivot index
//* * Swap the starting element (i.e the pivot) with the element at the pivot index.
//* * Return the pivot index.

const swap = (arr, idx1, idx2) => {
    [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]
}

const pivot = (arr, start = 0, end = arr.length - 1) => {
    let pivot = arr[start]
    let swapIdx = start
    for (let i = start + 1; i < arr.length; i++) {
        if (pivot > arr[i]) {
            swapIdx++
            swap(arr, swapIdx, i)
        }
    }
    swap(arr, start, swapIdx)
    return swapIdx
}

console.log(pivot([4, 8, 2, 1, 5, 7, 6, 3])) // 3 (the first element is 4, and the correct position is index 3)
console.log(pivot([9, 4, 8, 2, 1, 5, 7, 6, 3])) // 8 (the first element is 9, and the correct position is index 8)

//* Quick Sort Pseudocode:

//* * Call the pivot helper on the array.
//* * When the helper returns to you the updated pivot index, recursively call the pivot helper on the subarray
//*   to the left if that index, and to the subarray to the right if that index.
//* * Your base case occurs when you consider a subarray with less than 2 elements.

const quickSort = (arr, left = 0, right = arr.length - 1) => {
    if (left < right) {
        let pivotIndex = pivot(arr, left, right)
        // Left
        quickSort(arr, left, pivotIndex - 1)
        // Right
        quickSort(arr, pivotIndex + 1, right)
    }
    return arr
}

console.log(quickSort([4, 6, 9, 1, 2, 5, 3])) // [1,2,3,4,5,6,9]
console.log(quickSort([100, -3, 4, 6, 9, 1, 2, 5, 3])) // [-3, 1, 2, 3,4, 5, 6, 9, 100]

//! Time Complexity:
//! Best / Average Case: O(n log(n))
//! Worst Case: O(n^2)

//! Space Complexity: O(n)