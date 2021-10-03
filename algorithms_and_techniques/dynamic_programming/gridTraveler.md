# Grid Traveler example
```
Say that you are a traveler on a 2D grid.
You begin in the top-left corner and your goal is to travel to the bottom-right corner.
You may only move down or right.
 
In how many ways can you travel to the goal on a grid with dimensions m * n?
 
Write a function "gridTraveler(m, n)" that calculates this.
```
- explanation
```
Question: Caculate gridTraveler(2, 3)
 
Explanation: question is asking us in how many ways can you travel from the top left to the bottom right of a 2 by 3 grid?
 
Answer: 3
-------
|S| | |
-------
| | |E|
-------
 
1. right, right, down
2. right, down, right
3. down, right, right
```
- graph display of what goes behind the hood for ```gridTraveler(2, 3)```
```
graph display when m, n is 2, 3, the number of levels for this case is n + m

               2,3                                1
       /                 \
     1,3                 2,2                      * 2
  /        \         /         \
0,3        1,2      1,2        2,1                * 2
           /  \     /  \       /  \
         0,2  1,1  0,2  1,1  1,1  0,0             * 2

parent = left child + right child
go from bottom up

each m,n that contains value 0 will return the value of 0
each m,n that does not contains value of 0 and contains value of 1 will return the value of 1
value of both child will be added and be returned to the parent
this goes on up the tree to give the final value of 3
```
- 0 ways to travel
```
gridTraveler(0, 0) -> 0 ways to travel as rows and columns are missing
gridTraveler(0, n) -> 0 ways to travel as rows are missing
gradTraveler(n, 0) -> 0 ways to travel as columns are missing
```
## Naive solution
- time complexity is `O(2^(n + m))`, which is reduced to `O(2^n)`
- space complexity is `O(n + m)`, which is reduced to `O(n)`
```javascript
const gridTraveler = (m, n) => {
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  return gridTraveler(m - 1, n) + gridTraveler(m, n - 1);
}

console.log(gridTraveler(1, 1)); // 1
console.log(gridTraveler(2, 3)); // 3
console.log(gridTraveler(3, 2)); // 3
console.log(gridTraveler(3, 3)); // 6
console.log(gridTraveler(18, 18)); // 2333606220
```
## Memoization solution
- time complexity is `O(m * n)`, simplified to `O(n)`
- space complexity is `O(n + m)`, which is reduced to `O(n)`
```javascript
const gridTraveler = (m, n, memo = {}) => {
  const key = `${m},${n}`;
  if (key in memo) return memo[key];
  if (m === 1 && n === 1) return 1;
  if (m === 0 || n === 0) return 0;
  memo[key] = gridTraveler(m - 1, n, memo) + gridTraveler(m, n - 1, memo);
  return memo[key];
}

console.log(gridTraveler(1, 1)); // 1
console.log(gridTraveler(2, 3)); // 3
console.log(gridTraveler(3, 2)); // 3
console.log(gridTraveler(3, 3)); // 6
console.log(gridTraveler(18, 18)); // 2333606220
```
## Tabulation solution
```
gridTraveler(2, 3) -> 3

start by forming a table
   0 1 2 3
  ---------
0 | | | | |
  ---------
1 | | | | |
  ---------
2 | | | | |
  ---------

next set all initial values as 0
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|0|0|0|
  ---------
2 |0|0|0|0|
  ---------

next set all value to 1 for index 1, 1
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|0|0|
  ---------
2 |0|0|0|0|
  ---------

during iteration, when current index is at 1, 1, add current value to index 1, 2 on the right, and index 2, 1 on the bottom
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|0|
  ---------
2 |0|1|0|0|
  ---------

follow the same step as before
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|1|0|
  ---------

follow the same step as before, except that index 4, 1 is out of range, thus ignore
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|1|1|
  ---------

follow the same step as before, except that index 0, 3 is out of range, thus ignore
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|1|1|
  ---------

follow the same step as before, except that index 1, 3 is out of range, thus ignore
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|2|1|
  ---------

follow the same step as before, except that index 2, 3 is out of range, thus ignore
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|2|3|
  ---------

complete, index 3, 3 and index 4, 2 is out of range, thus ignore
   0 1 2 3
  ---------
0 |0|0|0|0|
  ---------
1 |0|1|1|1|
  ---------
2 |0|1|2|3|
  ---------
```
- time complexity is `O(m * n)`
- space complexity is `O(n * m)`
```javascript
const gridTraveler = (m, n) => {
  const table = Array(m + 1).fill().map(() => Array(n + 1).fill(0));
  table[1][1] = 1;
  
  for (let i=0; i<=m; i++) {
    for (let j=0; j<=n; j++) {
      const current = table[i][j];
      if (j + 1 <= n) table[i][j + 1] += current;
      if (i + 1 <= m) table[i + 1][j] += current;
    }
  }
  return table[m][n];
}

console.log(gridTraveler(1, 1)); // 1
console.log(gridTraveler(2, 3)); // 3
console.log(gridTraveler(3, 2)); // 3
console.log(gridTraveler(3, 3)); // 6
console.log(gridTraveler(18, 18)); // 2333606220
```
