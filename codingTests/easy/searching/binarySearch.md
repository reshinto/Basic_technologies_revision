# Binary Search

  Write a function that takes in a sorted array of integers as well as a target
  integer. The function should use the Binary Search algorithm to determine if
  the target integer is contained in the array and should return its index if it
  is, otherwise -1
  
  If you're unfamiliar with Binary Search, we recommend watching the Conceptual
  Overview section of this question's video explanation before starting to code.
  
  Sample Input
  ```array = [0, 1, 21, 33, 45, 45, 61, 71, 72, 73]```
  ```target = 33```
  
  Sample Output
  3
```python
# solution 1
def binarySearch(array, target):
    # Write your code here.
    L = 0
  R = len(array) - 1
  while L is not R:
    M = round((R - L) / 2) + L
    V = array[M]
    if array[L] == target:
      return L
    if array[R] == target:
      return R
    if V == target:
      return M
    elif target > V:
      L = M + 1
    elif target < V:
      R = M - 1
    else:
      break
  return -1
  
  
# solution 2
def binarySearch(array, target):
    # Write your code here.
  return search(array, target, 0, len(array)-1)


def search(array, target, L, R):
  if L > R:
    return -1
  M = (R + L) // 2
  V = array[M]
  if target == V:
    return M
  elif target > V:
    return search(array, target, L+1, R)
  else:
    return search(array, target, L, R-1)


# solution 3
def binarySearch(array, target):
    # Write your code here.
    L = 0
  R = len(array) - 1
  while L <= R:
    M = (R + L) // 2
    V = array[M]
    if target == V:
      return M
    elif target > V:
      L = M + 1
    else:
      R = M - 1
  return -1
```
```javascript
// solution 1
function binarySearch(array, target) {
  // Write your code here.
  let L = 0;
  let R = array.length - 1;
  while (L <= R) {
    const M = Math.floor((R + L)/2);
    const V = array[M];
    if (target === V) {
      return M;
    } else if (target > V) {
      L = M + 1;
    } else {
      R = M - 1;
    }
  }
  return -1;
}

// solution 2
function binarySearch(array, target) {
  // Write your code here.
  return search(array, target, 0, array.length - 1);
}

function search(array, target, L, R) {
  const M = Math.floor((R + L) / 2);
  const V = array[M];
  if (L > R) {
    return -1;
  }
  if (target === V) {
    return M;
  } else if (target > V) {
    return search(array, target, M + 1, R)
  } else {
    return search(array, target, L, M - 1);
  }
}
```
