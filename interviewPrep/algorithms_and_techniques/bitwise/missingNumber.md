# Missing Number
```
Given an array nums containing n distinct numbers in the range [0, n],
return the only number in the range that is missing from the array.

Example 1:
Input: nums = [3,0,1]
Output: 2
Explanation: n = 3 since there are 3 numbers, so all numbers are in the range [0,3].
2 is the missing number in the range since it does not appear in nums.

Example 2:
Input: nums = [0,1]
Output: 2
Explanation: n = 2 since there are 2 numbers, so all numbers are in the range [0,2].
2 is the missing number in the range since it does not appear in nums.

Example 3:
Input: nums = [9,6,4,2,3,5,7,0,1]
Output: 8
Explanation: n = 9 since there are 9 numbers, so all numbers are in the range [0,9].
8 is the missing number in the range since it does not appear in nums.
 
Constraints:
n == nums.length
1 <= n <= 104
0 <= nums[i] <= n
All the numbers of nums are unique.
 
Follow up: Could you implement a solution using only O(1) extra space complexity and O(n) runtime complexity?
```
## 3 ways of solving this problem
### XOR (simple, O(n) time and O(1) space)
|A|B|result|
|-|-|-|
|0|0|0|
|0|1|1|
|1|0|1|
|1|1|0|

```javascript
function missingNum(nums) {
  const n = nums.length;
  let res = 0;

  for (let i=0; i<n; i++) {
    res ^= i ^ nums[i];  // xor number from range and xor number from array element value
  }
  res ^= n;  // xor the last range value
  return res;
}
```
```
input: [3, 0, 1]

this will give the following:
initial value ^ range value ^ array element value
      0       ^       0     ^         3               | when res = 0, i = 0, nums[0] = 3
              ^       1     ^         0               | when res = 3, i = 1, nums[0] = 0
              ^       2     ^         1               | when res = 2, i = 2, nums[0] = 3
              ^       3                               | when res = 1, n = 3
              
which is the same as 0 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3

since A ^ A = 0, we can remove numbers that have 1 duplicate resulting in the following:

initial: 0 ^ 0 ^ 3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3
step 1: 3 ^ 1 ^ 0 ^ 2 ^ 1 ^ 3
step 2: 1 ^ 0 ^ 2 ^ 1
step 3: 0 ^ 2
any value that xor with 0 gives you back that value (A ^ 0 = A)

therefore, the missing number is 2
```

### SUM
#### formula: missing number = `sum of numbers from range - sum of all actual numbers in array`
#### find total sum mathematical formula = `(n * (n + 1)) / 2`
```javascript
function missingNum(nums) {
  let sum = 0;
  for (let i=0; i<nums.length; i++) {
    sum += i - nums[i];  // adds number from range and minus number from array element value
  }
  sum += nums.length;  // adds the last number from range
  return sum;
}
```
### Binary Search (good only if array is already sorted)
```javascript
function missingNum(nums) {
  let left = 0;
  let right = nums.length;
  let mid = Math.floor((left + right) / 2);

  while (left < right) {
    mid = Math.floor((left + right) / 2);
    if (nums[mid] > mid) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}
```
```
input: [0, 1, 2, 3, 4, 5, 6, 7, 9]

initial left is 0, right is 9, mid is 4
nums[4] is 4 and is not more than mid 4,
therefore left is changed to 4 + 1 = 5

when left is 5, right is 9, mid is 7
nums[7] is 7 and is not more than mid 7,
therefore left is changed to 7 + 1 = 8

when left is 8, right is 9, mid is 8
nums[8] is 9 and is more than mid 8,
therefore right is 8
since left 8 is no longer less than right 8
return left value of 8 as it is the missing number
```
