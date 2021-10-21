# Binary Search
- input data has to be sorted before binary search could be done
```
find the index of the value 10 in a list of numbers


input:
  arr = [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20]
  leftIndex = 0
  rightIndex = 9
  findValue = 10
output: 8
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function binarySearch(arr, leftIndex, rightIndex, findValue) {
  if (leftIndex > rightIndex) return -1;
  
  const midIndex = Math.floor((leftIndex + rightIndex) / 2);
  if (findValue === arr[midIndex]) return midIndex;
  
  if (findValue < arr[midIndex]) return binarySearch(arr, leftIndex, midIndex - 1, findValue);
  
  return binarySearch(arr, midIndex + 1, rightIndex, findValue);
}
```
```
input:
  arr = [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20]
  leftIndex = 0
  rightIndex = 9
  findValue = 10

current leftIndex is 0 and rightIndex is 9 when function is called, 
since leftIndex is not more than rightIndex,
and midIndex is 4, value is 3
findValue is larger than mid value
the return value is added to the call stack

|---------------------------------|
| binarySearch(arr, 4 + 1, 9, 10) |
|---------------------------------|

move to the next recursion call
current leftIndex is 5 and rightIndex is 9 when function is called, 
since leftIndex is not more than rightIndex,
and midIndex is 7, value is 9
findValue is larger than mid value
the return value is added to the call stack

|---------------------------------|
| binarySearch(arr, 7 + 1, 9, 10) |
| binarySearch(arr, 5, 9, 10)     |
|---------------------------------|

move to the next recursion call
current leftIndex is 8 and rightIndex is 9 when function is called, 
since leftIndex is not more than rightIndex,
and midIndex is 8, value is 10
findValue is equal to mid value
the return value is the midIndex
since arr value at the return index is equal to the findValue,
it will start executing by poping the top stack frame from the call stack

return result: 8
|---------------------------------|
| 8                               |
| binarySearch(arr, 5, 9, 10)     |
|---------------------------------|

return result: 8
|---------------------------------|
|                                 |
| 8                               |
|---------------------------------|

return result: 8
|---------------------------------|
|                                 |
|                                 |
|---------------------------------|
```
## Iterative solution
```javascript
function binarySearch(arr, findValue) {
  let leftIndex = 0;
  let rightIndex = arr.length - 1;

  while (leftIndex <= rightIndex) {
    const midIndex = Math.floor((leftIndex + rightIndex) / 2);
    if (findValue === arr[midIndex]) return midIndex;
    if (findValue < arr[midIndex]) {
      rightIndex = midIndex - 1;
    } else if (findValue > arr[midIndex]) {
      leftIndex = midIndex + 1;
    }
  }
  return -1;
}
```
