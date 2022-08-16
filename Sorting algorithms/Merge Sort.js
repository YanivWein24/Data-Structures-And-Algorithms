//* Merge Sort:

//* * In order to implement merge sort, it's useful to first implement a function responsible for merging two sorted arrays.
//* * Given two arrays which *are sorted*, this helper function should create a new array which is also sorted,
//*   and consists of all of the elements in the two input arrays.

//! * The function should run in O(n + m) time, and  O(n + m) space and *should not* modify the parameters passed to it.

//? Merging Arrays pseudocode:

//? * Create an empty array, take a look at the smallest values in each input array.
//? * While there are still values we haven't looked at...
//?     * if the value in the first array is *smaller* than the value in the second, push the value in the *first array*
//?     * if the value in the first array is *larger* than the value in the second, push the value in the *second array*
//?     * Once we exhaust one array, push in all the remaining values from the other array.

const mergeArrays = (arr1, arr2) => {
    let results = []
    let i = 0
    let j = 0
    while (i < arr1.length && j < arr2.length) {
        if (arr1[i] < arr2[j]) {
            results.push(arr1[i])
            i++
        } else {
            results.push(arr2[j])
            j++
        }
    }
    // when we get to this point, we completely iterated over *one* of the arrays (if the arrays have different lengths).
    // so now we need to add all the remaining values from the other array.
    while (i < arr1.length) {
        results.push(arr1[i])
        i++
    }
    while (j < arr2.length) {
        results.push(arr2[j])
        j++
    }
    return results
}

console.log(mergeArrays([1, 10, 50], [14, 99, 100]))  // [ 1, 10, 14, 50, 99, 100 ]
console.log(mergeArrays([], [5, 100])) // [ 5, 100 ]
console.log(mergeArrays([100], [1, 2, 3, 4, 5])) // [ 1, 2, 3, 4, 5, 100 ]


//? Merge Sort pseudocode:

//? * Break up the array into halves (recursively) until you have arrays that are empty or have one element.
//? * Once you have smaller sorted arrays, merge those arrays with other sorted arrays
//?   until you are back at the full length of the array.
//? * Once the array has been merged back together, return the merged (and sorted!) array.

const mergeSort = (arr) => {
    if (arr.length <= 1) return arr
    let mid = Math.floor(arr.length / 2)
    let left = mergeSort(arr.slice(0, mid)) // breaking the array into two halves, recursively.
    let right = mergeSort(arr.slice(mid)) // breaking the array into two halves, recursively.
    return mergeArrays(left, right) // Using the 'mergeArrays' function we defined earlier.
}

console.log(mergeSort([10, 24, 76, 73, 72, 1, 9])) // [1,  9, 10, 24,72, 73, 76]
console.log(mergeSort([24, 10, 76, 73, 25, 1, 0])) // [0,  1, 10, 24,25, 73, 76]

//* Live Example of the algorithm:

                                    // mergeSort([24, 10, 76, 73,])
//? splitting the array into halves
                        // mergeSort([24, 10])                 mergeSort([76,73])
//? splitting the array into halves
                    // mergeSort([24])      mergeSort([10])     mergeSort([76])     mergeSort([73])
//* returning:                [24]     ,      [10]           ,             [76]       ,      [73]
//* merging the results:      [24]  merge with  [10]          ,               [76]  merge with  [73]
//* merging the results:                [10,24]           merge with         [73,76]
//? final result:                                 [10, 24, 73, 76,]


//! Time Complexity: O(n log(n))
//! Space Complexity: O(n)

//! The time complexity for the decomposition (splitting the array) is: O(log(n))
//! for example: if we want to split an array of 8 elements we will use 3 splits (until we receive 8 arrays of 1 elements),
//! and for an array of 16 elements we will use 4 splits (until we receive 16 arrays of 1 elements).

//! The time complexity for the comparisons (between arrays) is: O(n) * per decomposition *
//! for example: if we have an array of 8 elements, in each decomposition we will eventually compare between all the elements of the array,
//! so in every step of the decomposition we will compare between 8 elements.