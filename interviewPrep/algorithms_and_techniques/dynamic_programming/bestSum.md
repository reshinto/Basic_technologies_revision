# Best Sum example
```
Write a function "bestSum(targetSum, numbers)" that takes in a targetSum and an array of numbers as arguments

The function should return an array containing the shortest combination of numbers that add up to exactly the targetSum

If there is a tie for the shortest combination, you may return any one of the shortest
```
- explanation
```
Question 1: calculate the bestSum(7, [5, 3, 4, 7])

Possible answer 1:
1. [3, 4]
2. [7]

Answer 1: [7] since the goal is to find the smallest array

Question 2: calculate the bestSum(8, [2, 3, 5])

Possible answer 2:
1. [2, 2, 2, 2]
2. [2, 3, 3]
3. [3, 5]

Answer 2: [3, 5]
```
- graph display of what goes behind the hood for bestSum(8, [2, 3, 5]) -> [3, 5]
```
                            8
           /                |           \
         6                  5             3
    /    |    \         /   |   \        / \
  4      3      1      3    2    0      1   0
 / \    / \           / \   |
2   1  1   0         1   0  0
|
0

when leaf node value is 0, it will be our base case
and we can return an array including the value of the parent node - child node
in this example, at value 6, it would receive 2 possible answers:
[2, 2, 2] or [3, 3]
for this problem, we are looking for the smallest array, thus we will ignore [2, 2, 2]
therefore, when a parent node is faced with multiple arrays that could be returned,
we will choose to return the array with the smallest length
```
## Naive solution
- time complexity is `O((n^m) * m)`, where targetSum is m, and numbers array.length is n
- space complexity is `O(m * m)`, simplified to `O(m^2)`, where memory is being stored for the recursion stack and the additional values stored
```javascript
const bestSum = (targetSum, numbers) => {
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;
  
  let shortestCombination = null;  // space m
  
  for (const num of numbers) {  // time n
    const remainder = targetSum - num;
    const remainderCombination = bestSum(remainder, numbers);  // space m, time will follow targetSum with repeats giving n^m
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];  // time m
      if (shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination;
      }
    }
  }
  
  return shortestCombination;
}

console.log(bestSum(7, [5, 3, 4, 7]));  // [7]
console.log(bestSum(8, [2, 3, 5]));  // [3, 5]
console.log(bestSum(8, [1, 4, 5]));  // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25]));  // [25, 25, 25, 25]
```
## Memoization solution
- time complexity is `O(n * m * m)`, simplified to `O(n * m^2)`
- space complexity is `O(m * m)`, simplified to `O(m^2)`
```javascript
const bestSum = (targetSum, numbers, memo={}) => {
  if (targetSum in memo) return memo[targetSum];
  if (targetSum === 0) return [];
  if (targetSum < 0) return null;
  
  let shortestCombination = null;  // space m
  
  for (const num of numbers) {  // time n
    const remainder = targetSum - num;
    const remainderCombination = bestSum(remainder, numbers, memo);  // space m, time will follow targetSum without repeats giving m
    if (remainderCombination !== null) {
      const combination = [...remainderCombination, num];  // time m
      if (shortestCombination === null || combination.length < shortestCombination.length) {
        shortestCombination = combination;
      }
    }
  }
  
  memo[targetSum] = shortestCombination;
  return shortestCombination;
}

console.log(bestSum(7, [5, 3, 4, 7]));  // [7]
console.log(bestSum(8, [2, 3, 5]));  // [3, 5]
console.log(bestSum(8, [1, 4, 5]));  // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25]));  // [25, 25, 25, 25]
```
## Tabulation solution
```
bestSum(8, [2, 3, 5])

m = targetSum
n = numbers.length

first create an array the size of the target sum + 1

index:   0     1     2     3     4     5     6     7     8
value:  null  null  null  null  null  null  null  null  null

when targetSum is at 0, no sum is required to get 0, therefore return value should be []

index:   0     1     2     3     4     5     6     7    8
value:   []  null  null  null  null  null  null  null  null

look at the 1st element of the array [2, 3, 5] is 2
current index is 0 and value is []
current index 0, can return 0 by not adding
at 2 steps ahead of the current index,
value can be changed to the same as current value [] and appends the current element 2 into it
resulting to [2]

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]  null  null  null  null  null  null

look at the 2nd element of the array [2, 3, 5] is 3
current index is 0 and value is []
current index 0, can return 0 by not adding
at 3 steps ahead of the current index,
value can be changed to the same as current value [] and appends the current element 3 into it
resulting to [3]

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]   [3]   null  null  null  null  null


look at the 3rd element of the array [2, 3, 5] is 5
current index is 0 and value is []
current index 0, can return 0 by not adding
at 5 steps ahead of the current index,
value can be changed to the same as current value [] and appends the current element 5 into it
resulting to [5]

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]   [3]   null  [5]   null  null  null

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]   [3]   null  [5]   null  null  null

look at the 2nd element of the array [2, 3, 5] is 3
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]   [3]   null  [5]   null  null  null

look at the 3rd element of the array [2, 3, 5] is 5
current index is 1 and value is null
if current value is null, nothing needs to be changed

index:   0     1     2     3     4     5     6     7    8
value:   []  null   [2]   [3]   null  [5]   null  null  null

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 2 and value is [2]
at 2 steps ahead of the current index,
value can be copied from the current value [2] and append the current element 2 into it
resulting to [2, 2]
note that value at index 4 gets overwritten

index:   0     1     2     3      4      5     6     7    8
value:   []  null   [2]   [3]   [2, 2]  [5]   null  null  null

look at the 2nd element of the array [2, 3, 5] is 3
current index is 2 and value is [2]
at 3 steps ahead of the current index,
value can be copied from the current value [2] and append the current element 3 into it
resulting to [2, 3]
however, since current index 2 + current element 3 giving index 5 already has a value,
we would need to compare index 5 value of [5] with the new data [2, 3] to see which has the smallest array
since the initial value at index 5 has a smaller array size, it does not get overwritten

index:   0     1     2     3      4      5     6     7    8
value:   []  null   [2]   [3]   [2, 2]  [5]   null  null  null

look at the 3rd element of the array [2, 3, 5] is 5
current index is 2 and value is [2]
at 5 steps ahead of the current index,
value can be copied from the current value [2] and append the current element 5 into it
resulting to [2, 2]
note that value at index 7 gets overwritten

index:   0     1     2     3      4      5     6      7      8
value:   []  null   [2]   [3]   [2, 2]  [5]   null  [2, 5]  null

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 3 and value is [3]
at 2 steps ahead of the current index,
value can be copied from the current value [3] and append the current element 2 into it
resulting to [3, 2]
however, since current index 3 + current element 2 giving index 5 already has a value,
we would need to compare index 5 value of [5] with the new data [3, 2] to see which has the smallest array
since the initial value at index 5 has a smaller array size, it does not get overwritten

index:   0     1     2     3      4      5     6      7      8
value:   []  null   [2]   [3]   [2, 2]  [5]   null  [2, 5]  null

look at the 2nd element of the array [2, 3, 5] is 3
current index is 3 and value is [3]
at 3 steps ahead of the current index,
value can be copied from the current value [3] and append the current element 3 into it
resulting to [3, 3]
note that value at index 6 gets overwritten

index:   0     1     2     3      4      5      6       7      8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  null

look at the 3rd element of the array [2, 3, 5] is 5
current index is 3 and value is [3]
at 5 steps ahead of the current index,
value can be copied from the current value [3] and append the current element 5 into it
resulting to [3, 5]
note that value at index 8 gets overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

we can stop here, but just for example purposes, we will continue
we can continue the loop till the end and it would still provide the same valid answer

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 4 and value is [2, 2]
at 2 steps ahead of the current index,
value can be copied from the current value [2, 2] and append the current element 2 into it
resulting to [2, 2, 2]
however, since current index 4 + current element 2 giving index 6 already has a value,
we would need to compare index 6 value of [3, 3] with the new data [2, 2, 2] to see which has the smallest array
since the initial value at index 6 has a smaller array size, it does not get overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

look at the 2st element of the array [2, 3, 5] is 3
current index is 4 and value is [2, 2]
at 3 steps ahead of the current index,
value can be copied from the current value [2, 2] and append the current element 3 into it
resulting to [2, 2, 3]
however, since current index 4 + current element 3 giving index 7 already has a value,
we would need to compare index 7 value of [2, 5] with the new data [2, 2, 3] to see which has the smallest array
since the initial value at index 7 has a smaller array size, it does not get overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

look at the 3rd element of the array [5, 3, 4] is 5
current index is 4 and value is [2, 2]
at 5 steps ahead of the current index,
it is out of range, nothing needs to be changed

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 5 and value is [5]
at 2 steps ahead of the current index,
value can be copied from the current value [5, 2] and append the current element 2 into it
resulting to [5, 2]
however, since current index 5 + current element 2 giving index 7 already has a value,
we would need to compare index 7 value of [2, 5] with the new data [5, 2] to see which has the smallest array
since both has the same array size, it does not get overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

look at the 2st element of the array [2, 3, 5] is 3
current index is 5 and value is [2, 2]
at 3 steps ahead of the current index,
value can be copied from the current value [5] and append the current element 3 into it
resulting to [5, 3]
however, since current index 5 + current element 3 giving index 8 already has a value,
we would need to compare index 8 value of [3, 5] with the new data [5, 3] to see which has the smallest array
since both has the same array size, it does not get overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

look at the 3rd element of the array [5, 3, 4] is 5
current index is 5 and value is [5]
at 5 steps ahead of the current index,
it is out of range, nothing needs to be changed

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

move current value to the next index
look at the 1st element of the array [2, 3, 5] is 2
current index is 6 and value is [3, 3]
at 2 steps ahead of the current index,
value can be copied from the current value [3, 3] and append the current element 2 into it
resulting to [3, 3, 2]
however, since current index 6 + current element 2 giving index 8 already has a value,
we would need to compare index 8 value of [3, 5] with the new data [3, 3, 2] to see which has the smallest array
since the initial value at index 8 has a smaller array size, it does not get overwritten

index:   0     1     2     3      4      5      6       7       8
value:   []  null   [2]   [3]   [2, 2]  [5]   [3, 3]  [2, 5]  [3, 5]

the rest are out of range, thus nothing needs to be changed
```
- time complexity is `O(n * m^2)`
- space complexity is `O(m^2)`
```javascript
const bestSum = (targetSum, numbers) => {
  const table = Array(targetSum + 1).fill(null);
  table[0] = [];
  
  for (let i=0; i<=targetSum; i++) {
    if (table[i] !== null) {
      for (const num of numbers) {
        const combination = [...table[i], num];
        if (!table[i + num] || table[i + num].length > combination.length) {
          table[i + num] = combination;
        }
      }
    }
  }
  return table[targetSum];
}

console.log(bestSum(7, [5, 3, 4, 7]));  // [7]
console.log(bestSum(8, [2, 3, 5]));  // [3, 5]
console.log(bestSum(8, [1, 4, 5]));  // [4, 4]
console.log(bestSum(100, [1, 2, 5, 25]));  // [25, 25, 25, 25]
```
