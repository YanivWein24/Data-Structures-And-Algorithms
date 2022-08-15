//* sort() method:

//* the sort() method is comparing the *string Unicode* values.
//* meaning:

//* using this method with *strings* will work.
console.log(["test", "hello", "world", "lorem", "ipsum"].sort()); //[ 'hello', 'ipsum', 'lorem', 'test', 'world' ]

//* But if we will try to do the same thing with numbers, we will get a wrong output
console.log([15, 3, 42, 9, 70].sort()); // [ '15', '3', '42', '70', '9' ]

//* The method converts all the numbers into strings, and compare each number by its *first character* in the converted string.
//* For example: 15 (int) is converted to '15' (string) and its first character is '1'

//? We can still overcome this problem, by comparing 2 numbers at a time and checking whether the result
//? is positive or negative.

const numberCompare = (num1, num2) => {
    return num1 - num2
}
console.log([15, 3, 42, 9, 70].sort(numberCompare)) // [ 3, 9, 15, 42, 70 ]

const numberCompareReversed = (num1, num2) => {
    return num2 - num1
}
console.log([15, 3, 42, 9, 70].sort(numberCompareReversed)) // [ 70, 42, 15, 9, 3 ]


//? Another good example is if we are trying to compare strings by their length.

const compareByLength = (str1, str2) => {
    return str1.length - str2.length
}
console.log(["test", "hello", "algorithm", "michael", "hi"].sort(compareByLength)) // [ 'hi', 'test', 'hello', 'michael', 'algorithm' ]

//? Or by descending order

const compareByLengthRevered = (str1, str2) => {
    return str2.length - str1.length
}
console.log(["test", "hello", "algorithm", "michael", "hi"].sort(compareByLengthRevered)) // [ 'algorithm', 'michael', 'hello', 'test', 'hi' ]
