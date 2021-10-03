# Dynamic Programming
- 2 types of techniques
## Memoization technique
- Store subproblems and reuse it when required
### Strategies
- try to think about the recursive functions in terms of a tree
  - with the tree information, you can implement brute force
    - then from there you can see where to optimize the brute force solution
### Guidelines for solving dynamic programming problems using memoization strategy
1. make it work
    - visualize the problem as a tree
    - implement the tree using recursion
    - test it
2. make it efficient
    - add a memo object, key = input, value = return value
    - add a base case to return memo values
    - store return values into the memo before returning
## Tabulation technique
- instead of breaking a problem to multiple subproblems recursively, we do it iteratively
  - by building a table, which is just an array
    - create an array with 1 greater length than n input value
    - use starting value of 0 for all elements if need to calculate a running sum
    - ```[0, 0, 0] if n is 2```
### Strategies
### Guidelines for solving dynamic programming problems using tabulation strategy
