# Validate Subsequence

Given two non-empty arrays of integers, write a function that determines
whether the second array is a subsequence of the first one.

A subsequence of an array is a set of numbers that aren't necessarily adjacent
in the array but that are in the same order as they appear in the array. For
instance, the numbers `[1, 3, 4]` form a subsequence of the array `[1, 2, 3, 4]`
, and so do the numbers `[2, 4]`.
Note that a single number in an array and the array itself are both valid
subsequences of the array.

Sample Input
`array = [5, 1, 22, 25, 6, -1, 8, 10]`
`sequence = [1, 6, -1, 10]`

Sample Output
true

```python
# Solution 1
def isValidSubsequence(array, sequence):
  # Write your code here.
  j = 0
  sequenceLength = len(sequence)
  for v in array:
    if j == sequenceLength:
      break
    if v in sequence and sequence[j] == v:
      j += 1
  return j == sequenceLength
```

```javascript
function isValidSubsequence(array, sequence) {
  // Write your code here.
  let seqIdx = 0;
  for (let i = 0; i < array.length; i++) {
    if (seqIdx === sequence.length) break;
    if (array[i] === sequence[seqIdx]) seqIdx++;
  }
  return seqIdx === sequence.length;
}
```
