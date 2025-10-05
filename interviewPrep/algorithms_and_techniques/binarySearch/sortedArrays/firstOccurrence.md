# Binary Search: Sorted Array
## Find Element in Sorted Array with Duplicates
```
Given a sorted array of integers and a target integer,
find the first occurrence of the target and return its index.
Return -1 if the target is not in the array.

Input:
  arr = [1, 3, 3, 3, 3, 6, 10, 10, 10, 100]
  target = 3

Output: 1

Explanation: First occurrence of 3 is at index 1.


Input:
  arr = [2, 3, 5, 7, 11, 13, 17, 19]
  target = 6

Output: -1

Explanation: 6 does not exists in the array.
```
```javascript
function findFirstOccurrence(arr, target) {
  let left = 0;
  let right = arr.length - 1;
  let result = -1;
  while (left <= right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid] === target) {
      result = mid;
      right = mid - 1;
    } else if (arr[mid] < target) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return result;
}
```
### Explanation
- The problem is equivalent to finding the boundary of elements < 3 and elements >= 3
- Imagine we apply a filter of `arr[i] >= 3`
- Now the problem is reduced to finding the first true element in a boolean array
- And we already know how to do this from `Find Boundary`
- Time Complexity: `O(log(n))`
