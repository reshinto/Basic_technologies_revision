# How Sum example
```
Write a function "howSum(targetSum, numbers)" that takes in a targetSum and an array of numbers as arguments

The function should return an array containing any combination of elements that add up to exactly the targetSum
If there is no combination that adds up to the targetSum, then return null

If there are multiple combinations possible, you may return any single one
```
- explanation
```
Question 1: howSum(7, [5, 3, 4, 7])
Answer 1: [3, 4] or [7]

Question 2: howSum(8, [2, 3, 5])
Answer 2: [2, 2, 2, 2] or [3, 5]

Question 3: howSum(7, [2, 4])
Answer 3: null

Question 4: howSum(0, [1, 2, 3])
Answer 4: []

example: howSum(7, [5, 3, 4, 7])

            7
  /      |      |     \
7-5=2  7-3=4  7-4=3  7-7=0
null  /     \     \    []
  4-3=1  4-4=0  3-3=0
  null    []     []
  
when the leaf node value is 0, it returns an empty array
the the value that was subtracted from it's parent node is added into the array
this then repeats until it reaches the root node
the end array of values for 1 branch would be one of the answers available
the total number of answers is dependent on how many leaf nodes has a value of 0
the other base cases that are at the remaining leaf nodes should return a null value
for this example, the answers would be [4, 3] or [3, 4] or [7]
```
## Naive solution
- time complexity is `O((n^m) * m)`, where m = target sum, n = numbers.length
- space complexity is `O(m)`
```javascript
const howSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;
  
  for (const num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers);
    if (remainderResult !== null) {
      return [...remainderResult, num];  // this copies an array which the worst case will be m times
    }
  }
  return null;
};

console.log(howSum(7, [2, 3]));  // [3, 2, 2]
console.log(howSum(7, [5, 3, 4, 7]));  // [4, 3]
console.log(howSum(7, [2, 4]));  // null
console.log(howSum(8, [2, 3, 5]));  // [2, 2, 2, 2]
console.log(howSum(300, [7, 14]));  // null
```
## Memoization solution
- time complexity is `O(n * m * m)`, simplified to `O(n * m^2)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const howSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;
  
  for (const num of numbers) {
    const remainder = targetSum - num;
    const remainderResult = howSum(remainder, numbers, memo);
    if (remainderResult !== null) {
      memo[targetSum] = [...remainderResult, num];  // sometimes values for the key would be an array
      return memo[targetSum];
    }
  }
  memo[targetSum] = null;
  return null;
};

console.log(howSum(7, [2, 3]));  // [3, 2, 2]
console.log(howSum(7, [5, 3, 4, 7]));  // [4, 3]
console.log(howSum(7, [2, 4]));  // null
console.log(howSum(8, [2, 3, 5]));  // [2, 2, 2, 2]
console.log(howSum(300, [7, 14]));  // null
```
## Tabulation solution
```
howSum(7, [5, 3, 4]) -> [4, 3]

m = targetSum
n = numbers.length

first create an array the size of the target sum + 1
set default value to be null

index:   0     1     2     3     4     5     6     7
value:  null  null  null  null  null  null  null  null

when targetSum is at 0, no sum is required to get 0, therefore return value should be []

index:   0     1     2     3     4     5     6     7
value:   []  null  null  null  null  null  null  null

look at the 1st element of the array [5, 3, 4] is 5
current index is 0 and value is []
current index 0, can return 0 by not adding
at 5 steps ahead of the current index,
value can be changed to the same as current value [] and appends the current element 5 into it
resulting to [5]

index:   0     1     2     3     4     5     6     7
value:   []  null  null  null  null   [5]  null  null

look at the 2nd element of the array [5, 3, 4] is 3
current index is 0 and value is []
current index 0, can return 0 by not adding
at 3 steps ahead of the current index,
value can be copied from the current value [] and append the current element 3 into it
resulting to [3]

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]  null   [5]  null  null

look at the 3rd element of the array [5, 3, 4] is 4
current index is 0 and value is []
current index 0, can return 0 by not adding
at 4 steps ahead of the current index,
value can be copied from the current value [] and append the current element 4 into it
resulting to [4]

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

look at the 1st element of the array [5, 3, 4] is 3
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

look at the 1st element of the array [5, 3, 4] is 4
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 2 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

look at the 1st element of the array [5, 3, 4] is 3
current index is 2 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

look at the 1st element of the array [5, 3, 4] is 4
current index is 2 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 3 and value is [3]
at 5 steps ahead of the current index,
it is out of range, nothing needs to be changed

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  null  null

look at the 2nd element of the array [5, 3, 4] is 3
current index is 3 and value is [3]
at 3 steps ahead of the current index,
value can be copied from the current value [3] and append the current element 3 into it
resulting to [3, 3]

index:   0     1     2     3     4     5     6     7
value:   []  null  null   [3]   [4]   [5]  [3, 3]  null

look at the 3rd element of the array [5, 3, 4] is 4
current index is 3 and value is [3]
at 4 steps ahead of the current index,
value can be copied from the current value [3] and append the current element 4 into it
resulting to [3, 4]

index:   0     1     2     3     4     5     6      7
value:   []  null  null   [3]   [4]   [5]  [3, 3] [3, 4]

we can stop here, but just for example purposes, we will continue 1 more step
we can continue the loop till the end and it would still provide the same valid answer

move current value to the next index
look at the 1st element of the array [5, 3, 4] is 5
current index is 4 and value is [4]
at 5 steps ahead of the current index,
it is out of range, nothing needs to be changed

index:   0     1     2     3     4     5     6      7
value:   []  null  null   [3]   [4]   [5]  [3, 3] [3, 4]

look at the 2nd element of the array [5, 3, 4] is 3
current index is 4 and value is [4]
at 3 steps ahead of the current index,
value can be copied from the current value [4] and append the current element 3 into it
resulting to [4, 3]
note that value at index 7 gets overwritten

index:   0     1     2     3     4     5     6      7
value:   []  null  null   [3]   [4]   [5]  [3, 3] [4, 3]

look at the 3rd element of the array [5, 3, 4] is 4
current index is 4 and value is [4]
at 4 steps ahead of the current index,
it is out of range, nothing needs to be changed

index:   0     1     2     3     4     5     6      7
value:   []  null  null   [3]   [4]   [5]  [3, 3] [4, 3]
```
- time complexity is `O(n * m * m)`, simplified to `O(n * m^2)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const howSum = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null);  // space: m
  table[0] = [];
  
  for (let i=0; i<=targetSum; i++) {  // time: m
    if (table[i] !== null) {
      for (const num of numbers) {  // time: n
        table[i + num] = [...table[i], num];  // time & space: m
      }
    }
  }
  return table[targetSum];
}

console.log(howSum(7, [2, 3]));  // [3, 2, 2]
console.log(howSum(7, [5, 3, 4, 7]));  // [4, 3]
console.log(howSum(7, [2, 4]));  // null
console.log(howSum(8, [2, 3, 5]));  // [2, 2, 2, 2]
console.log(howSum(300, [7, 14]));  // null
```
