# Spiral Traverse

Write a function that takes in an n x m two-dimensional array (that can be
square-shaped when n == m) and returns a one-dimensional array of all the
array's elements in spiral order.

Spiral order starts at the top left corner of the two-dimensional array, goes
to the right, and proceeds in a spiral pattern all the way until every element
has been visited.

Sample Input

```
array = [
  [1,   2,  3, 4],
  [12, 13, 14, 5],
  [11, 16, 15, 6],
  [10,  9,  8, 7],
]
```

Sample Output
`[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]`

```python
# solution 1
def spiralTraverse(array):
  # Write your code here.
  startRow = 0
  endRow = len(array) - 1
  startCol = 0
  endCol = len(array[0]) - 1
  result = []
  while startRow <= endRow and startCol <= endCol:
    for i in range(startCol, endCol + 1):
      result.append(array[startRow][i])

    for i in range(startRow + 1, endRow + 1):
      result.append(array[i][endCol])

    for i in range(endCol - 1, startCol - 1, -1):
      if startRow == endRow:
        break
      result.append(array[endRow][i])

    for i in range(endRow - 1, startRow, -1):
      if startCol == endCol:
        break
      result.append(array[i][startCol])

    startRow += 1
    endRow -= 1
    startCol += 1
    endCol -= 1
  return result


# solution 2
def spiralTraverse(array):
  # Write your code here.
  result = []
  traverse(array, 0, len(array) - 1, 0, len(array[0]) - 1, result)
  return result


def traverse(array, startRow, endRow, startCol, endCol, result):
  if startRow > endRow or startCol > endCol:
    return

  for i in range(startCol, endCol + 1):
    result.append(array[startRow][i])

  for i in range(startRow + 1, endRow + 1):
    result.append(array[i][endCol])

  for i in range(endCol - 1, startCol - 1, -1):
    if startRow == endRow:
      return
    result.append(array[endRow][i])

  for i in range(endRow - 1, startRow, -1):
    if startCol == endCol:
      return
    result.append(array[i][startCol])

  traverse(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result)
```

```javascript
// solution 1
function spiralTraverse(array) {
  // Write your code here.
  const result = [];
  let startRow = 0;
  let endRow = array.length - 1;
  let startCol = 0;
  let endCol = array[0].length - 1;

  while (startRow <= endRow && startCol <= endCol) {
    for (let i = startCol; i < endCol + 1; i++) {
      result.push(array[startRow][i]);
    }

    for (let i = startRow + 1; i < endRow + 1; i++) {
      result.push(array[i][endCol]);
    }

    for (let i = endCol - 1; i > startCol - 1; i--) {
      if (startRow === endRow) {
        break;
      }
      result.push(array[endRow][i]);
    }

    for (let i = endRow - 1; i > startRow; i--) {
      if (startCol === endCol) {
        break;
      }
      result.push(array[i][startCol]);
    }

    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }
  return result;
}

// solution 2
function spiralTraverse(array) {
  // Write your code here.
  const result = [];
  traverse(array, 0, array.length - 1, 0, array[0].length - 1, result);
  return result;
}

function traverse(array, startRow, endRow, startCol, endCol, result) {
  if (startRow > endRow || startCol > endCol) {
    return;
  }

  for (let i = startCol; i < endCol + 1; i++) {
    result.push(array[startRow][i]);
  }

  for (let i = startRow + 1; i < endRow + 1; i++) {
    result.push(array[i][endCol]);
  }

  for (let i = endCol - 1; i > startCol - 1; i--) {
    if (startRow === endRow) {
      break;
    }
    result.push(array[endRow][i]);
  }

  for (let i = endRow - 1; i > startRow; i--) {
    if (startCol === endCol) {
      break;
    }
    result.push(array[i][startCol]);
  }

  traverse(array, startRow + 1, endRow - 1, startCol + 1, endCol - 1, result);
}
```
