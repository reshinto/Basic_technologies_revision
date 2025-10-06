# Move Element To End

You're given an array of integers and an integer. Write a function that moves
all instances of that integer in the array to the end of the array and returns
the array.

The function should perform this in place (i.e., it should mutate the input
array) and doesn't need to maintain the order of the other integers.

Sample Input
`array = [2, 1, 2, 2, 2, 3, 4, 2]`
`toMove = 2`

Sample Output
`[1, 3, 4, 2, 2, 2, 2, 2] // the numbers 1, 3, and 4 could be ordered differently`

```python
def moveElementToEnd(array, toMove):
  # Write your code here.
  L = 0
  R = len(array) - 1
  while L < R:
    v1 = array[L]
    v2 = array[R]
    if v1 == toMove and v2 != toMove:
      array[L], array[R] = array[R], array[L]
    if v1 != toMove:
      L += 1
    if v2 == toMove:
      R -= 1
  return array
```

```javascript
function moveElementToEnd(array, toMove) {
  // Write your code here.
  let L = 0;
  let R = array.length - 1;
  while (L < R) {
    const v1 = array[L];
    const v2 = array[R];
    if (v1 === toMove && v2 !== toMove) {
      [array[L], array[R]] = [array[R], array[L]];
    }
    if (v1 !== toMove) {
      L += 1;
    }
    if (v2 === toMove) {
      R -= 1;
    }
  }
  return array;
}
```
