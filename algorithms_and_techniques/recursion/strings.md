# Recursion with strings
```
The recursive function needs to reverse a string

input: the simple engineer
output: reenigne elpmis eht
```
- before working on the recursion, need to think about the following
  - What is the base case?
    - in another words, when can i no longer continue?
      - in this case, the empty string is the base case
  - What is the smallest amount of work I can do in each iteration?
    - in another words, between each invocation, what's the small unit i can reverse?
```javascript
function reverseString(input) {
  if (input === "") return "";  // base case
  return reverseString(input.slice(1)) + input[0];
}
```
```
input: "hello"

current input is "hello"
when function is called, the return value is added to the call stack
|-----------------------------|
| reverseString("ello") + "h" |
|-----------------------------|

move to the next recursion call
current input is "ello"
when function is called, the return value is added to the call stack
|-----------------------------|
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

move to the next recursion call
current input is "llo"
when function is called, the return value is added to the call stack
|-----------------------------|
| reverseString("lo") + "l"   |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

move to the next recursion call
current input is "lo"
when function is called, the return value is added to the call stack
|-----------------------------|
| reverseString("o") + "l"    |
| reverseString("lo") + "l"   |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

move to the next recursion call
current input is "o"
when function is called, the return value is added to the call stack
|-----------------------------|
| reverseString("") + "o"     |
| reverseString("o") + "l"    |
| reverseString("lo") + "l"   |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

move to the next recursion call
current input is ""
since return value for this has hit the base case,
it will start executing by poping the top stack frame from the call stack

return result: ""
|-----------------------------|
| "" + "o"                    |
| reverseString("o") + "l"    |
| reverseString("lo") + "l"   |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

return result: "o"
|-----------------------------|
|                             |
| "o" + "l"                   |
| reverseString("lo") + "l"   |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

return result: "ol"
|-----------------------------|
|                             |
|                             |
| "ol" + "l"                  |
| reverseString("llo") + "e"  |
| reverseString("ello") + "h" |
|-----------------------------|

return result: "oll"
|-----------------------------|
|                             |
|                             |
|                             |
| "oll" + "e"                 |
| reverseString("ello") + "h" |
|-----------------------------|

return result: "olle"
|-----------------------------|
|                             |
|                             |
|                             |
|                             |
| "olle" + "h"                |
|-----------------------------|

return result: "olleh"
|-----------------------------|
|                             |
|                             |
|                             |
|                             |
|                             |
|-----------------------------|
```
### Iterative solution
```javascript
function reverseString(input) {
  const midIndex = Math.ceil(input.length / 2);
  const strArr = input.split("");
  for (let i=0; i<midIndex; i++) {
    [strArr[0+i], strArr[strArr.length - 1 - i]] = [strArr[strArr.length - 1 - i], strArr[0 + i]];
  }
  return strArr.join("");
}
```
