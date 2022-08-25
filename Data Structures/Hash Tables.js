//! Hash Tables:

//* A key:Value pair data structure.
//* Nearly every programming language has some sort of a hash table data structure built in.
//* Because of their speed, hash tables are very commonly used!
//* Hash tables are easier and more "human" to read than arrays.
//* (for example: colors["blue"] is much easier to read and understand than colors[2])

//? To implement a hash table, we'll be using an array.
//? In order to look up values by key, we need a way to convert keys into valid array indices.
//? To do this we'll create a "hash function".

//* What makes a good hash?
//* 1. Fast (i.e constant time!)
//* 2. Does'nt cluster outputs at specific indices, but distributes uniformly
//* 3. Deterministic - same inputs will ALWAYS yield the same output

// Getting the utf-8 value of a character in a string: (the first character)
console.log("abc".charCodeAt(0)) // 97 - a
console.log("bca".charCodeAt(0)) // 98 - b
console.log("cba".charCodeAt(0)) // 99 - c


const hash = (key, arrayLength) => {
    let total = 0
    for (let char of key) {  // if with we don't need to create 'let char = key[i]'
        // map 'a' to 1, 'b' to 2, 'c' to 3 etc..
        let value = char.charCodeAt(0) - 96
        total = (total + value) % arrayLength // the output will be an index between 0 and 'arrayLength'.
    }
    return total
}

console.log(hash("orangeRed", 10)) // 5
console.log(hash("cyan", 10)) // 3
console.log(hash("pink", 10)) // 0
console.log(hash("blue", 10)) // also 0

//! Problems with this implementation:
//! 1. Only hashes strings
//! 2. Not constant time - linear in key length (larger strings will take longer time to hash)
//! 3. We can get duplicate results. for example: hash("pink", 10) = 0 , hash("blue", 10) = 0 


//? Better Implementation:
//? In this implementation we set a maximum iteration, so that if the function accepts a string with A LOT 
//? of characters, It will not iterate over all of them.
//? ALso we are adding *Prime *Numbers* - it is helpful in spreading out the keys more uniformly.
//? It's also helpful if the array that your'e putting values into has a prime length. 


const betterHash = (key, arrayLength) => {
    let total = 0
    let WEIRD_PRIME = 31
    for (let i = 0; i < Math.min(key.length, 100); i++) {
        // If we have a small string we will iterate over it.
        // If we have a large string with a million chars, we will only iterate over the first 100.
        let char = key[i]
        let value = char.charCodeAt(0) - 96
        total = ((total * WEIRD_PRIME) + value) % arrayLength // the output will be an index between 0 and 'arrayLength'.
    }
    return total
}

console.log(betterHash("hello", 13)) // 7
console.log(betterHash("goodbye", 13)) // 9
console.log(betterHash("hi", 13)) // 10


//? Dealing With Collisions:

//? Even with a large array and a great hash function, collisions are inevitable.
//? One way of dealing with collisions is using "Linear Probing".
//?   With linear probing, when we find a collision, we search through the array to find the next empty slot.
//? Other way to deal with collisions is called "Separate Chaining"
//?   With Separate Chaining, at each index in out array we store values using a more sophisticated data
//?   structure (e.g an array or a linked list).
//? This allows us to store *multiple* key:value pairs in the same position.

//* With 'Separate Chaining' we can store a ton of data inside a fixed array,
//* (because we can store multiple values at the same index).
//* where as with 'Linear Probing', if we have for example an array of 10 indexes.
//* We will never be able to store more than 10 values in the array.

// Example of 'Separate Chaining':

//   [[], [], [], [], [], [], [], [], [], []]
// idx 0, 1,  2,  3,  4,  5,  6,  7,  8,  9,

// If we try to hash the strings 'darkblue' and 'salmon' we will receive the index '4' in both cases.
// hash('darkblue') = 4
// hash('salmon') = 4

//   [[], [], [], [], [['darkblue', 'salmon']], [], [], [], [], []]

// So now, if we will look at index 4 of the array, we will find another array containing 'darkblue' and 'salmon'.
// And if we want to search for a specific value that is stored at index 4,
// we will iterate over all values inside the array at index 4 until we find what we're looking for.


//! Time Complexity: (average / best case - with a good hash function and good distribution)

