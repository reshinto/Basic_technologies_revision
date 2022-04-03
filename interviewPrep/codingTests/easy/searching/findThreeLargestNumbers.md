# Find Three Largest Numbers

  Write a function that takes in an array of at least three integers and,
  without sorting the input array, returns a sorted array of the three largest
  integers in the input array.
  
  The function should return duplicate integers if necessary; for example, it
  should return [10, 10, 12] for an input array of [10, 5, 9, 10, 12]
  
  Sample Input
  ```array = [141, 1, 17, -7, -17, -27, 18, 541, 8, 7, 7]```
  Sample Output
  ```[18, 141, 541]```
```python
def findThreeLargestNumbers(array):
  # Write your code here.
  newArr = [None, None, None]
  for v in array:
    a, b, c = newArr[0], newArr[1], newArr[2]
    if not c:
      newArr[2] = v
    elif v >= c:
      newArr[0] = newArr[1]
      newArr[1] = newArr[2]
      newArr[2] = v
    elif not b:
      newArr[1] = v
    elif v >= b:  
      newArr[0] = newArr[1]
      newArr[1] = v
    elif not a:
      newArr[0] = v
    elif v >= a:  
      newArr[0] = v
  return newArr
```
```javascript
function findThreeLargestNumbers(array) {
  // Write your code here.
  const newArr = [null, null, null];
  for (let v of array) {
    const [a, b, c] = newArr;
    if (!c) {
      newArr[2] = v;
    } else if (v >= c) {
      newArr[0] = newArr[1];
      newArr[1] = newArr[2];
      newArr[2] = v;
    } else if (!b) {
      newArr[1] = v;
    } else if (v >= b) {
      newArr[0] = newArr[1];
      newArr[1] = v;
    } else if (!a) {
      newArr[0] = v;
    } else if (v >= a) {
      newArr[0] = v;
    }
  }
  return newArr;
}
```
