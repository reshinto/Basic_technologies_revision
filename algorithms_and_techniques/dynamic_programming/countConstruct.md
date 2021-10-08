# Count Construct example
```
Write a function "countConstruct(target, wordBank)" that accepts a target string and an array of strings

The function should return the number of ways that the "target" can be constructed by concatenating elements of the "wordBank" array

You may reuse elements of "wordBank" as many times as needed
```
- explanation
```
Question: countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])

Answer: 1
```
- graph display of what goes behind the hood for `countConstruct(target, wordBank)`
```
countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]) -> 1
* do not take out characters from the middle of a string
* only branch the children if we have a matching prefix in the word bank

m = target.length
n = wordBank.length
height = m

       abcdef                       1
  /(ab)  |(abc)  \(abcd)            
cdef    def       ef                * n
 |(cd)   |(def)
 ef      ""                         * n
 
when leaf node is "" returns value 1 to parent
when leaf node is not empty and cannot be broken down any more, returns value 0 to parent
parent would then sum all of the children node values together
```
```
countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]) -> 2

         purple
  /(purp)  |(p)  \(purpl)            
 le      urple    e
 |(le)     |(ur)
 ""       ple
           |(p)
           le
           |(le)
           ""
```
## Naive solution
- time complexity is `O((n^m) * m)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const countConstruct = (target, wordBank) => {
  if (target === "") return 1;
  
  let totalCount = 0;
  
  for (const word of wordBank) { // time n, space m
    if (target.indexOf(word) === 0) {
      const numWaysForRest = countConstruct(target.slice(word.length), wordBank);  // time ^m, * m, space m
      totalCount += numWaysForRest;
    }
  }
  return totalCount;
};

console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 0
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // 4
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 0
```
## Memoization solution
- time complexity is O(n * m * m), simplified to O(n * m^2)
- space complexity is O(m * m), simplified to O(m^2)
```javascript
const countConstruct = (target, wordBank, memo={}) => {
  if (target in memo) return memo[target];
  if (target === "") return 1;
  
  let totalCount = 0;
  
  for (const word of wordBank) { // time n
    if (target.indexOf(word) === 0) {
      const numWaysForRest = countConstruct(target.slice(word.length), wordBank, memo);  // time m * m, space m
      totalCount += numWaysForRest;
    }
  }
  memo[target] = totalCount
  return totalCount;
};

console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 0
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // 4
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 0
```
## Tabulation solution
