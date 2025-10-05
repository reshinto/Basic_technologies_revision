# Sorting: Warm Up
## Isomorphic String
```
Given two strings, determine if they are isomorphic.
Two strings are "isomorphic" if each unique character from the first string can be replaced to match the second string,
without changing the ordering of the characters.

Different characters must map to different characters, but a character can map to itself.

Input
  str1: the first string.
  str2: the second string.
Output
  Whether if these two strings are isomorphic.

Example 1:
  Input:
    str1 = "egg"
    str2 = "all"
  
  Output: true
  
  Explanation:
    "e" can be replaced with "a" and "g" can be replaced with "l".
    Therefore, the strings are isomorphic.

Example 2:
  Input:
    str1 = "wow"
    str2 = "aaa"
  
  Output: false
  
  Explanation:
    "w" and "o" both maps to "a", which makes them not isomorphic.

Constraints
  1 <= len(str_1), len(str_2) <= 5 * 10^4
  The strings are case sensitive and consists of valid ASCII characters.
```
```javascript
function isIsomorphic(str1, str2) {
  const mapping = {};
  const used = {};
  if (str1.length !== str2.length) return false;
  
  for (let i=0; i<str1.length; i++) {
    const aChar = str1[i];
    const bChar = str2[i];
    if (mapping[aChar]) {
      if (mapping[aChar] !== bChar) return false;
    } else {
      if (used[bChar]) return false;
      mapping[aChar] = bChar;
      used[bChar] = true;
    }
  }
  return true;
}
```
### Explanation
- This problem is meant to demonstrate solving a problem using multiple data structures
  - a map for storing mappings and a set to record existence.
- There are two conditions to meet:
  1. Each character from the first string only matches one character from the second string.
      - For example, 'aba' and 'cde' are not isomorphic because 'a' from the first string matches 'c' in position 0 of the second string but also matches 'e' in position 2.
      - This is relatively easy to check, we can traverse both strings and construct a mapping of character from the first string to the second one.
      - If we run into a character from the first string that we have seen before, we check in the mapping and see if the character in the second string is the same.
      - If not, we have found an inconsistency and return false.
  2. No two characters from the first string maps to the same character in the second string.
      - Example 2 in the description is one such example.
      - To check this, we need to know which characters from the second string have already been matched as we traverse the strings.
      - We can use a set to record it.
- The time complexity is `O(n)`
  - where n is the size of the strings.
