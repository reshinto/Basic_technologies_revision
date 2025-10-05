# Binary Search: Implicitly Sorted Array
## Find Minimum in Rotated Sorted Array
```
A sorted array was rotated at an unknown pivot.
For example, [10, 20, 30, 40, 50] becomes [30, 40, 50, 10, 20].
Find the index of the minimum element in this array.

Input: [30, 40, 50, 10, 20]

Output: 3

Explanation: the smallest element is 10 and its index is 3.


Input: [3, 5, 7, 11, 13, 17, 19, 2]

Output: 7

Explanation: the smallest element is 2 and its index is 7.
```
```javascript
function findMinRotated(arr) {
  let left = 0;
  let right = arr.length - 1;
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (arr[mid-1] > arr[mid]) {
      return mid;
    } else if (arr[mid] > arr[right]) {
      left = mid + 1;
    } else {
      right = mid - 1;
    }
  }
  return left;
}
```
### Explanation
- At first glance, it seems that there's no way to do it in less than linear time
  - The array is not sorted
- But remember binary search can work beyond sorted array
  - as long as there is a binary decision we can use to shrink the search range
- Notice the numbers are divided into two sections
  - numbers > last element of the array and numbers < last element of the array
  - The minimum element is at the boundary between the two sections.
- We can apply a filter of < the last element and get the boolean array that characterizes the two sections
- Now the problem is yet again reduced to finding the first true element in a boolean array
- And we already know how to do this from `Find Boundary`
- Time Complexity: `O(log(n))`
