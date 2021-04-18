# Monotonic Array

  Write a function that takes in an array of integers and returns a boolean
  representing whether the array is monotonic.
  
  An array is said to be monotonic if its elements, from left to right, are
  entirely non-increasing or entirely non-decreasing.
  
  Non-increasing elements aren't necessarily exclusively decreasing; they simply
  don't increase. Similarly, non-decreasing elements aren't necessarily
  exclusively increasing; they simply don't decrease.
  
  Note that empty arrays and arrays of one element are monotonic.
  
  Sample Input
  ```array = [-1, -5, -10, -1100, -1100, -1101, -1102, -9001]```
  
  Sample Output
  ```true```
  
```python
def isMonotonic(array):
  # Write your code here.
  length = len(array)
  if length <= 2:
    return True
  isEqual = True if array[0] == array[length - 1] else False
  isIncrease = True if array[0] < array[length - 1] else False
  isDecrease = True if array[0] > array[length - 1] else False
  for i in range(1, length):
    if isIncrease and array[i-1] > array[i]:
      return False
    elif isDecrease and array[i-1] < array[i]:
      return False
    elif isEqual and array[i-1] != array[i]:
      return False
  return True
```
```javascript
function isMonotonic(array) {
  // Write your code here.
  const len = array.length;
  if (len <= 2) {
    return true;
  }
  let isEqual = array[0] === array[len - 1] ? true : false;
  let isIncrease = array[0] < array[len - 1] ? true : false;
  let isDecrease = array[0] > array[len - 1] ? true : false;
  for (let i=1; i<len; i++) {
    if (isIncrease && array[i-1] > array[i]) {
      return false;
    } else if (isDecrease && array[i-1] < array[i]) {
      return false;
    } else if (isEqual && array[i-1] !== array[i]) {
      return false;
    }
  }
  return true;
}
```
