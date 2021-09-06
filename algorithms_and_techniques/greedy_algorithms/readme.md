# Greedy Algorithm

- an algorithm that makes a greedy choice / optimal choice at every single step in the solution or in the problem
  - the greedy choice is defined by some rule
    - that rule could be e.g.
      - select the largest number
      - or select the smallest number
      - select the element that has a certain property etc.
- the algorithm can be quite complicated and can also be quite simple
- 1 example that uses greedy algorithm is `Dijkstra algorithm`

## Simple example

### Problem

- find the N numbers in the array that is equal to the largest sum

```javascript
const array = [3, 4, -1, 2, -3, 0];
const n = 4;
```

- the greedy algorithm approach to solving this problem is to simply select the largest number at every single step until we've selected n numbers

### Solution

- select the largest number `4`, then the next largest `3`, then the next largest `2`, then the next largest `0`
  - this gives the result `4 + 3 + 2 + 0 = 10`

## formal properties if true, greedy algorithm could be used to solve a problem

### Greedy Choice Property

- a global (overall) optimal solution can be reached by choosing the optimal choice at each step
- greedy algorithms work on problems for which it is true that every step, there is a choice that is optimal for the problem up to that step
  - and after the last step, the algorithm produces the optimal solution of the complete problem

### Optimal Substructure

- a problem has an optimal substructure if an optimal solution to the entire problem contains the optimal solutions to the sub-problems
  - this means that every time a choice is made, one can treat that as a sub problem
  - an optimal substructure exists if all of the sub problems allow you to solve the larger problem as a whole
    - meaning if all of the solutions to these sub-problems combined allow you to have a full, optimal solution to the entire problem, then you can use the greedy algorithm

## Greedy Algorithm application

### Fractional Knapsack Problem

- this is a backpack that has the following design
  - the goal is to fill the backpack with as much value as possible without going over it's capacity
  - so how do we use a greedy algorithm to solve this problem?

```
capacity = 25

Item Size Value
0     22    19
1     10    9
2     9     9
3     7     6
```

#### solution

- you can select a fractional amount of any of these items
  - this means that, instead of selecting one of item 1, we can select e.g. half of item 1 instead
- first approach

```
select item 3
total current capacity = 7
total current value = 6

select item 2
total current capacity = 7 + 9 = 16
total current value = 6 + 9 = 15

select item 1 (this fails)
total current capacity = 7 + 9 + 10 = 26
total current value = 6 + 9 + 9 = 24

change to select 90% of item 1
total current capacity = 7 + 9 + (10 * 0.9) = 25
total current value = 6 + 9 + (9 * 0.9) = 23.1
```

- second approach

```
select item 0
total current capacity = 22
total current value = 19

select item 2 since it has the same value as item 1 but smaller in size (this fails)
total current capacity = 22 + 9 = 31
total current value = 19 + 9 = 28

change to select 33% of item 1
total current capacity = 22 + (9 * 0.33) = 25
total current value = 19 + (9 * 0.33) = 22
```

- the aboe 2 approaches does not give the most optimal choice, as there is a better solution for this case, which is to use best value to size ratio
  - therefore the items with the best value over size ratio will the best item to select

```
capacity = 25

Item Size Value Value/Size
0     22    19    0.8636
1     10    9     0.9
2     9     9     1
3     7     6     0.857
```

- this shows that the best items to select goes in the following order `2, 1, 0, 3`
  - this means that we should take as much as possible from the first selection onwards

```
select item 2 (this is the best so take all of it)
total current capacity = 9
total current value = 9

select item 1 (this is the 2nd best so take all of it)
total current capacity = 9 + 10 = 19
total current value = 9 + 9 = 18

select item 0 (this is the 3rd best so take as much as possible, ~27%)
total current capacity = 9 + 10 + (22 * 0.27) = 25
total current value = 9 + 9 + (19 * 0.27)= 23.13
```

### Knapsack Problem

#### using of greedy algorithm for this example will fail

- use the same problem, however selecting a fractional amount of the item is no longer allowed

```
capacity = 25

Item Size Value
0     22    19
1     10    9
2     9     9
3     7     6
```

- using the best order approach in the previous example `2, 1, 0`

```
select item 2
total current capacity = 9
total current value = 9

select item 1
total current capacity = 9 + 10 = 19
total current value = 9 + 9 = 18
```

- the best answer should have been

```
select item 0
total current capacity = 22
total current value = 19
```

##### for this case, using of dynamic programming might be a better solution than to using a greedy algorithm