//! Insertion - O(1)
//! Deletion - O(1)
//! Access - O(1)


//? Methods Pseudocode:
//? set(key, value):
//? * Create a function that Accepts a key and a value.
//? * Hash the key using the hash function.
//? * Store the key-value pair in the hash table array via 'separate chaining' (creating inner arrays).

//? get(key):
//? * Create a function that Accepts a key.
//? * Hash the key using the hash function.
//? * Retrieve the key-value pair in the hash table using 'separate chaining'.
//? * If the key is not there, return undefined.

//? keys():
//? * Loop through the hash table array and return an array of *keys* in the table

//? values():
//? * Loop through the hash table array and return an array of *values* in the table

class HashTable {
    constructor(size = 53) {  // if we don't set value for 'size', just use 53 (or any other *PRIME* number)
        this.keyMap = new Array(size)   // Creates a new array with length of 'size'
    }
    _hash(key) {
        let total = 0
        let WEIRD_PRIME = 31
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            // If we have a small string we will iterate over it.
            // If we have a large string with a million chars, we will only iterate over the first 100.
            let char = key[i]
            let value = char.charCodeAt(0) - 96
            total = ((total * WEIRD_PRIME) + value) % this.keyMap.length // the output will be an index between 0 and 'arrayLength'.
        }
        return total
    }
    Set(key, value) {
        let newKeyIndex = this._hash(key)
        if (!this.keyMap[newKeyIndex]) {
            this.keyMap[newKeyIndex] = []
        }
        this.keyMap[newKeyIndex].push([key, value])
    }
    get(key) {
        let index = this._hash(key)
        if (!this.keyMap[index]) return undefined
        let innerArray = this.keyMap[index]
        for (let i = 0; i < innerArray.length; i++) {
            if (innerArray[i][0] === key) return innerArray[i][1]
            // 'innerArray[i][0] holds the KEY, innerArray[i][1] holds the VALUE
        }
        return undefined // if we still didn't find a match
    }
    keys() {
        let keysArr = []
        for (let i = 0; i < this.keyMap.length; i++) {
            if (!this.keyMap[i]) continue
            for (let j = 0; j < this.keyMap[i].length; j++) {
                if (this.keyMap[i][j]) {
                    if (!keysArr.includes(this.keyMap[i][j][0])) keysArr.push(this.keyMap[i][j][0])
                    // Prevents from duplicates
                }
            }
        }
        return keysArr
    }
    values() {
        let valuesArr = []
        for (let i = 0; i < this.keyMap.length; i++) {
            if (!this.keyMap[i]) continue
            for (let j = 0; j < this.keyMap[i].length; j++) {
                if (this.keyMap[i][j]) {
                    if (!valuesArr.includes(this.keyMap[i][j][1])) valuesArr.push(this.keyMap[i][j][1])
                    // Prevents from duplicates 
                }
            }
        }
        return valuesArr
    }
}

let ht = new HashTable(7)

ht.Set("maroon", "#800000")
console.log(ht)  // HashTable { keyMap: [ <5 empty items>, [ [Array] ], <1 empty item> ] }

ht.Set("yellow", "#FFFF00")
ht.Set("olive", "#808000")
ht.Set("salmon", "#FA8072")
ht.Set("lightCoral", "#F08080")
ht.Set("mediumVioletRed", "#C71585")
ht.Set("plum", "DDA0DD")

console.log(ht.keyMap[0]) // [ [ 'maroon', '#800000' ], [ 'plum', 'DDA0DD' ] ]
console.log(ht.keyMap[1]) // [ [ 'yellow', '#FFFF00' ] ]
console.log(ht.keyMap[4]) // [ [ 'olive', '#808000' ], [ 'salmon', '#FA8072' ] ]

console.log(ht.get("salmon")) // #FA8072
console.log(ht.get("yellow")) // #FFFF00
console.log(ht.get("olive")) // #808000
console.log(ht.get("hello world!")) // undefined

console.log(ht.keys())  // ['maroon','plum','yellow','mediumVioletRed','olive','salmon','lightCoral']
console.log(ht.values())  // ['#800000', 'DDA0DD','#FFFF00', '#C71585','#808000', '#FA8072','#F08080']