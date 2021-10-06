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
