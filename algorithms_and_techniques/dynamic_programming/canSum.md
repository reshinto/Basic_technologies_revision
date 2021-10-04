# Can Sum example
```
Write a function "canSum(targetSum, numbers)" that takes in a targetSum and an array of numbers as arguments

The function should return a boolean indicating whether or not it is possible to generate the targetSum using from the array

You may use an element of the array as many times as needed

You may assume that all input numbers are nonnegative
```
- explanation
```
Question: calculate canSum(7, [5, 3, 4, 7])

Explanation: if we have a smaller amount of targetSum, then they'll tend to be a smaller, easier problem than a larger number of targets

Answer: true

1. 3 + 4
2. 7

canSum(7, [2, 4]) -> false

canSum(0, [...]) -> true
```
- graph display of what goes behind the hood for `canSum(7, [5, 3, 4, 7]) -> true`
```
use targetSum for every node

            7
  /      |      |     \
7-5=2  7-3=4  7-4=3  7-7=0
      /     \     \
  4-3=1  4-4=0  3-3=0
  
when value is 0, it will be our base case and we can return as true
when value is not 0, it will return as false

as long as 1 leaf node returns true, we can stop the task and return the value
```
- graph display of what goes behind the hood for `canSum(7, [2, 4]) -> false`
```
m = target sum  // which is also the number of levels
n = array length

          7                   1
       /     \
    7-2=5    7-4=3            * n
   /    \       |
5-2=3  5-4=1  3-2=1           * n
  |
3-2=1                         * n

all leaf nodes as a targetSum value of more than 0 and cannot be reduced further, thus returns false
```
## Naive solution
- time complexity is `O(n^m)`
- space complexity is `O(m)`
```javascript
const canSum = (targetSum, numbers) => {
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;
  
  for (const num of numbers) {
    const remainder = targetSum - num;
    if (canSum(remainder, numbers)) {
      return true;
    }
  }
  return false;
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
console.log(canSum(300, [7, 14])); // false
```
## Memoization solution
- time complexity is `O(n*m)`
- space complexity is `O(m)`
```javascript
const canSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return true;
  if (targetSum < 0) return false;
  
  for (const num of numbers) {
    const remainder = targetSum - num;
    if (canSum(remainder, numbers, memo)) {
      memo[targetSum] = true;
      return true;
    }
  }
  memo[targetSum] = false;
  return false;
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
console.log(canSum(300, [7, 14])); // false
```
## Tabulation solution
```
canSum(7, [5, 3, 4]) -> true

m = targetSum
n = numbers.length

first create an array the size of the target sum + 1

index:   0     1     2     3     4     5     6    7
value: false false false false false false false false

when targetSum is at 0, no sum is required to get 0, therefore return value should be true

index:   0     1     2     3     4     5     6    7
value: true false false false false false false false

look at the 1st element of the array [5, 3, 4] is 5
current index is 0 and value is true
current index (0), can return 0 by not adding
if current value is true, will always return true,
thus 5 steps ahead of the current index, value can be changed to true

index:   0     1     2     3     4     5     6    7
value: true false false false false  true false false

look at the 2nd element of the array [5, 3, 4] is 3
current index is 0 and value is true
current index (0), can return 0 by not adding
if current value is true, will always return true,
thus 3 steps ahead of the current index, value can be changed to true

index:   0     1     2     3     4     5     6    7
value: true  false false true  false  true false false

look at the 3rd element of the array [5, 3, 4] is 4
current index is 0 and value is true
current index (0), can return 0 by not adding
if current value is true, will always return true,
thus 4 steps ahead of the current index, value can be changed to true

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 1 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

look at the 2nd element of the array [5, 3, 4] is 3
current index is 1 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

look at the 3rd element of the array [5, 3, 4] is 4
current index is 1 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 2 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

look at the 2nd element of the array [5, 3, 4] is 3
current index is 2 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

look at the 3rd element of the array [5, 3, 4] is 4
current index is 2 and value is false
if current value is false, nothing needs to be changed

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 3 and value is true
therefore this step can be skipped

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true false false

look at the 2nd element of the array [5, 3, 4] is 3
current index is 3 and value is true
if current value is true, will always return true,
thus 3 steps ahead of the current index, value can be changed to true

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true  true false

look at the 3rd element of the array [5, 3, 4] is 4
current index is 3 and value is true
if current value is true, will always return true,
thus 4 steps ahead of the current index, value can be changed to true

index:   0     1     2     3     4     5     6    7
value: true  false false true  true  true  true true

the rest can be skipped since their values are all true
```
- time complexity is `O(n*m)`
- space complexity is `O(m)`
```javascript
const canSum = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(false);
  table[0] = true;
  for (let i=0; i<=targetSum; i++) {
    if (table[i]) {
      for (let num of numbers) {
        table[i + num] = true;
      }
    }
  }
  return table[targetSum];
}

console.log(canSum(7, [2, 3])); // true
console.log(canSum(7, [5, 3, 4, 7])); // true
console.log(canSum(7, [2, 4])); // false
console.log(canSum(8, [2, 3, 5])); // true
console.log(canSum(300, [7, 14])); // false
```
