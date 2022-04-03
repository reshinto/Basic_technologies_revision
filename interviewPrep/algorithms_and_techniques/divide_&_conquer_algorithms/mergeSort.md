# Merge Sort
```
we take in a bunch of unsorted values,
then keep dividing the values until it cannot be divided anymore,
then sort them and merge them in a sorted order

input: [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
output: [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20]
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function mergeSort(data, startIndex, endIndex) {
  if (startIndex < endIndex) {
    const midIndex = Math.floor((startIndex + endIndex) / 2);
    mergeSort(data, startIndex, midIndex);
    mergeSort(data, midIndex + 1, endIndex);
    merge(data, startIndex, midIndex, endIndex);
  }
}

function merge(data, startIndex, midIndex, endIndex) {
  // build temp array to avoid modifying original contents
  const temp = Array(endIndex - startIndex + 1);
  
  let i = startIndex;  // index for the left array
  let j = midIndex + 1;  // index for the right array
  let k = 0;  // index for the temp array
  
  // while both sub-array have values, then try and merge them in sorted order
  while (i <= midIndex && j <= endIndex) {
    if (data[i] <= data[j]) {
      temp[k] = data[i];
      i++;
    } else {
      temp[k] = data[j];
      j++;      
    }
    k++;
  }
  
  // add the rest of the values from the left sub-array into the result
  while (i <= midIndex) {
    temp[k] = data[i];
    k++;
    i++;
  }
  
  // add the rest of the values from the right sub-array into the result
  while (j <= endIndex) {
    temp[k] = data[j];
    k++;
    j++;
  }
  
  // overwrite the original data values
  for (let i=startIndex; i<=endIndex; i++) {
    data[i] = temp[i - startIndex];
  }
}
```
```
input: [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]

1st split [4, 1, 3, 2, 0, -1, 7, 10, 9, 20] into 2 halves
left side [4, 1, 3, 2, 0], right side [-1, 7, 10, 9, 20]
left side needs to be finished first before doing the right side

  [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
        /                   \
[4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]

|----------------------------------------------------|
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

then split [4, 1, 3, 2, 0] into 2 halves again
left side [4, 1], right side [3, 2, 0]
left side needs to be finished first before doing the right side

    [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
   /        \
[4, 1]  [3, 2, 0]

|----------------------------------------------------|
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 1) |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

then split [4, 1] into 2 halves again
left side [4], right side [1]
left side needs to be finished first before doing the right side

    [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [4, 1]  [3, 2, 0]
  /   \
[4]   [1]

|----------------------------------------------------|
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 0) |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 1) |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 1, 1) |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 1) |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

since the left side and ride side is both at the base case
sort it and then merge and replace the parent value

    [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [1, 4]  [3, 2, 0]

|----------------------------------------------------|
| merge([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 0, 1)  |
| mergeSort([4, 1, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|
 
 now look at the right side [3, 2, 0] and split into 2 halves
 left side [3], right [2, 0]
 
     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [1, 4]  [3, 2, 0]
          /    \
        [3]  [2, 0]

|----------------------------------------------------|
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 2) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 3, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

since the left side is at the base case, split the right side [2, 0] into 2 halves
left [2], right [0]

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [1, 4]  [3, 2, 0]
          /    \
        [3]  [2, 0]
              /   \
            [2]   [0]

|----------------------------------------------------|
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 3, 3) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 3, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 4, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 3, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

since the left side and ride side is both at the base case
sort it and then merge and replace the parent value

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [1, 4]  [3, 2, 0]
          /    \
        [3]  [0, 2]

|----------------------------------------------------|
| merge([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 3, 3, 4)  |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 2, 4) |
| mergeSort([1, 4, 3, 2, 0, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|

left and right are both sorted, sort it and then merge and replace the parent value
compare the left side value with the right side value,
the smallest would be added to the new parent array first

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [4, 1, 3, 2, 0]     [-1, 7, 10, 9, 20]
    /        \
 [1, 4]  [0, 2, 3]
 
|----------------------------------------------------|
| merge([1, 4, 3, 0, 2, -1, 7, 10, 9, 20], 2, 3, 4)  |
| mergeSort([1, 4, 3, 0, 2, -1, 7, 10, 9, 20], 0, 4) |
|----------------------------------------------------|
 
left and right are both sorted, sort it and then merge and replace the parent value
compare the left side value with the right side value,
the smallest would be added to the new parent array first

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]

|---------------------------------------------------|
| merge([1, 4, 0, 2, 3, -1, 7, 10, 9, 20], 0, 2, 4) |
|---------------------------------------------------|

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

now look at the right side [-1, 7, 10, 9, 20] and split into 2 halves
left [-1, 7], right [10, 9, 20]
left side needs to be finished first before doing the right side

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 6) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|
                    
split the [-1, 7] into 2 halves
left [-1], right [7]

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]
                     /   \
                   [-1]  [7]

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 5) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 6) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 6, 6) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 6) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

since the left side and ride side is both at the base case
sort it and then merge and replace the parent value

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]

|----------------------------------------------------|
| merge([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 5, 6)  |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

now look at the right side [10, 9, 20] and split it into 2 halves
left [10], right [9, 20]

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]
                               /     \
                             [10]  [9, 20]

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 7) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 8, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

since the left side is at the base case, split the right side [9, 20] into 2 halves
left [9], right [20]

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]
                               /     \
                             [10]  [9, 20]
                                    /    \
                                  [9]   [20]

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 8, 8) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 8, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

|----------------------------------------------------|
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 9, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 8, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

since the left and right are at the base case,
sort it and then merge and replace the parent value

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [10, 9, 20]
                               /     \
                             [10]  [9, 20]

|----------------------------------------------------|
| merge([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 8, 8, 9)  |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 9) |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 5, 9) |
|----------------------------------------------------|

since the left and right are already sorted,
sort them and then merge and replace the parent value
compare the left side value with the right side value,
the smallest would be added to the new parent array first

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 10, 9, 20]
                        /         \
                    [-1, 7]   [9, 10, 20]

|----------------------------------------------------|
| merge([0, 1, 2, 3, 4, -1, 7, 10, 9, 20], 7, 8, 9)  |
| mergeSort([0, 1, 2, 3, 4, -1, 7, 9, 10, 20], 5, 9) |
|----------------------------------------------------|

since the left and right are already sorted,
sort them and then merge and replace the parent value
compare the left side value with the right side value,
the smallest would be added to the new parent array first

     [4, 1, 3, 2, 0, -1, 7, 10, 9, 20]
          /                   \
  [0, 1, 2, 3, 4]     [-1, 7, 9, 10, 20]

|---------------------------------------------------|
| merge([0, 1, 2, 3, 4, -1, 7, 9, 10, 20], 5, 7, 9) |
|---------------------------------------------------|

since the left and right are already sorted,
sort them and then merge and replace the parent value
compare the left side value with the right side value,
the smallest would be added to the new parent array first

     [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20]
     
|---------------------------------------------------|
| merge([0, 1, 2, 3, 4, -1, 7, 9, 10, 20], 0, 4, 9) |
|---------------------------------------------------|

return results = [-1, 0, 1, 2, 3, 4, 7, 9, 10, 20]
```
## Iterative solution
```javascript
function mergeSort(data) {
  const endIndex = data.length - 1;

  // current size of subarrays to be merged
  // currSize varies from 1 to endIndex/2
  // Merge subarrays in bottom up manner
  // First merge subarrays of size 1 to create sorted subarrays of size 2
  // then merge subarrays of size 2 to create sorted subarrays of size 4
  for (let currSize=1; currSize<=endIndex; currSize*=2) {
    // starting index of different subarray to be merged
    for (let leftIndex=0; leftIndex<endIndex; leftIndex+=2*currSize) {
      // Find ending point of left subarray
      // mid+1 is starting point of right
      const mid = Math.min(leftIndex + currSize - 1, endIndex);
      const rightEnd = Math.min(leftIndex + 2 * currSize - 1, endIndex);
      merge(data, leftIndex, mid, rightEnd);
    }
  }
}
```
