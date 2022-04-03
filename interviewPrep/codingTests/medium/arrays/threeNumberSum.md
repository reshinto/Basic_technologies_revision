# Three Number Sum

  Write a function that takes in a non-empty array of distinct integers and an
  integer representing a target sum. The function should find all triplets in
  the array that sum up to the target sum and return a two-dimensional array of
  all these triplets. The numbers in each triplet should be ordered in ascending
  order, and the triplets themselves should be ordered in ascending order with
  respect to the numbers they hold.
  
  If no three numbers sum up to the target sum, the function should return an
  empty array.
  
  Sample Input
  ```array = [12, 3, 1, 2, -6, 5, -8, 6]```
  ```targetSum = 0```
  
  Sample Output
  ```[[-8, 2, 6], [-8, 3, 5], [-6, 1, 5]]```
  
```python
def threeNumberSum(array, targetSum):
  # Write your code here.
  array.sort()
  result = []
  for i in range(len(array) - 2):
    left = i + 1
    right = len(array) - 1
    while left < right:
      sum = array[i] + array[left] + array[right]
      if sum == targetSum:
        result.append([array[i], array[left], array[right]])
        newArr = []
        left += 1
        right -= 1
      elif sum > targetSum:
        right -= 1
      elif sum < targetSum:
        left += 1
  return result
```
```javascript
function threeNumberSum(array, targetSum) {
  // Write your code here.
  array.sort((a, b) => a - b);
  const result = [];
  for (let i=0; i<array.length - 2; i++) {
    let left = i + 1;
    let right = array.length - 1;
    while (left < right) {
      const sum = array[i] + array[left] + array[right];
      if (sum === targetSum) {
        result.push([array[i], array[left], array[right]]);
        left++;
        right--;
      } else if (sum > targetSum) {
        right--;
      } else if (sum < targetSum) {
        left++;
      }
    }
  }
  return result;
}
```
