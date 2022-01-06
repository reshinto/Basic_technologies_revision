# Find All Numbers Disappeared In An Array
```
Given an array nums of n integers where nums[i] is in the range [1, n], 
return an array of all the integers in the range [1, n] that do not appear in nums.

Example 1:
Input: nums = [4,3,2,7,8,2,3,1]
Output: [5,6]

Example 2:
Input: nums = [1,1]
Output: [2]
 
Constraints:
n == nums.length
1 <= n <= 105
1 <= nums[i] <= n
 
Follow up:
Could you do it without extra space and in O(n) runtime?
You may assume the returned list does not count as extra space.
```
## Solution: Keep track of the numbers visited
- use the original array to keep track of the numbers visited
  - Since all the numbers are positive intergers
    - for every number visited
      - we mark the presence of that number by negating the number at the index equal to the current number
      - Since JavaScript follows 0-indexing, the index we mark is the actuall number - 1
      - If the number at that index is already negated we do nothing
    - In the end, we just return the indices (index + 1 for the number) where there are still postive numbers

```javascript
function findDisappearedNumbers(nums) {
  const n = nums.length;
  for (let i=0; i<n; i++) {
    const trackedIndex = Math.abs(nums[i]) - 1;  // get index of current value
    if (nums[trackedIndex] > 0) {  // check if index value has been tracked before
      nums[trackedIndex] *= -1;  // mark value as tracked by making it negative
    }
  }

  const result = [];
  for (let i=0; i<n; i++) {
    if (nums[i] > 0) {
      result.push(i+1);  // value not marked as negative are index numbers not used, add 1 since numbers don't start from 0
    }
  }
  return result;
};
```
```
input: nums = [4, 3, 2, 7, 8, 2, 3, 1]

At iter = 0,
current number: |4| (|.| here refers to taking the absolute value)
number at index = 3 (current number 4 - 1), value = 7 and negate it to -7
After negation: nums = [4, 3, 2, -7, 8, 2, 3, 1]

At iter = 1
current number: |3|
number at index = 2 (current number 3 - 1), value = 2 and negate it to -2
After negation: nums = [4, 3, -2, -7, 8, 2, 3, 1]

At iter = 2
current number: |-2|
number at index = 1 (current number 2 - 1), value = 3 and negate it to -3
After negation: nums = [4, -3, -2, -7, 8, 2, 3, 1]

At iter = 3
current number: |-7|
number at index = 6 (current number 7 - 1), value = 3 and negate it to -3
After negation: nums = [4, -3, -2, -7, 8, 2, -3, 1]

At iter = 4
current number: |8|
number at index = 7 (current number 8 - 1), value = 1 and negate it to -1
After negation: nums = [4, -3, -2, -7, 8, 2, -3, -1]

At iter = 5
current number: |2|
number at index = 1 (current number 2 - 1), value = -3 and stays as -3
Array stays unchanged: nums = [4, -3, -2, -7, 8, 2, -3, -1]

At iter = 6
current number: |-3|
number at index = 2 (current number 3 - 1), value = -2 and stays as -2
Array stays unchanged: nums = [4, -3, -2, -7, 8, 2, -3, -1]

At iter = 7
current number: |-1|
number at index = 0 (current number 1 - 1), value = 4 and negate it to -4
After negation: nums = [-4, -3, -2, -7, 8, 2, -3, -1]

Now the indices at which there are still positive numbers are the numbers (index+1) that weren't present in the array

at value 8, index is 4 + 1 = 5
at value 2, index is 5 + 1 = 6
output: [5, 6]
```
