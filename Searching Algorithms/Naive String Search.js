const naiveSearch = (long, short) => {
    var count = 0
    for (var i = 0; i < long.length; i++) {
        for (var j = 0; j < short.length; j++) {
            if (short[j] !== long[i + j]) {
                break
            }
            if (j === short.length - 1) {
                count++
            }
        }
    }
    return count
}

console.log(naiveSearch("hello world", "world")) // 1
console.log(naiveSearch("hello world", "hi")) // 0
console.log(naiveSearch("hello world", "lo")) // 1 
console.log(naiveSearch("hello world", "l")) // 3