# All Construct example
```
Write a function "allConstruct(target, wordBank)" that accepts a target string and an array of strings

The function should return a 2D array containing all of the ways that the "target" can be constructed by concatenating elements of the "wordBank" array
Each element of the 2D array should represent 1 combination that constructs the "target"

You may reuse elements of "wordBank" as many times as needed
```
- explanation
```
Question 1: allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])

Answer 1: [[purp, le], [p, ur, p, le]]

Question 2: allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])

Answer 2: [
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]

Question 3: allConstruct("hello", ["cat", "dog", "mouse"])

Answer 3: []

Question 4: allConstruct("", ["cat", "dog", "mouse"])

Answer 4: [[]]
```
- graph display of what goes behind the hood for `allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"])`
```
allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]) -> [
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]

                  abcdef
    /(ab)           |(abc)    \(abcd)
 cdef              def        ef
 /(cd)  \(c)        |(def)    |(ef)
ef      def        ""        ""
 |(ef)   |(def)
""       ""

when leaf node is "" returns value [[]] to parent
while doing that, append the prefix value from the parent which was removed in the leaf node
for example at parent node ef, it should return [["ef"]]

for example at parent node cdef, if have 2 leaf nodes of value [["cd", "ef"]] and [["c", "def"]]
it would then be combined to [["cd", "ef"], ["c", "def"]]
```
- graph display of what goes behind the hood for `allConstruct("purple", ["purp", "p", "ur", "le", "purpl"])`
```
allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]) -> [[purp, le], [p, ur, p, le]]

[["purp", "le]]   +  [["p", "ur", "p", "le"]] + []

                     purple
  /(purp)              |(p)                       \(purpl)            
 le                  urple                         e
 |(le)                 |(ur)
 ""                   ple
                       |(p)
                      le
                       |(le)
                      ""
```
## Naive solution
- time complexity is `O(n^m)`
- space complexity is `O(m)`, just add the number of call stacks during recursion and ignore the others
```javascript
const allConstruct = (target, wordBank) => {
  if (target === "") return [[]];
  
  const result = [];
  
  for (const word of wordBank) {  // time n
    if (target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);
      const waysToBuildSuffix = allConstruct(suffix, wordBank);  // time ^m, space m
      const waysToBuildTarget = waysToBuildSuffix.map(way => [word, ...way]);  // time m
      result.push(...waysToBuildTarget);
    }
  }
  return result;
}

console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));
/*
[
  ["purp", "le"],
  ["p", "ur", "p", "le"],
]
*/
console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
/*
[
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]
*/
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // []
console.log(allConstruct("aaaaaaaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"])); // []
```
## Memoization solution
- time complexity is `O(n^m)`
- space complexity is `O(m)`, just add the number of call stacks during recursion and ignore the others
- does not help much for the worst case since we need to return a 2D array
```javascript
const allConstruct = (target, wordBank, memo={}) => {
  if (target in memo) return memo[target];
  if (target === "") return [[]];
  
  const result = [];
  
  for (const word of wordBank) {  // time n
    if (target.indexOf(word) === 0) {
      const suffix = target.slice(word.length);  // space m
      const waysToBuildSuffix = allConstruct(suffix, wordBank, memo);  // time ^m
      const waysToBuildTarget = waysToBuildSuffix.map(way => [word, ...way]);  // time m, space m
      result.push(...waysToBuildTarget);  // space m
    }
  }
  memo[target] = result;
  return result;
}

console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));
/*
[
  ["purp", "le"],
  ["p", "ur", "p", "le"],
]
*/
console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
/*
[
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]
*/
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // []
console.log(allConstruct("aaaaaaaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"])); // []
```
## Tabulation solution
```
allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]) -> [
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]

m = target
n = wordBank.length

first create an array the size of the target.length + 1
set default value to be []

index      :   0     1     2     3     4     5     6
value      :   []    []    []    []    []    []    []
Actual char:   a     b     c     d     e     f

when target value is an empty string, no string concatenation is required to get "", therefore return value should be [[]]

index      :   0       1     2     3     4     5     6
value      :   [[]]    []    []    []    []    []    []
Actual char:   a       b     c     d     e     f

look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ab"
current index is 0, value is [[]], and actual char is "a"
since first char of "ab" === actual char "a"
we can look at "ab" char length 2 steps ahead of the current index,
value can be changed to the same as current value [[]] and appends the "ab" value into the nested array
resulting in [["ab"]]

index      :   0       1     2           3     4     5     6
value      :   [[]]    []    [["ab"]]    []    []    []    []
Actual char:   a       b     c            d     e     f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abc"
current index is 0, value is [[]], and actual char is "a"
since first char of "abc" === actual char "a"
we can look at "abc" char length 3 steps ahead of the current index,
value can be changed to the same as current value [[]] and appends the "abc" value into the nested array
resulting in [["abc"]]

index      :   0       1     2           3            4     5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    []    []    []
Actual char:   a       b     c           d            e     f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "cd"
current index is 0, value is [[]], and actual char is "a"
since first char of "cd" !== actual char "a"
we can ignore and skip this

index      :   0       1     2           3            4     5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    []    []    []
Actual char:   a       b     c           d            e     f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "def"
current index is 0, value is [[]], and actual char is "a"
since first char of "def" !== actual char "a"
we can ignore and skip this

index      :   0       1     2           3            4     5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    []    []    []
Actual char:   a       b     c           d            e     f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abcd"
current index is 0, value is [[]], and actual char is "a"
since first char of "abcd" === actual char "a"
we can look at "abcd" char length 4 steps ahead of the current index,
value can be changed to the same as current value [[]] and appends the "abc" value into the nested array
resulting in [["abcd"]]

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

look at the 6th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ef"
current index is 0, value is [[]], and actual char is "a"
since first char of "ef" !== actual char "a"
we can ignore and skip this

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

look at the 7th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "c"
current index is 0, value is [[]], and actual char is "a"
since first char of "c" !== actual char "a"
we can ignore and skip this

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ab"
current index is 1, value is [], and actual char is "b"
since value is []
we can ignore and skip the entire process and move to the next index

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ab"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "ab" !== actual char "c"
we can ignore and skip this

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abc"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "abc" !== actual char "c"
we can ignore and skip this

index      :   0       1     2           3            4             5     6
value      :   [[]]    []    [["ab"]]    [["abc"]]    [["abcd"]]    []    []
Actual char:   a       b     c           d            e             f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "cd"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "cd" === actual char "c"
we can look at "cd" char length 2 steps ahead of the current index,
new value can be changed to the same as current value [["ab"]] and appends the "cd" value into the nested array
resulting in [["ab", cd"]] and then combine to the array at the new index 4
which becomes [["abcd"], ["ab", "cd"]]

index      :   0       1     2           3            4                 5     6
value      :   [[]]    []    [           [            [                 []    []
                               ["ab"],     ["abc"],     ["abcd"],
                             ]            ]             ["ab", "cd],
                                                      ]
Actual char:   a       b     c           d            e                 f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "def"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "def" !== actual char "c"
we can ignore and skip this

index      :   0       1     2           3            4                 5     6
value      :   [[]]    []    [           [            [                 []    []
                               ["ab"],     ["abc"],     ["abcd"],
                             ]            ]             ["ab", "cd],
                                                      ]
Actual char:   a       b     c           d            e                 f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abcd"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "abcd" !== actual char "c"
we can ignore and skip this

index      :   0       1     2           3            4                 5     6
value      :   [[]]    []    [           [            [                 []    []
                               ["ab"],     ["abc"],     ["abcd"],
                             ]            ]             ["ab", "cd],
                                                      ]
Actual char:   a       b     c           d            e                 f

look at the 6th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ef"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "ef" !== actual char "c"
we can ignore and skip this

index      :   0       1     2           3            4                 5     6
value      :   [[]]    []    [           [            [                 []    []
                               ["ab"],     ["abc"],     ["abcd"],
                             ]            ]             ["ab", "cd],
                                                      ]
Actual char:   a       b     c           d            e                 f

look at the 7th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "c"
current index is 2, value is [["ab"]], and actual char is "c"
since first char of "c" === actual char "c"
we can look at "c" char length 1 steps ahead of the current index,
new value can be changed to the same as current value [["ab"]] and appends the "c" value into the nested array
resulting in [["ab", c"]] and then combine to the array at the new index 3
which becomes [["abc"], ["ab", "c"]]

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    []
                               ["ab"],     ["abc"],          ["abcd"],
                             ]             ["ab", "c"],      ["ab", "cd],
                                          ]                 ]
Actual char:   a       b     c           d                  e                 f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ab"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "ab" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    []
                               ["ab"],     ["abc"],          ["abcd"],
                             ]             ["ab", "c"],      ["ab", "cd],
                                          ]                 ]
Actual char:   a       b     c           d                  e                 f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abc"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "abc" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    []
                               ["ab"],     ["abc"],          ["abcd"],
                             ]             ["ab", "c"],      ["ab", "cd],
                                          ]                 ]
Actual char:   a       b     c           d                  e                 f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "cd"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "cd" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    []
                               ["ab"],     ["abc"],          ["abcd"],
                             ]             ["ab", "c"],      ["ab", "cd],
                                          ]                 ]
Actual char:   a       b     c           d                  e                 f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "def"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "def" === actual char "d"
we can look at "def" char length 3 steps ahead of the current index,
new value can be changed to the same as current value [["abc"], ["ab", "c"]] and appends the "def" value into the nested array
resulting in [["abc", "def"], ["ab", "c", "def"]]

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abcd"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "abcd" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 6th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ef"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "ef" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 7th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "c"
current index is 3, value is [["abc"], ["ab", "c"]], and actual char is "d"
since first char of "c" !== actual char "d"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

move current value to the next index
look at the 1st element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ab"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "ab" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 2nd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abc"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "abc" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 3rd element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "cd"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "cd" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 4th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "def"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "def" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 5th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "abcd"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "abcd" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                       ]
Actual char:   a       b     c           d                  e                 f

look at the 6th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "ef"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "ef" === actual char "e"
we can look at "ef" char length 2 steps ahead of the current index,
new value can be changed to the same as current value [["abcd"], ["ab", "cd"]] and appends the "ef" value into the nested array
resulting in [["abcd", "ef"], ["ab", "cd", "ef"]] and then combine to the array at the new index 6
which becomes [["abc", "def"], ["ab", "c", "def"], ["abcd", "ef"], ["ab", "cd", "ef"]]

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                         ["abcd", "ef"],
                                                                                      ["ab", "cd", "ef"],
                                                                                     ]
Actual char:   a       b     c           d                  e                 f

look at the 7th element of the array ["ab", "abc", "cd", "def", "abcd", "ef", "c"] is "c"
current index is 4, value is [["abcd"], ["ab", "cd"]], and actual char is "e"
since first char of "c" !== actual char "e"
we can ignore and skip this

index      :   0       1     2           3                  4                 5     6
value      :   [[]]    []    [           [                  [                 []    [
                               ["ab"],     ["abc"],          ["abcd"],                ["abc", "def"],
                             ]             ["ab", "c"],      ["ab", "cd],             ["ab", "c", "def"],
                                          ]                 ]                         ["abcd", "ef"],
                                                                                      ["ab", "cd", "ef"],
                                                                                     ]
Actual char:   a       b     c           d                  e                 f

we can stop here, since nothing else will change
```
- time complexity is `O(n^m)`
- space complexity is `O(n^m)`
- does not help much for the worst case since we need to return a 2D array
```javascript
const allConstruct = (target, wordBank) => {
  const table = Array(target.length + 1).fill().map(() => []);
  table[0] = [[]];
  
  for (let i=0; i<=target.length; i++) {
    for (const word of wordBank) {
      if (target.slice(i, i + word.length) === word) {
        const newCombinations = table[i].map(subArray => [...subArray, word]);
        table[i + word.length].push(...newCombinations);
      }
    }
  }
  return table[target.length];
}

console.log(allConstruct("purple", ["purp", "p", "ur", "le", "purpl"]));
/*
[
  ["purp", "le"],
  ["p", "ur", "p", "le"],
]
*/
console.log(allConstruct("abcdef", ["ab", "abc", "cd", "def", "abcd", "ef", "c"]));
/*
[
  ["ab", "cd", "ef"],
  ["ab", "c", "def"],
  ["abc", "def"],
  ["abcd", "ef"],
]
*/
console.log(allConstruct("skateboard", ["bo", "rd", "ate", "t", "ska", "sk", "boar"])); // []
console.log(allConstruct("aaaaaaaaaaaaaaaaaaaaaaaaaaz", ["a", "aa", "aaa", "aaaa", "aaaaa"])); // return stack overflow due to large space being used
```
