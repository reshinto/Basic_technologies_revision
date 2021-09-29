# Dynamic Programming
## Fibonacci example
- calculate the 40th number of the fibonacci sequence
```
Write a function `fib(n)` that takes in a number as an argument.
The function should return the n-th number of the Fibonacci sequence.

The 1st and 2nd number of the sequence is 1.
To generate the next number of the sequence, we sum the previous two.

n:      1, 2, 3, 4, 5, 6, 7,  8,  9, ...
fib(n): 1, 1, 2, 3, 5, 8, 13, 21, 32, ...
```
### Fibonacci naive solution
- time complexity is `O(2^n)`
- space complexity is `O(n)`
```javascript
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
## Memoization technique
- store subproblems and reuse it when required
### Fibonacci memoization solution
- time complexity is `O(2n)`, simplified to `O(n)`
- space complexity is `O(n)`
```javascript
// memoization
// js object, keys will be arg to functoin, value will be the return value

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
