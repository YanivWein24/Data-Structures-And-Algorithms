//* General Structure Of A Helper Frequency:

const outer = (input) => {
    var outerScopedVariable = []

    const innerRecursive = (innerInput) => {
        // modify the outerScopedVariable
        innerRecursive(innerInput - 1)
    }

    innerRecursive(input)

    return outerScopedVariable
}


//* Example:

//? Write a recursive function named "collectOddValues", which accepts an array of integers an returns an array
//? of all the odd numbers.


//* Using A Helper Method:

const collectOddValues = (arr) => {

    let result = [];

    const helper = (helperInput) => {
        if (helperInput.length === 0) return
        if (helperInput[0] % 2) {
            result.push(helperInput[0])
        }
        helper(helperInput.slice(1))
    }
    helper(arr)
    return result
}

console.log(collectOddValues([1, 2, 3, 4, 5, 6]))
console.log(collectOddValues([4, 5, 6, 23, 45, 67, 99]))


//* Using Pure Recursion:

const collectOddValues2 = (arr) => {

    let newArr = [];

    if (arr.length === 0) return newArr
    if (arr[0] % 2) {
        newArr.push(arr[0])
    }

    newArr = newArr.concat(collectOddValues2(arr.slice(1)))
    return newArr
}

console.log(collectOddValues2([1, 2, 3, 4, 5, 6]))
console.log(collectOddValues2([4, 5, 6, 23, 45, 67, 99]))