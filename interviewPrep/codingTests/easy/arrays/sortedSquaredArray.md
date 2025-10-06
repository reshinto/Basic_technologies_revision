# Sorted Squared Array

Write a function that takes in a non-empty array of integers that are sorted
in ascending order and returns a new array of the same length with the squares
of the original integers also sorted in ascending order.

Sample Input
`array = [1, 2, 3, 5, 6, 8, 9]`
Sample Output
`[1, 4, 9, 25, 36, 64, 81]`

```python
def sortedSquaredArray(array):
  # Write your code here.
  newArr = []
  for v in array:
    newArr.append(v**2)
    return sorted(newArr)


def sortedSquaredArray(array):
  # Write your code here.
  newArr = [0 for _ in array]
  leftIdx = 0
  rightIdx = len(array) - 1
  for i in reversed(range(len(array))):
    if abs(array[leftIdx]) > abs(array[rightIdx]):
      newArr[i] = array[leftIdx] ** 2
      leftIdx += 1
    else:
      newArr[i] = array[rightIdx] ** 2
      rightIdx -= 1
  return newArr
```

```javascript
function sortedSquaredArray(array) {
  // Write your code here.
  const newArray = [];
  for (let v of array) {
    newArray.push(v ** 2);
  }
  return newArray.sort((a, b) => a - b);
}

function sortedSquaredArray(array) {
  // Write your code here.
  let leftIdx = 0;
  let rightIdx = array.length - 1;
  const newArr = new Array(array.length);
  for (let i = array.length - 1; i >= 0; i--) {
    let left = Math.abs(array[leftIdx]);
    let right = Math.abs(array[rightIdx]);
    if (left > right) {
      newArr[i] = left ** 2;
      leftIdx++;
    } else {
      newArr[i] = right ** 2;
      rightIdx--;
    }
  }
  return newArr;
}
```
