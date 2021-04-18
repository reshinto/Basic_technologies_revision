# Palindrome Check

  Write a function that takes in a non-empty string and that returns a boolean
  representing whether the string is a palindrome.
  
  A palindrome is defined as a string that's written the same forward and
  backward. Note that single-character strings are palindromes.
  
  Sample Input
  ```string = "abcdcba"```
  Sample Output
  true
```python
def isPalindrome(string):
    # Write your code here.
    lastIdx = len(string) - 1
  for i in range(len(string)):
    if lastIdx <= i:
      return True
    if string[i] != string[lastIdx]:
      return False
    else:
      lastIdx -= 1
```
```javascript
function isPalindrome(string) {
  // Write your code here.
  let lastIdx = string.length - 1;
  for (let i=0; i<string.length; i++) {
    if (lastIdx <= i) {
      return true;
    }
    if (string[i] !== string[lastIdx]) {
      return false;
    } else {
      lastIdx--;
    }
  }
}
```
