# Two Pointers: Opposite Direction
## 3 Sum
```
Given a list of integers,
return a list containing all unique triplets in the list such that the sum of the triplet is zero.
Each triplet must be sorted in ascending order, and the resulting list must be sorted lexicographically.

Parameter
  nums: a list of integers

Result
  A list of triplets containing all unique triplets that sums up to zero, sorted.

Examples
  Example 1
    Input: nums = [-1, 0, 1, 2, -1, -4]

    Output: [[-1, -1, 2], [-1, 0, 1]]

  Example 2
    Input: nums = [1, -1, 2, -2, 3, -3, 4, -4]

    Output: [[-4, 1, 3], [-3, -1, 4], [-3, 1, 2], [-2, -1, 3]]
```
```
input: [-1, 0, 1, 2, -1, -4]

sort input: [-4, -1, -1, 0, 1, 2]
              a   b            c

    2 sum
   |     |
a + b + c = 0
```
- solution 1
```javascript
const twoSum = function(nums, i, results) {
  const target = 0 - nums[i];
  let left = i + 1;
  let right = nums.length - 1;

  while(left < right) {
    const current = nums[left] + nums[right];

    if(current === target) {
      results.add([nums[i], nums[left], nums[right]]);
      left++;
      right--;

      while(left < right && nums[left] === nums[left - 1]) left++;
    } else if(current < target) {
      left++;
    } else right--;
  }
}

function tripletsWithSum0(nums) {
  const results = new Set();
  nums.sort((a,b) => a - b);

  for(let i=0; i<nums.length - 2 && nums[i]<=0; i++) {
    if(i === 0 || nums[i] !== nums[i - 1]) 
      twoSum(nums, i, results)
  }

  return [...results];
}
```
- solution 2
```javascript
function tripletsWithSum0(nums) {
  const result = [];
  nums.sort((a,b) => a - b);

  for (let i=0; i<nums.length; i++) {
    // skip if current element is a duplicate of the previous element
    if (i>0 && nums[i] === nums[i - 1]) {
      continue;
    }
    let left = i + 1;
    let right = nums.length - 1;
    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right];

      if (sum === 0) {
        result.push([nums[i], nums[left], nums[right]]);
        // purpose of the following is just to move a pointer & prevent duplicates, then let the rest of the loop handle the rest
        left++;
        while (nums[left] === nums[left - 1] && left < right) left++;
        /*
        right--;
        while (nums[right] === nums[right + 1] && left < right) right--;
        */
      } else if (sum < 0) {
        left++;
      } else right--;
    }
  }
  return result;
}
```
### Explanation
- This question is very similar to Two Sum Sorted
  - However, there are a few differences
  - The original list is not sorted, so you need to sort it yourself
  - Instead of simply using two pointers doing one pass
    - we need three pointers
      - one normal pointer always going forward
      - and a pair of opposite pointers that gets reset after the first pointer is moved
    - Each cycle, we move the pair of pointers and see if they are in the list
      - If they are, they are a valid pair of pointers
      - If the position of the pair changes, move the slow pointer and reset the position of the pair
- For this question, duplicates are not allowed, and the result must be sorted, so we can do a few things to simplify
  - We use a map to count the multiplicity of the numbers that appeared
    - (If a BST is an option, then use it to reduce the need for sorting)
  - Every time the pair is reset, the left pointer is reset to the position of the first pointer to guarantee sorted order
- Time Complexity: `O(nlog(n))` for sorting + `O(n^2)` = `O(n^2)`
- We have a pointer moving through the list and each step we move through the list another time
