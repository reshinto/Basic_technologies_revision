# Sorting: Warm Up
## Group Anagrams
```
Given a list of strings, return a list of string lists that groups all anagrams together.
Two strings are anagrams if rearranging one string results in another.
For the purpose of this question, a string is an anagram of itself.

Each group of anagrams should be in alphabetical order.
The output should be in alphabetical order by the first elements of each group of anagrams.

Input
  strs: a list of strings.
Output
  A list of string lists representing the grouped anagrams.

Example 1:
  Input:
    strs = ["eat" ,"tea", "tan", "ate", "nat", "bat"]
  Output: [["ate", "eat", "tea"], ["bat"], ["nat", "tan"]]

Constraints
  1 <= len(strs) <= 10^4
  1 <= len(strs[i]) <= 100
  Each word in the input consists of lowercase English letters, and they might not be unique.
```
```javascript
function groupAnagrams(strs) {
  const anagramMap = {};
  for (const entry of strs) {
    const anagramId = entry.split("").sort().join("");
    if (anagramMap[anagramId]) anagramMap[anagramId].push(entry);
    else anagramMap[anagramId] = [entry];
  }
  return Object.values(anagramMap);
}
```
### Explanation
- For this problem, consider what happens when two strings are anagrams:
  - if we sort them both by character, then they will result in the same string.
  - When two strings are not anagrams, then this value will always be different.
- In that case, we can use a hashmap to store the information, with the key being the "anagram ID" (the sorted value of the string)
  - and the entry being a list of strings with the same anagram IDs.
  - Everything under the same ID must be anagrams, while everything outside of it are not.
- time complexity of `O(n * mlog(m))`
  - where n is the number of strings and m is the max size of each string.
