# Binary Search: Advanced
## Capacity to Ship Packages Within D Days
```
There are n packages that needs to be transported from one city to another,
and you need to transport them there within d days.
For the ith package, the weight of the package is weights[i].
You are required to deliver them in order, and in order to minimize the cost,
you want to deliver the packages in one truck once per day,
with a capacity as small as possible to save truck rental cost.
What is the minimum capacity of the truck that is required to deliver all packages within d days?

Input
  weights: A list of packages and their weights.
  d: The number of days to deliver all packages.

Output
The minimum capacity of the truck.

Examples
  Input:
    weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    d = 5
Output: 15

Explanation:

The 1st day we deliver the first 5 package.
The 2nd day we deliver the next 2, and for each following days, we deliver 1.
The maximum weight delivered on each day is 15, so we can have a truck with a capacity of 15.
This value is the minimum.

Constraints
1 <= len(weights) <= 5 * 10^4
1 <= d <= len(weights)
1 <= weights[i] <= 500
```
- Solution 1
```javascript
function minMaxWeight(weights, days) {
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    let totalDays = 1;
    let totalWeight = 0;
    for (let i=0; i<weights.length; i++) {
      if (totalWeight + weights[i] > mid) {
        totalDays++;
        totalWeight = weights[i];
      } else {
        totalWeight += weights[i];
      }
    }
    if (totalDays > days) left = mid + 1;
    else right = mid;
  }
  return left;
}
```
- Solution 2
```javascript
function feasible(weights, maxWeight, d) {
  let days = 1;
  let capacity = maxWeight;
  let i = 0;
  while (i < weights.length) {
    if (weights[i] <= capacity) {
      capacity -= weights[i];
      i++;
    } else {
      days++;
      capacity = maxWeight;
    }
  }
  return days <= d;
}

function minMaxWeight(weights, d) {
  let minCapacity = Math.max(...weights);
  let maxCapacity = weights.reduce((a, b) => a + b);
  let boundary = maxCapacity;
  while (minCapacity <= maxCapacity) {
    const midCapacity = Math.floor((minCapacity + maxCapacity) / 2);
    if (feasible(weights, midCapacity, d)) {
      boundary = midCapacity;
      maxCapacity = midCapacity - 1;
    } else {
      minCapacity = midCapacity + 1;
    }
  }
  return boundary;
}
```
```
inputs:
  weights = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
  d = 5
  
minCapacity = 10
maxCapacity = 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55
boundary = 55
is minCapacity <= maxCapacity, 10 <= 55, true, start outer loop
midCapacity = (10 + 55) / 2 = 32
check if midCapacity is feasible
days = 1
capacity = midCapacity = 32
i = 0, n = weights.length = 10
is i < n, 0 < 10, true, start inner loop
is weights[i] <= capacity, weights[0] <= 32, 1 <= 32, true
capacity = capacity - weights[i] = 32 - weights[0] = 32 - 1 = 31
i increment by 1, i = 1

is i < n, 1 < 10, true, continue inner loop
is weights[i] <= capacity, weights[1] <= 31, 2 <= 31, true
capacity = capacity - weights[i] = 31 - weights[1] = 31 - 2 = 29
i increment by 1, i = 2

is i < n, 2 < 10, true, continue inner loop
is weights[i] <= capacity, weights[2] <= 29, 3 <= 29, true
capacity = capacity - weights[i] = 29 - weights[2] = 29 - 3 = 26
i increment by 1, i = 3

is i < n, 3 < 10, true, continue inner loop
is weights[i] <= capacity, weights[3] <= 26, 4 <= 26, true
capacity = capacity - weights[i] = 26 - weights[3] = 26 - 4 = 22
i increment by 1, i = 4

is i < n, 4 < 10, true, continue inner loop
is weights[i] <= capacity, weights[4] <= 22, 5 <= 22, true
capacity = capacity - weights[i] = 22 - weights[4] = 22 - 5 = 17
i increment by 1, i = 5

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 17, 6 <= 17, true
capacity = capacity - weights[i] = 17 - weights[5] = 17 - 6 = 11
i increment by 1, i = 6

is i < n, 6 < 10, true, continue inner loop
is weights[i] <= capacity, weights[6] <= 11, 7 <= 11, true
capacity = capacity - weights[i] = 11 - weights[6] = 11 - 7 = 4
i increment by 1, i = 7

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 4, 8 <= 4, false
days increment by 1, days = 2
capacity reset back to original midCapacity 32

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 32, 8 <= 32, true
capacity = capacity - weights[i] = 32 - weights[7] = 32 - 8 = 24
i increment by 1, i = 8

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 24, 9 <= 24, true
capacity = capacity - weights[i] = 24 - weights[8] = 24 - 9 = 15
i increment by 1, i = 9

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 15, 10 <= 15, true
capacity = capacity - weights[i] = 15 - weights[9] = 15 - 10 = 5
i increment by 1, i = 10

is i < n, 10 < 10, false, end inner loop
return days <= d, 2 <= 5, true
since feasible is true,
boundary = midCapacity = 32
maxCapacity = midCapacity - 1 = 32 - 1 = 31


is minCapacity <= maxCapacity, 10 <= 31, true, continue outer loop
midCapacity = (10 + 31) / 2 = 20
check if midCapacity is feasible
days = 1
capacity = midCapacity = 20
i = 0, n = weights.length = 10
is i < n, 0 < 10, true, start inner loop
is weights[i] <= capacity, weights[0] <= 20, 1 <= 20, true
capacity = capacity - weights[i] = 20 - weights[0] = 20 - 1 = 19
i increment by 1, i = 1

is i < n, 1 < 10, true, continue inner loop
is weights[i] <= capacity, weights[1] <= 19, 2 <= 19, true
capacity = capacity - weights[i] = 19 - weights[1] = 19 - 2 = 17
i increment by 1, i = 2

is i < n, 2 < 10, true, continue inner loop
is weights[i] <= capacity, weights[2] <= 17, 3 <= 17, true
capacity = capacity - weights[i] = 17 - weights[2] = 17 - 3 = 14
i increment by 1, i = 3

is i < n, 3 < 10, true, continue inner loop
is weights[i] <= capacity, weights[3] <= 14, 4 <= 14, true
capacity = capacity - weights[i] = 14 - weights[3] = 14 - 4 = 10
i increment by 1, i = 4

is i < n, 4 < 10, true, continue inner loop
is weights[i] <= capacity, weights[4] <= 10, 5 <= 10, true
capacity = capacity - weights[i] = 10 - weights[4] = 10 - 5 = 5
i increment by 1, i = 5

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 5, 6 <= 5, false
days increment by 1, days = 2
capacity resets back to midCapacity 20

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 20, 6 <= 20, true
capacity = capacity - weights[i] = 20 - weights[5] = 20 - 6 = 14
i increment by 1, i = 6

is i < n, 6 < 10, true, continue inner loop
is weights[i] <= capacity, weights[6] <= 14, 7 <= 14, true
capacity = capacity - weights[i] = 14 - weights[6] = 14 - 7 = 7
i increment by 1, i = 7

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 7, 8 <= 7, false
days increment by 1, days = 3
capacity resets back to midCapacity 20

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 20, 8 <= 20, true
capacity = capacity - weights[i] = 20 - weights[7] = 20 - 8 = 12
i increment by 1, i = 8

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 12, 9 <= 12, true
capacity = capacity - weights[i] = 12 - weights[8] = 12 - 9 = 3
i increment by 1, i = 9

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 3, 10 <= 3, false
days increment by 1, days = 4
capacity resets back to midCapacity 20

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 20, 10 <= 20, true
capacity = capacity - weights[i] = 20 - weights[9] = 20 - 10 = 10
i increment by 1, i = 10

is i < n, 10 < 10, false, end inner loop
return days <= d, 4 <= 5, true
since feasible is true,
boundary = midCapacity = 20
maxCapacity = midCapacity - 1 = 20 - 1 = 19


is minCapacity <= maxCapacity, 10 <= 19, true, continue outer loop
midCapacity = (10 + 19) / 2 = 14
check if midCapacity is feasible
days = 1
capacity = midCapacity = 14
i = 0, n = weights.length = 10
is i < n, 0 < 10, true, start inner loop
is weights[i] <= capacity, weights[0] <= 14, 1 <= 14, true
capacity = capacity - weights[i] = 14 - weights[0] = 14 - 1 = 13
i increment by 1, i = 1

is i < n, 1 < 10, true, continue inner loop
is weights[i] <= capacity, weights[1] <= 13, 2 <= 13, true
capacity = capacity - weights[i] = 13 - weights[1] = 13 - 2 = 11
i increment by 1, i = 2

is i < n, 2 < 10, true, continue inner loop
is weights[i] <= capacity, weights[2] <= 11, 3 <= 11, true
capacity = capacity - weights[i] = 11 - weights[2] = 11 - 3 = 8
i increment by 1, i = 3

is i < n, 3 < 10, true, continue inner loop
is weights[i] <= capacity, weights[3] <= 8, 4 <= 8, true
capacity = capacity - weights[i] = 8 - weights[3] = 8 - 4 = 4
i increment by 1, i = 4

is i < n, 4 < 10, true, continue inner loop
is weights[i] <= capacity, weights[4] <= 4, 5 <= 4, false
days increment by 1, days = 2
capacity resets back to midCapacity 14

is i < n, 4 < 10, true, continue inner loop
is weights[i] <= capacity, weights[4] <= 14, 5 <= 14, true
capacity = capacity - weights[i] = 14 - weights[4] = 14 - 5 = 9
i increment by 1, i = 5

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 9, 6 <= 9, true
capacity = capacity - weights[i] = 9 - weights[5] = 9 - 6 = 3
i increment by 1, i = 6

is i < n, 6 < 10, true, continue inner loop
is weights[i] <= capacity, weights[6] <= 3, 7 <= 3, false
days increment by 1, days = 3
capacity resets back to midCapacity 14

is i < n, 6 < 10, true, continue inner loop
is weights[i] <= capacity, weights[6] <= 14, 7 <= 14, true
capacity = capacity - weights[i] = 14 - weights[6] = 14 - 7 = 7
i increment by 1, i = 7

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 7, 8 <= 7, false
days increment by 1, days = 4
capacity resets back to midCapacity 14

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 14, 8 <= 14, true
capacity = capacity - weights[i] = 14 - weights[7] = 14 - 8 = 6
i increment by 1, i = 8

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 6, 9 <= 6, false
days increment by 1, days = 5
capacity resets back to midCapacity 14

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 14, 9 <= 14, true
capacity = capacity - weights[i] = 14 - weights[8] = 14 - 9 = 5
i increment by 1, i = 9

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 5, 10 <= 5, false
days increment by 1, days = 6
capacity resets back to midCapacity 14

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 14, 10 <= 14, true
capacity = capacity - weights[i] = 14 - weights[9] = 14 - 10 = 4
i increment by 1, i = 10

is i < n, 10 < 10, false, end inner loop
return days <= d, 6 <= 5, false
since feasible is false,
minCapacity = midCapacity + 1 = 10 + 1 = 11


is minCapacity <= maxCapacity, 11 <= 19, true, continue outer loop
midCapacity = (11 + 19) / 2 = 15
check if midCapacity is feasible
days = 1
capacity = midCapacity = 15
i = 0, n = weights.length = 10
is i < n, 0 < 10, true, start inner loop
is weights[i] <= capacity, weights[0] <= 15, 1 <= 15, true
capacity = capacity - weights[i] = 15 - weights[0] = 15 - 1 = 14
i increment by 1, i = 1

is i < n, 1 < 10, true, continue inner loop
is weights[i] <= capacity, weights[1] <= 14, 2 <= 14, true
capacity = capacity - weights[i] = 14 - weights[1] = 14 - 2 = 12
i increment by 1, i = 2

is i < n, 2 < 10, true, continue inner loop
is weights[i] <= capacity, weights[2] <= 12, 3 <= 12, true
capacity = capacity - weights[i] = 12 - weights[2] = 12 - 3 = 9
i increment by 1, i = 3

is i < n, 3 < 10, true, continue inner loop
is weights[i] <= capacity, weights[3] <= 9, 4 <= 9, true
capacity = capacity - weights[i] = 9 - weights[3] = 9 - 4 = 5
i increment by 1, i = 4

is i < n, 4 < 10, true, continue inner loop
is weights[i] <= capacity, weights[4] <= 5, 5 <= 5, true
capacity = capacity - weights[i] = 5 - weights[4] = 5 - 5 = 0
i increment by 1, i = 5

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 0, 6 <= 0, false
days increment by 1, days = 2
capacity resets back to midCapacity 15

is i < n, 5 < 10, true, continue inner loop
is weights[i] <= capacity, weights[5] <= 15, 6 <= 15, true
capacity = capacity - weights[i] = 15 - weights[5] = 15 - 6 = 9
i increment by 1, i = 6

is i < n, 6 < 10, true, continue inner loop
is weights[i] <= capacity, weights[6] <= 9, 7 <= 9, true
capacity = capacity - weights[i] = 9 - weights[6] = 9 - 7 = 2
i increment by 1, i = 7

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 2, 8 <= 2, false
days increment by 1, days = 3
capacity resets back to midCapacity 15

is i < n, 7 < 10, true, continue inner loop
is weights[i] <= capacity, weights[7] <= 15, 8 <= 15, true
capacity = capacity - weights[i] = 15 - weights[7] = 15 - 8 = 7
i increment by 1, i = 8

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 7, 9 <= 7, false
days increment by 1, days = 4
capacity resets back to midCapacity 15

is i < n, 8 < 10, true, continue inner loop
is weights[i] <= capacity, weights[8] <= 15, 9 <= 15, true
capacity = capacity - weights[i] = 15 - weights[8] = 15 - 9 = 6
i increment by 1, i = 9

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 6, 10 <= 6, false
days increment by 1, days = 5
capacity resets back to midCapacity 15

is i < n, 9 < 10, true, continue inner loop
is weights[i] <= capacity, weights[9] <= 15, 10 <= 15, true
capacity = capacity - weights[i] = 15 - weights[9] = 15 - 10 = 5
i increment by 1, i = 10

is i < n, 10 < 10, false, end inner loop
return days <= d, 5 <= 5, true
since feasible is true,
boundary = midCapacity = 15
maxCapacity = midCapacity - 1 = 15 - 1 = 14

...
midCapacity = (11 + 14) / 2 = 12
since feasible is false,
minCapacity = midCapacity + 1 = 13

...
midCapacity = (13 + 14) / 2 = 13
since feasible is false,
minCapacity = midCapacity + 1 = 14

...
midCapacity = (14 + 14) / 2 = 14
since feasible is false,
minCapacity = midCapacity + 1 = 15

...
is minCapacity <= maxCapacity, 15 <= 14, false, end outer loop
return boundary = 15
```
### Explanation
- At minimum, if our truck capacity is only 1 package, we need the sum(weights) days to ship all packages
- At maximum, if our truck capacity is sum(weights), then it'd take only 1 day to ship
- Since we want to ship within d days, the optimal truck capacity somewhere in between
- We know how to find if a truck capacity is feasible or not
  - we simply loop through the weights and see if we can ship it within d days
- Now this has yet again turned into the classic `Finding the Boundary problem`
- Time Complexity: `O(n * log(n))`
