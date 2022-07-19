# Fibonacci example
- calculate the 40th number of the fibonacci sequence
```
Write a function `fib(n)` that takes in a number as an argument.
The function should return the n-th number of the Fibonacci sequence.

The 1st and 2nd number of the sequence is 1. OR 1st is 0 and 2nd number is 1
To generate the next number of the sequence, we sum the previous two.

n:      1, 2, 3, 4, 5, 6, 7,  8,  9, ...
fib(n): 1, 1, 2, 3, 5, 8, 13, 21, 32, ...

or
n:      1, 2, 3, 4, 5, 6, 7,  8,  9, ...
fib(n): 0, 1, 1, 2, 3, 5, 8, 13, 21, ...
```
## Naive solution
- time complexity is `O(2^n)`
- space complexity is `O(n)`
```javascript
// if fib starts with 1
const fib = (n) => {
  if (n <= 2) return 1;
  return fib(n - 1) + fib(n - 2);
}

console.log(fib(6));  // 8
console.log(fib(7));  // 13
console.log(fib(8));  // 21
console.log(fib(50));  // 12,586,269,025, will take very long to compute
```
```
graph display of what goes behind the hood during `fib(7)`
each number of 2 or 1 will return the value of 1
value both child will add up and be returned to the parent
this goes on up the tree to give the final value of 13

                      7
                /            \
          6                        5
        /    \                   /    \
     5           4           4           3
    / \         / \         / \         / \
  4     3     3     2     3     2     2     1
  /\    /\    /\         /\
 3  2  2  1  2  1       2  1
 /\
2  1
```
- breaking down fibonacci time complexity
  - this will return `O(n)` time complexity
  - this will also return `O(n)` space complexity as it has n times function calls added to the stack
```javascript
const foo = (n) => {
  if (n <= 2) return;
  foo(n - 1);
}
```
```
graph display when n is 5

5 -> 4 -> 3 -> 2 -> 1
```
  - this will return `O(n/2)` time complexity which is the same as `O(n)` by removing the constant
  - this will also return `O(n/2)` space complexity as it has `n/2` times function calls added to the stack
    - becomes `O(n)` after removing the constant
```javascript
const bar = (n) => {
  if (n <= 1) return;
  bar(n - 2);
}
```
```
graph display when n is 5

5 -> 3 -> 1
```
  - this will return `O(2^n)` time complexity because at each level it would call the function 2 times from its parent node
  - this will also return `O(n)` space complexity as it only has n level of function calls each time
    - the function that has already been called would be removed, thus not contributing to the space complexity
```javascript
const dib = (n) => {
  if (n <= 1) return;
  dib(n - 1);
  dib(n - 1);
}
```
```
graph display when n is 5 which is also the number of levels for this case

                5                                   1
           /          \
        4                  4                        * 2
    /       \             /    \
   3          3        3         3                  * 2
  /  \       /  \     /  \      /  \
 2    2     2    2   2    2    2    2               * 2
 /\   /\   /\   /\   /\   /\   /\   /\
1  1 1  1 1  1 1  1 1  1 1  1 1  1 1  1             * 2
```
  - this will return `O(2^(n/2))` time complexity because at each level it would call the function 2 times from its parent node
    - and it will reduce by 2 levels, so after simplifying it becomes `O(2^n)`
  - this will also return `O(n/2)` space complexity as it only has n level of function calls
    - and will also reduce by 2 level each time, so after simplifying it becomes `O(n)`
    - the function that has already been called would be removed, thus not contributing to the space complexity
```javascript
const lib = (n) => {
  if (n <= 1) return;
  lib(n - 2);
  lib(n - 2);
}
```
```
graph display when n is 5 which is also the number of levels for this case

        5                          1
     /     \
   3        3                      * 2
 /   \    /    \
1     1  1      1                  * 2
```
- therefore the complexity of fib is
  - time: `O(dib) <= O(fib) <= O(lib)`
    - `O(2^n) <= O(???) <= O(2^n)` thus fib is also `O(2^n)`
