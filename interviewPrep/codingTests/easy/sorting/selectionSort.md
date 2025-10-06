# Selection Sort

Sample Input
`array = [8, 5, 2, 9, 5, 6, 3]`
Sample Output
`[2, 3, 5, 5, 6, 8, 9]`

```python
def selectionSort(array):
  # Write your code here.
  for i in range(len(array)):
  selected = i
  for j in range(i+1, len(array)):
    if array[j] < array[selected]:
      selected = j
  if selected != i:
    array[selected], array[i] = array[i], array[selected]
  return array
```

```javascript
function selectionSort(array) {
  // Write your code here.
  for (let i = 0; i < array.length; i++) {
    let smallestIdx = i;
    for (let j = i + 1; j < array.length; j++) {
      if (array[j] < array[smallestIdx]) {
        smallestIdx = j;
      }
    }
    if (smallestIdx !== i) {
      [array[i], array[smallestIdx]] = [array[smallestIdx], array[i]];
    }
  }
  return array;
}
```
