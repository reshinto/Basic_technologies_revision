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
countConstruct("purple", ["purp", "p", "ur", "le", "purpl"]) -> 2

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
  
  for (const word of wordBank) { // time n
    if (target.indexOf(word) === 0) {
      const numWaysForRest = countConstruct(target.slice(word.length), wordBank);  // time ^m, * m, space m^2
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
  if (target in memo) return memo[target]; // space m
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
```
countConstruct("purple", ["purp", "p", "ur", "le", "purpl"]) -> 2

m = target
n = wordBank.length

first create an array the size of the target.length + 1
set default value to be 0

index      :   0     1     2     3     4     5     6
value      :   0     0     0     0     0     0     0
Actual char:   p     u     r     p     l     e

when target value is an empty string, no string concatenation is required to get "", therefore return value should be 1

index      :   0     1     2     3     4     5     6
value      :   1     0     0     0     0     0     0
Actual char:   p     u     r     p     l     e

look at the 1st element of the array ["purp", "p", "ur", "le", "purpl"] is "purp"
current index is 0, value is 1, and actual char is "p"
since first char of "purp" === actual char "p"
we can look at "purp" char length 4 steps ahead of the current index,
value can be changed to the same as current value 1

index      :   0     1     2     3     4     5     6
value      :   1     0     0     0     1     0     0
Actual char:   p     u     r     p     l     e

look at the 2nd element of the array ["purp", "p", "ur", "le", "purpl"] is "p"
current index is 0, value is 1, and actual char is "p"
since first char of "p" === actual char "p"
we can look at "p" char length 1 steps ahead of the current index,
value can be changed to the same as current value 1

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     0     0
Actual char:   p     u     r     p     l     e

look at the 3rd element of the array ["purp", "p", "ur", "le", "purpl"] is "ur"
current index is 0, value is 1, and actual char is "p"
since first char of "ur" !== actual char "p"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     0     0
Actual char:   p     u     r     p     l     e

look at the 4th element of the array ["purp", "p", "ur", "le", "purpl"] is "le"
current index is 0, value is 1, and actual char is "p"
since first char of "le" !== actual char "p"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     0     0
Actual char:   p     u     r     p     l     e

look at the 5th element of the array ["purp", "p", "ur", "le", "purpl"] is "purpl"
current index is 0, value is 1, and actual char is "p"
since first char of "purpl" === actual char "p"
we can look at "purpl" char length 5 steps ahead of the current index,
value can be changed to the same as current value 1

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     1     0
Actual char:   p     u     r     p     l     e

move current value to the next index
look at the 1st element of the array ["purp", "p", "ur", "le", "purpl"] is "purp"
current index is 1, value is 1, and actual char is "u"
since first char of "purp" !== actual char "u"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     1     0
Actual char:   p     u     r     p     l     e

look at the 2nd element of the array ["purp", "p", "ur", "le", "purpl"] is "p"
current index is 1, value is 1, and actual char is "u"
since first char of "p" !== actual char "u"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     0     1     1     0
Actual char:   p     u     r     p     l     e

look at the 3rd element of the array ["purp", "p", "ur", "le", "purpl"] is "ur"
current index is 1, value is 1, and actual char is "u"
since first char of "ur" === actual char "u"
we can look at "ur" char length 2 steps ahead of the current index,
value can be changed to the same as current value 1

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     1     1     0
Actual char:   p     u     r     p     l     e

look at the 4th element of the array ["purp", "p", "ur", "le", "purpl"] is "le"
current index is 1, value is 1, and actual char is "u"
since first char of "le" !== actual char "u"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     1     1     0
Actual char:   p     u     r     p     l     e


look at the 5th element of the array ["purp", "p", "ur", "le", "purpl"] is "purpl"
current index is 1, value is 1, and actual char is "u"
since first char of "purpl" !== actual char "u"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     1     1     0
Actual char:   p     u     r     p     l     e

move current value to the next index
look at the 1st element of the array ["purp", "p", "ur", "le", "purpl"] is "purp"
current index is 2, value is 0, and actual char is "r"
since value is 0
we can ignore and skip the entire process and move to the next index

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     1     1     0
Actual char:   p     u     r     p     l     e

move current value to the next index
look at the 1st element of the array ["purp", "p", "ur", "le", "purpl"] is "purp"
current index is 3, value is 1, and actual char is "p"
since first char of "purp" === actual char "p"
we can look at "purp" char length 4 steps ahead of the current index,
it is out of range, nothing needs to be changed

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     1     1     0
Actual char:   p     u     r     p     l     e

look at the 2nd element of the array ["purp", "p", "ur", "le", "purpl"] is "p"
current index is 3, value is 1, and actual char is "p"
since first char of "p" === actual char "p"
we can look at "p" char length 1 steps ahead of the current index,
existing value of 1 can be added to the current value 1 changing the value to 2

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 3rd element of the array ["purp", "p", "ur", "le", "purpl"] is "ur"
current index is 3, value is 1, and actual char is "p"
since first char of "ur" !== actual char "p"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 4th element of the array ["purp", "p", "ur", "le", "purpl"] is "le"
current index is 3, value is 1, and actual char is "p"
since first char of "le" !== actual char "p"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 5th element of the array ["purp", "p", "ur", "le", "purpl"] is "purpl"
current index is 3, value is 1, and actual char is "p"
since first char of "purpl" === actual char "p"
we can look at "purpl" char length 5 steps ahead of the current index,
it is out of range, nothing needs to be changed

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

move current value to the next index
look at the 1st element of the array ["purp", "p", "ur", "le", "purpl"] is "purp"
current index is 4, value is 2, and actual char is "l"
since first char of "purp" !== actual char "l"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 2nd element of the array ["purp", "p", "ur", "le", "purpl"] is "p"
current index is 4, value is 2, and actual char is "l"
since first char of "p" !== actual char "l"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 3rd element of the array ["purp", "p", "ur", "le", "purpl"] is "ur"
current index is 4, value is 2, and actual char is "l"
since first char of "ur" !== actual char "l"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     0
Actual char:   p     u     r     p     l     e

look at the 4th element of the array ["purp", "p", "ur", "le", "purpl"] is "le"
current index is 4, value is 2, and actual char is "l"
since first char of "le" === actual char "l"
we can look at "le" char length 2 steps ahead of the current index,
existing value of 0 can be added to the current value 2 changing the value to 2

index      :   0     1     2     3     4     5     6
value      :   1     1     0     1     2     1     2
Actual char:   p     u     r     p     l     e

we can stop here, since nothing else will change
```
- time complexity is O(n * m * m), simplified to O(n * m^2)
- space complexity is O(m), simplified to O(m)
```javascript
const countConstruct = (target, wordBank) => {
  const table = Array(target.length + 1).fill(0);  // space m
  table[0] = 1;
  
  for (let i=0; i<=target.length; i++) {  // time m
    for (const word of wordBank) {  // time n
      if (target.slice(i, i + word.length) === word) {  // time m
        table[i + word.length] += table[i];
      }
    }
  }
  return table[target.length];
};

console.log(countConstruct("purple", ["purp", "p", "ur", "le", "purpl"])); // 2
console.log(countConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])); // 1
console.log(countConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // 0
console.log(countConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // 4
console.log(countConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"])); // 0
```
