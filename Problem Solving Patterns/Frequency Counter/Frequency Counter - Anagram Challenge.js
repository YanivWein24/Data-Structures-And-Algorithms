//* Frequency Counter - validAnagram

//? Given two strings, write a function to determine if the second string is an anagram of the first.
//? An anagram is a word, phrase, or name formed by rearranging the letters of another, such as 'cinema', formed from 'iceman'.

//? Examples:
//? validAnagram('', '') // true
//? validAnagram('aaz', 'zza') // false
//? validAnagram('anagram', 'nagaram') // true
//? validAnagram("rat","car") // false) // false
//? validAnagram('awesome', 'awesom') // false
//? validAnagram('amanaplanacanalpanama', 'acanalmanplanpamana') // false
//? validAnagram('qwerty', 'qeywrt') // true
//? validAnagram('texttwisttime', 'timetwisttext') // true
//? Note: You may assume the string contains only lowercase alphabets.

//! Time Complexity - O(n)

const validAnagram = (first, second) => {
    //* both strings must be the same length 
    if (first.length !== second.length) {
        return false
    }

    const lookup = {}

    for (let i = 0; i < first.length; i++) {
        let letter = first[i]
        //* if letter exists, increment, otherwise set to 1.
        lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1
    }

    console.log(lookup)

    for (let i = 0; i < second.length; i++) {
        let letter = second[i]
        //* if we can't find the letter, or the letter is zero than its not an anagram
        if (!lookup[letter]) {
            return false
        } else {
            lookup[letter] -= 1
        }
    }
    console.log(lookup)
    return true
}

console.log(validAnagram('anagram', 'nagaram'))
// { a: 3, n: 1, g: 1, r: 1, m: 1 }
// { a: 0, n: 0, g: 0, r: 0, m: 0 }
// true

console.log(validAnagram('anagram', 'nagaras'))
// { a: 3, n: 1, g: 1, r: 1, m: 1 }
// false
