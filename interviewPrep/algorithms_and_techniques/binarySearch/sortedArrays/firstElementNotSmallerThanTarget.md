# Binary Search: Sorted Array
## First Element Not Smaller Than Target
```
Given an array of integers sorted in increasing order and a target,
find the index of the first element in the array that is larger than or equal to the target.
Assume that it is guaranteed to find a satisfying number.

Input:
  arr = [1, 3, 3, 5, 8, 8, 10]
  target = 2

Output: 1

Explanation: the first element larger than 2 is 3 which has index 1.


Input:
  arr = [2, 3, 5, 7, 11, 13, 17, 19]
  target = 6

Output: 3

Explanation: the first element larger than 6 is 7 which has index 3.
```
```javascript
function firstNotSmaller(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] >= target) {
      result = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return result;
}
```
### Explanation
- The problem is equivalent to finding the boundary of elements < 3 and elements >=3
- Imagine if we apply a filter of `arr[i] < target`
- Now the problem is reduced to finding the first true element in a boolean array
- And we already know how to do this from `Find Boundary`
- Time Complexity: `O(log(n))`
