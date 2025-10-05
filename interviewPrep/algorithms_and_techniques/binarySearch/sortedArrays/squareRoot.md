# Binary Search: Sorted Array
## Square Root
```
Given an integer, find its square root without using built-in square root function.
Only return the integer part (truncate the decimals).

Input: 16

Output: 4


Input: 8

Output: 2

Explanation: square root of 8 is 2.83..., return integer part 2
```
```javascript
function squareRoot(n) {
  let left = 0;
  let right = n;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (mid * mid <= n) {
      result = mid;
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
```
### Explanation
- The problem is equivalent to finding the boundary of elements < n and elements >= n
- Imagine we apply a filter of `arr[i] ^ 2 = n`
- Now the problem is reduced to finding the last true element in a boolean array
- And we already know how to do this from `Find Boundary`
- Time Complexity: `O(log(n))`
