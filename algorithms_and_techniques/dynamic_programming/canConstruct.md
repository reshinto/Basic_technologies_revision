# Can Construct example
```
Write a function "canConstruct(target, wordBank)" that accepts a target string and an array of strings

The function should return a boolean indicating whether or not the "target" can be constructed by concatenating elements of the "wordBank" array

You may reuse elements of "wordBank" as many times as needed
```
- explanation
```
Question 1: canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])

since "abc" + "def" = "abcdef"
Answer 1: true

Question 2: canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])

since there are 0 ways to generate "skateboard"
Answer 2: false

it is easier to generate a shorter string than a longer string

Question 3: canConstruct("", ["cat", "dog", "mouse"])

since we can choose not to use any of the elements in the array
Answer 3: true
```
- graph display of what goes behind the hood for `canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"])`
```
canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]) -> true
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
 
when leaf node is "" returns true value to parent
when leaf node is not empty and cannot be broken down any more, returns false value to parent
```
```
canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]) -> false

   skateboard
   /(ska)   \(sk)
teboard   ateboard
   |(t)       |(ate)
eboard      board
          /(bo)  \(board)
         ard      d
```
## Naive solution
- time complexity is `O((n^m) * m)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const canConstruct = (target, wordBank) => {
  if (target === "") return true
  
  for (const word of wordBank) {  // time n
    if (target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);  // time, space this copies an array which the worst case will be m times
      if (canConstruct(suffix, wordBank)) {  // time ^m, n has to be recalled depending on m, space m
        return true;
      }
    }
  }
  return false;
}

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));  // true
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));  // false
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // true
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"]));  // false
```
## Memoization solution
- time complexity is `O(n * m * m)`, simplified to `O(n * m^2)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const canConstruct = (target, wordBank, memo={}) => {
  if (target in memo) return memo[target];  // space m
  if (target === "") return true
  
  for (const word of wordBank) {  // time n
    if (target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);  // time, space this copies an array which the worst case will be m times
      if (canConstruct(suffix, wordBank, memo)) {  // time m, since no duplicate of n is being compute
        memo[target] = true;
        return true;
      }
    }
  }
  memo[target] = false;
  return false;
}

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));  // true
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));  // false
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // true
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"]));  // false
```
## Tabulation solution
```
canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]) -> true

m = target
n = wordBank.length

first create an array the size of the target.length + 1
set default value to be false

index      :   0     1     2     3     4     5     6
value      : false false false false false false false
Actual char:   a     b     c     d     e     f

when target value is an empty string, no string concatenation is required to get "", therefore return value should be true

index      :   0     1     2     3     4     5     6
value      :  true false false false false false false
Actual char:   a     b     c     d     e     f

look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd"] is "ab"
current index is 0, value is True, and actual char is "a"
since first char of "ab" === actual char "a"
we can look at "ab" char length 2 steps ahead of the current index,
value can be changed to the same as current value true

index      :   0     1     2     3     4     5     6
value      :  true false true false false false false
Actual char:   a     b     c     d     e     f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd"] is "abc"
current index is 0, value is True, and actual char is "a"
since first char of "abc" === actual char "a"
we can look at "abc" char length 3 steps ahead of the current index,
value can be changed to the same as current value true

index      :   0     1     2     3     4     5     6
value      :  true false true  true false false false
Actual char:   a     b     c     d     e     f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd"] is "cd"
current index is 0, value is True, and actual char is "a"
since first char of "cd" !== actual char "a"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true false false false
Actual char:   a     b     c     d     e     f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd"] is "def"
current index is 0, value is True, and actual char is "a"
since first char of "def" !== actual char "a"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true false false false
Actual char:   a     b     c     d     e     f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd"] is "abcd"
current index is 0, value is True, and actual char is "a"
since first char of "abcd" === actual char "a"
we can look at "abcd" char length 4 steps ahead of the current index,
value can be changed to the same as current value true

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd"] is "ab"
current index is 1, value is false, and actual char is "b"
since value is false, we can skip the entire process and move to the next index

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd"] is "ab"
current index is 2, value is True, and actual char is "c"
since first char of "ab" !== actual char "c"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd"] is "abc"
current index is 2, value is True, and actual char is "c"
since first char of "abc" !== actual char "c"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd"] is "cd"
current index is 2, value is True, and actual char is "c"
since first char of "cd" === actual char "c"
we can look at "cd" char length 2 steps ahead of the current index,
value can be changed to the same as current value true

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd"] is "def"
current index is 2, value is True, and actual char is "c"
since first char of "def" !== actual char "c"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd"] is "abcd"
current index is 2, value is True, and actual char is "c"
since first char of "abcd" !== actual char "c"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd"] is "ab"
current index is 3, value is True, and actual char is "d"
since first char of "ab" !== actual char "d"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd"] is "abc"
current index is 3, value is True, and actual char is "d"
since first char of "abc" !== actual char "d"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd"] is "cd"
current index is 3, value is True, and actual char is "d"
since first char of "cd" !== actual char "d"
we can ignore and skip this

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false false
Actual char:   a     b     c     d     e     f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd"] is "def"
current index is 3, value is True, and actual char is "d"
since first char of "def" === actual char "d"
we can look at "def" char length 3 steps ahead of the current index,
value can be changed to the same as current value true

index      :   0     1     2     3     4     5     6
value      :  true false true  true  true false  true
Actual char:   a     b     c     d     e     f

we can stop here, since nothing else will change
```
- time complexity is `O(n * m * m)`, simplified to `O(n * m^2)`
- space complexity is `O(m)`
```javascript
const canConstruct = (target, wordBank) => {
  const table = Array(target.length + 1).fill(false);  // space m
  table[0] = true;
  
  for (let i=0; i<= target.length; i++) {  // time m
    if (table[i]) {
      for (const word of wordBank) {  // time n
        if (target.slice(i , i + word.length) === word) {  // time m
          table[i + word.length] = true;
        }
      }
    }
  }
  return table[target.length];
}

console.log(canConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd"]));  // true
console.log(canConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"]));  // false
console.log(canConstruct("enterapotentpot", ["a", "p", "ent", "enter", "ot", "o", "t"]));  // true
console.log(canConstruct("eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeef", ["e", "ee", "eee", "eeee", "eeeee", "eeeeee"]));  // false
```
