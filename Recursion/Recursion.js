//* Recursion:

//? Write a function called "countDown" which accepts an integer called "num" and logs all the number
//? from "num" down to 1, and then log "All done!" when reaching 0.

//* Using a loop:
const countDown = (num) => {
    for (let i = num; i > 0; i--) {
        console.log(i)
    }
    console.log('All done!')
}

countDown(5)

//* Using recursion:
const recursionCountDown = (num) => {
    if (num <= 0) {
        console.log('All done!')
        return
    }
    console.log(num)
    num--
    recursionCountDown(num)
}

recursionCountDown(5)
recursionCountDown(3)
recursionCountDown(0)



//? Write a function called "sumRange" which accepts an integer called "num" and returns the sum of all the numbers
//? from 1 to "num"

const sumRange = (num) => {
    if (num === 0) return 0
    if (num === 1) return 1
    return num + sumRange(num - 1)
}

console.log(sumRange(3)) // 6
console.log(sumRange(5)) // 15
console.log(sumRange(0)) // 0
console.log(sumRange(1)) // 1


//? Write a function called "factorial" which accepts an integer called "num" and returns the multiplication of all the numbers
//? from 1 to "num"


//* Using a loop:
const factorial = (num) => {
    let total = 1
    for (let i = num; i > 0; i--) {
        total *= i
    }
    return total
}

console.log("\n \nUsing Loop:")
console.log(factorial(5)) // 120
console.log(factorial(7)) // 5040
console.log(factorial(3)) // 6
console.log(factorial(0)) // 0
console.log(factorial(1)) // 1


//* Using recursion:
const factorialRecursion = (num) => {
    let multiply = num
    if (num === 0) return 0
    if (num === 1) return 1
    return multiply * factorialRecursion(num - 1)
}
console.log("\n \nUsing Recursion")
console.log(factorialRecursion(5)) // 120
console.log(factorialRecursion(7)) // 5040
console.log(factorialRecursion(3)) // 6
console.log(factorialRecursion(1)) // 1
console.log(factorialRecursion(0)) // 0



//* Power:

//? Write a function called power which accepts a base and an exponent.
//? The function should return the power of the base to the exponent.
//? This function should mimic the functionality of Math.pow().
//? Do not worry about negative bases and exponents.

const power = (num, exponent) => {
    if (exponent === 0) return 1
    return num * power(num, exponent - 1)
}

console.log(power(2, 3)) // 8
console.log(power(4, 3)) // 64
console.log(power(12, 0)) // 1
console.log(power(0, 12)) // 