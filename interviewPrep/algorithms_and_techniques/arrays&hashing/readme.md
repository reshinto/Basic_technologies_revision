## Using Hash Tables or Set
```
Contains Duplicate

Given an integer array nums, return true if any value appears at least twice in the array,
and return false if every element is distinct.

Example 1:
Input: nums = [1,2,3,1]
Output: true

Example 2:
Input: nums = [1,2,3,4]
Output: false

Example 3:
Input: nums = [1,1,1,3,3,4,3,2,4,2]
Output: true
 
Constraints:
1 <= nums.length <= 105
-109 <= nums[i] <= 109
```
```javascript
var containsDuplicate1 = function(nums) {
  const hashSet = new Set();
  
  for (const num of nums) {
    if (hashSet.has(num)) {
      return true;
    }
    hashSet.add(num);
  }
  
  return false;
};


var containsDuplicate2 = function(nums) {
  const memo = {};
  
  for (const num of nums) {
    if (memo[num]) {
      return true;
    }
    memo[num] = true;
  }
  
  return false;
};
```
```python
def containsDuplicate1(nums: List[int]) -> bool:
  hashSet = set()

  for num in nums:
    if num in hashSet:
      return True
    hashSet.add(num)

  return False


def containsDuplicate2(nums: List[int]) -> bool:
  memo = {}

  for num in nums:
    if memo.get(num):
      return True
    memo[num] = True
  return False
```
```java
import java.util.Set;
import java.util.HashSet;

class Solution1 {
  public boolean containsDuplicate(int[] nums) {
    Set<Integer> hashSet = new HashSet<>();

    for (int num : nums) {
      if (hashSet.contains(num)) {
        return true;
      }
      hashSet.add(num);
    }

    return false;
  }
}


import java.util.Map;
import java.util.HashMap;

class Solution2 {
  public boolean containsDuplicate(int[] nums) {
    Map<Integer, Boolean> map = new HashMap<>();

    for (int num : nums) {
      if (map.containsKey(num)) {
        return true;
      }

      map.put(num, true);
    }

    return false;
  }
}
```
```
Two Sum

Given an array of integers nums and an integer target,
return indices of the two numbers such that they add up to target.

You may assume that each input would have exactly one solution,
and you may not use the same element twice.

You can return the answer in any order.

Example 1:
Input: nums = [2,7,11,15], target = 9
Output: [0,1]
Explanation: Because nums[0] + nums[1] == 9, we return [0, 1].

Example 2:
Input: nums = [3,2,4], target = 6
Output: [1,2]

Example 3:
Input: nums = [3,3], target = 6
Output: [0,1]

Constraints:
2 <= nums.length <= 104
-109 <= nums[i] <= 109
-109 <= target <= 109
Only one valid answer exists.
```
```javascript
var twoSum = function(nums, target) {
  const memo = {};
  
  for (let i=0; i<nums.length; i++) {
    const v = nums[i];
    const diff = target - v;
    
    if (memo[diff] !== undefined) {
      return [memo[diff], i];
    }
    memo[v] = i;
  }
};
```
```python
def twoSum(nums: List[int], target: int) -> List[int]:
  memo = {}

  for i, v in enumerate(nums):
    diff = target - v

    if memo.get(diff) is not None:
      return [memo.get(diff), i]
    memo[v] = i
```
```java
import java.util.Map;
import java.util.HashMap;

class Solution {
  public int[] twoSum(int[] nums, int target) {
    Map<Integer, Integer> memo = new HashMap<>();

    for (int i=0; i<nums.length; i++) {
      int v = nums[i];
      int diff = target - v;

      if (memo.containsKey(diff)) {
        return new int[] {memo.get(diff), i};
      }
      memo.put(v, i);
    }
    return new int[0];
  }
}
```
## Using Arrays
```
Valid Anagram

Given two strings s and t, return true if t is an anagram of s, and false otherwise.

An Anagram is a word or phrase formed by rearranging the letters of a different word or phrase,
typically using all the original letters exactly once.

Example 1:
Input: s = "anagram", t = "nagaram"
Output: true

Example 2:
Input: s = "rat", t = "car"
Output: false
 
Constraints:
1 <= s.length, t.length <= 5 * 104
s and t consist of lowercase English letters.
```
```javascript
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  
  const noOfLetters = new Array(26).fill(0);
  
  for (let i=0; i<s.length; i++) {
    noOfLetters[s.charCodeAt(i) - "a".charCodeAt()]++;
    noOfLetters[t.charCodeAt(i) - "a".charCodeAt()]--;
  }
  
  for (const num of noOfLetters) {
    if (num !== 0) {
      return false
    }
  }
  
  return true;
};
```
```python
def isAnagram(s: str, t: str) -> bool:
  if len(s) != len(t):
    return False

  no_of_letters = [0 for i in range(26)]

  for i in range(len(s)):
    no_of_letters[ord(s[i]) - ord("a")] += 1
    no_of_letters[ord(t[i]) - ord("a")] -= 1

  for num in no_of_letters:
    if num != 0:
      return False

  return True
```
```java
class Solution {
  public boolean isAnagram(String s, String t) {
    if (s.length() != t.length()) {
      return false;
    }

    int[] noOfLetters = new int[26];

    for (int i=0; i<s.length(); i++) {
      noOfLetters[s.charAt(i) - 'a']++;
      noOfLetters[t.charAt(i) - 'a']--;
    }

    for (int num : noOfLetters) {
      if (num != 0) {
        return false;
      }
    }

    return true;
  }
}
```
