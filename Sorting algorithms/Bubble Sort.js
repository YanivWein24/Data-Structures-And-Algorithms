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

//* Bubble Sort:
//! Time Complexity: O(n^2)

const bubbleSort = (arr) => {
    for (let i = arr.length; i > 0 - 1; i--) {
        for (let j = 0; j < i - 1; j++) {
            console.log(arr, arr[j], arr[j + 1])
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                swap(arr, j, j + 1) // Using the function we created above
            }
        }
    }
    return arr
}

console.log(bubbleSort([3, 2, 5, 1, 6])) // [ 1, 2, 3, 5, 6 ]
console.log(bubbleSort([29, -2, 33, 0, 79, 102])) // [ -2, 0, 29, 33, 79, 102 ]


//* Optimized version of bubble sort - great for arrays that are *nearly* sorted

const optimizedBubbleSort = (arr) => {
    let noSwaps
    for (let i = arr.length; i > 0 - 1; i--) {
        noSwaps = true
        for (let j = 0; j < i - 1; j++) {
            console.log(arr, arr[j], arr[j + 1])
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
                noSwaps = false
            }
        }
        if (noSwaps) break
    }
    return arr
}

console.log('\n\n')
console.log(optimizedBubbleSort([8, 1, 2, 3, 4, 5, 6, 7])) // [ 1, 2, 3, 5, 6 ]

//* In this version, in the *best* case we can get linear time complexity (O(n))