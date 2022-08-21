//* Radix Sort:

//* Radix sort is a special sorting algorithm that works on lists of numbers
//* It NEVER makes comparisons between elements!
//* It exploits the fact that information about the size of a number is encoded in the number of digits (more digits = larger number)


//? Radix Sort Helpers:

//? In order to implement radix sort, it's useful to build a few helper functions first:

//! 1. getDigit(num,place) - returns the digit in 'num' at the given 'place' value:

//* getDigit(12345, 0) // 5
//* getDigit(12345, 2) // 3
//* getDigit(12345, 5) // 0

const getDigit = (num, index) => {
    return Math.floor(Math.abs(num) / Math.pow(10, index)) % 10
    //? Math.abs() is used to work with both positive and negative numbers.
}

//* Explaining the math:
//* getDigit(7323, 2)
//* Math.pow(10, index) = Math.pow(10, 2)) = 100
//* Math.abs(7323) = 7323 (if the number was negative, than now its positive)
//* 7323 / 100 = 73.23
//* Math.floor(73.23) = 73
//* 73 % 10 = 3
//* Final result: 3 

console.log(getDigit(12345, 0)) // 5
console.log(getDigit(12345, 3)) // 2
console.log(getDigit(7323, 1)) // 2


//! 2. digitCount(num) - returns the number of digits in 'num':

//* digitCount(3) // 1
//* digitCount(42) // 2
//* digitCount(518) // 3

const digitCount = (num) => {
    if (num === 0) return 1
    return Math.floor(Math.log10(Math.abs(num))) + 1
    //? Math.abs() is used to work with both positive and negative numbers.
}

//* Explaining the math:
//* digitCount(423)
//* Math.abs(423) = 423
//* Math.log10(423) = 2.62634...
//* Math.floor(2.62634) = 2
//* 2 + 1 = 3
//* Final result: 3 

//* Another example:
//* digitCount(-21388)
//* Math.abs(-21388) = 21388
//* Math.log10(21388) = 4.33017...
//* Math.floor(4.33017) = 4
//* 4 + 1 = 5
//* Final result: 5

console.log(digitCount(3)) // 1
console.log(digitCount(42)) // 2
console.log(digitCount(518)) // 3
console.log(digitCount(0)) // 1


//! 3. mostDigits(nums) - Given an array of numbers, returns the number of digits in the largest numbers in the array.

//* mostDigits([1234,56,7]) // 4
//* mostDigits([1,1,11111,1]) // 5
//* mostDigits([12,34,56,78]) // 2

const mostDigits = (nums) => {
    let maxDigits = 0
    for (let i = 0; i < nums.length; i++) {
        maxDigits = Math.max(maxDigits, digitCount(nums[i]));
        // Using 'digitCount' function, which we already set before.
    }
    return maxDigits
}

console.log(mostDigits([1234, 56, 7])) // 4
console.log(mostDigits([1, 1, 11111, 1])) // 5 
console.log(mostDigits([12, 34, 56, 78])) // 2
console.log(mostDigits([3, 78, 45236758, 123, 3754])) // 8


//* Radix Sort Pseudocode:

//* * Define a function that accepts a list of numbers
//* * Figure out how many digits the largest number has (using 'mostDigits()')
//* * Loop from k = 0 up to this largest number of digits
//* * For each iteration of the loop:
//*     * Create buckets for each digit (0-9)
//*     * Place each number in the corresponding bucket based on its k'th digit.
//* * Replace our existing array with values in our buckets, starting with 0 and going up to 9.
//* * Return the sorted array at the end!


const radixSort = (nums) => {
    let maxDigitCount = mostDigits(nums)
    for (let k = 0; k < maxDigitCount; k++) {
        let digitBuckets = Array.from({ length: 10 }, () => [])
        // Creating an array of 10 empty sub-arrays : [[], [], [], [], [],[], [], [], [], []]
        for (let i = 0; i < nums.length; i++) {
            let digit = getDigit(nums[i], k)
            // if nums[i] = 1234 and k = 0, then = getDigit(1234,0) = 4 (the 0th index from right)
            digitBuckets[digit].push(nums[i]);
            // so we will push nums[i] to digitBuckets[4]
        }
        nums = [].concat(...digitBuckets)
        // if we won't use the spread operator,our array will end up like this: [[1],[2],[3]] instead of [1,2,3].
    }
    return nums
}

console.log(radixSort([23, 345, 5467, 12, 2345, 9852]))  // [ 12, 23, 345, 2345, 5467, 9852 ]
console.log(radixSort([234, 15, 67, 0, 2345, 9852]))  // [ 0, 15, 67, 234, 2345, 9852 ]

//! Time Complexity: O(n * k) - the number of elements in the array times the number of digits in the largest numbers
//! Space Complexity: O(n + k) - the number of elements in the array plus the number of digits in the largest numbers