- count the number of different ways to move through a 6x9 grid
- given a set of coins, how can we make 27 cents in the least number of coins
- given a set of substrings, what are the possible ways to construct the string "potentpot"
## Memoization solution
- time complexity is `O(2n)`, simplified to `O(n)`
- space complexity is `O(n)`
```javascript
// memoization
// js object, keys will be arg to functoin, value will be the return value

// if fib starts with 1
const fib = (n, memo = {}) => {
  if (n in memo) return memo[n];
  if (n <= 2) return 1;
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}

console.log(fib(6));  // 8
console.log(fib(7));  // 13
console.log(fib(8));  // 21
console.log(fib(50));  // 12,586,269,025, will take very fast to compute
```
```javascript
// change to memo = {1: 0, 2: 1} if fib starts with 0
const fib = (n, memo = {1: 1, 2: 1}) => {
  if (n in memo) return memo[n];
  memo[n] = fib(n - 1, memo) + fib(n - 2, memo);
  return memo[n];
}
```
```
graph display of what goes behind the hood during `fib(7)` with memoization
values that has already been stored in the memo will be used and does not requires computation

memo 
{
  3: 2,
  4: 3,
  5: 5,
  6: 8,
  7, 13
}

          7
         / \
        6   5
       / \                 
      5   4           
     / \    
    4    3
   / \   
  3  2  
 / \
2   1
```
## Tabulation solution
- start index 1 value of 1
  - ```[0, 1, 0] if n is 2```
```
fib(6) -> 8
start current position at index 0

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 0, 0, 0, 0, 0

when current position is at index 0, value at index 1 and index 2 needs to add index 0 value

results:
index: 0,  1,   2,  3, 4, 5, 6
value: 0, 1+0, 0+0, 0, 0, 0, 0
_______________________________
current position at index 1

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 0, 0, 0, 0, 0

when current position is at index 1, value at index 2 and index 3 needs to add index 1 value

results:
index: 0, 1,  2,   3,  4, 5, 6
value: 0, 1, 0+1, 0+1, 0, 0, 0
_______________________________
current position at index 2

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 1, 1, 0, 0, 0

when current position is at index 2, value at index 3 and index 4 needs to add index 2 value

results:
index: 0, 1,  2,  3,   4,  5, 6
value: 0, 1,  1, 1+1, 0+1, 0, 0
_______________________________
current position at index 3

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 1, 2, 1, 0, 0

when current position is at index 3, value at index 4 and index 5 needs to add index 3 value

results:
index: 0, 1,  2, 3,  4,  5,   6
value: 0, 1,  1, 2, 1+2, 0+2, 0
_______________________________
current position at index 4

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 1, 2, 3, 2, 0

when current position is at index 4, value at index 5 and index 6 needs to add index 4 value

results:
index: 0, 1,  2, 3, 4, 5,   6
value: 0, 1,  1, 2, 3, 2+3, 0+3
_______________________________
current position at index 5

index: 0, 1, 2, 3, 4, 5, 6
value: 0, 1, 1, 2, 3, 5, 3

when current position is at index 5, value at index 6 needs to add index 5 value

results:
index: 0, 1,  2, 3, 4, 5,  6
value: 0, 1,  1, 2, 3, 5, 3+5
```
- time complexity is `O(n)`
- space complexity is `O(n)`
```javascript
const fib = (n) => {
  const table = Array(n + 1).fill(0);
  // if fib starts with 1
  table[1] = 1;  
  // change to table[2] = 1; if fib starts with 0
  for (let i=0; i<n; i++) {
    table[i + 1] += table[i];
    if (i+2 <= n) {  // not required in javascript
      table[i + 2] += table[i];
    }
  }
  return table[n];
}
```
- time complexity is `O(n)`
- space complexity is `O(1)`
```javascript
const fib = (n) => {
  const lastTwo = [0, 1];
  let counter = 2;  // if fib starts with 1
  // change to let counter = 3; if fib starts with 0
  while (counter <= n) {
    const lastFibValue = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = lastFibValue;
    counter++;
  }
  return lastTwo[1]; // if fib starts with 1
  // change to return n > 1 ? lastTwo[1] : lastTwo[0]; if fib starts with 0
}
```
```javascript
function fib(n, startFromZero) {
  if (n === 0 || n === 1) return startFromZero ? 0 : n;
  let first = 0;
  let second = 1;

  for (let i=2 + (startFromZero ? 1 : 0); i<=n; i++) {
    const sum = first + second;
    first = second;
    second = sum;
  }
  return second;
}

for (let i=0; i<8; i++) {
  console.log(i, fib(i, true));  // 0, 0, 1, 1, 2, 3, 5, 8
}
for (let i=0; i<8; i++) {
  console.log(i, fib(i));  // 0, 1, 1, 2, 3, 5, 8, 13
}
```
