# Binary Search: Implicitly Sorted Array
## Peak of Mountain Array
```
A mountain array is defined as an array that
  - has at least 3 elements
  - let's call the element with the largest value the "peak", with index k
    The array elements monotonically increase from the first element to A[k],
    and then monotonically decreases from A[k + 1] to the last element of the array
    Thus creating a "mountain" of numbers.

Find the index of the peak element. Assume there is only one peak element

Input: 0 1 2 3 2 1 0

Output: 3

Explanation: the largest element is 3 and its index is 3
```
```javascript
function peakOfMountainArray(arr) {
  let left = 0;
  let right = arr.length - 1;
  let boundary_index = -1;
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    if (mid === arr.length - 1 || arr[mid] >= arr[mid + 1]) {
      boundary_index = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }
  return boundary_index;
}
```
### Explanation
- The peak element is always larger than the next element
- Applying the filter of `arr[i] > arr[i + 1]` we get a boolean array
- A minor edge case is for the last element as it has no next element
- In that case, we assume its next element is negative infinity
- Now the problem is reduced to finding the first true element in a boolean array
- And we already know how to do this from `Find Boundary`
- Time Complexity: `O(log(n))`
