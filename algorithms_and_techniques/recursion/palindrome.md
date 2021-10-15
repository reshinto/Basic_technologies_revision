# Palindrome
```
words that can be spelled forward and backwards

input: kayak
output: kayak
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function isPalindrome(input) {
  if (input.length === 0 || input.length === 1) {
    return true;
  }
  if (input[0] === input[input.length - 1]) {
    return isPalindrome(input.slice(1, input.length - 1));
  }
  return false;
}
```
```
input: "racecar"

current input is "racecar"
when function is called, the return value is added to the call stack
|-----------------------|
| isPalindrome("aceca") |
|-----------------------|

move to the next recursion call
current input is "aceca"
when function is called, the return value is added to the call stack
|-----------------------|
|  isPalindrome("cec")  |
| isPalindrome("aceca") |
|-----------------------|

move to the next recursion call
current input is "cec"
when function is called, the return value is added to the call stack
|-----------------------|
|   isPalindrome("e")   |
|  isPalindrome("cec")  |
| isPalindrome("aceca") |
|-----------------------|

move to the next recursion call
current input is "e"
since return value for this has hit the base case,
it will start executing by poping the top stack frame from the call stack

return result: true
|-----------------------|
|         true          |
|  isPalindrome("cec")  |
| isPalindrome("aceca") |
|-----------------------|

return result: true
|-----------------------|
|                       |
|         true          |
| isPalindrome("aceca") |
|-----------------------|

return result: true
|-----------------------|
|                       |
|                       |
|         true          |
|-----------------------|

return result: true
|-----------------------|
|                       |
|                       |
|                       |
|-----------------------|
```
### Iterative solution
```javascript
function isPalindrome(input) {
  const midIndex = Math.ceil(input.length / 2);
  for (let i=0; i<midIndex; i++) {
    if (input[0 + i] !== input[input.length - 1 - i]) {
      return false
    }
  }
  return true;
}
```
