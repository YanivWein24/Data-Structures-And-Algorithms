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