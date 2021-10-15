# Decimal To Binary
```
Convert decimal base 10 values to binary base 2 values

input: 233
output: 1110 1001

round down
233 / 2 = 116, 233 % 2 = 1 remainder
116 / 2 = 58, 116 % 2 = 0 remainder
58 / 2 = 29, 58 % 2 = 0 remainder
29 / 2 = 14, 29 % 2 = 1 remainder
14 / 2 = 7, 14 % 2 = 0 remainder
7 / 2 = 3, 7 % 2 = 1 remainder
3 / 2 = 1, 3 % 2 = 1 remainder
1 / 2 = 0, 1 % 2 = 1 remainder  (result is 0, this is the base case)
...
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function findBinary(decimal, result="") {
  if (decimal === 0) {
    return result;
  }
  result = decimal % 2 + result;
  return findBinary(Math.floor(decimal / 2), result);  // returns a string value
}
```
```
input: 233

current input is 233
when function is called, the return value is added to the call stack
|----------------------|
| findBinary(116, "1") |
|----------------------|

move to the next recursion call
current input is 116
when function is called, the return value is added to the call stack

|----------------------|
| findBinary(58, "01") |
| findBinary(116, "1") |
|----------------------|

move to the next recursion call
current input is 58
when function is called, the return value is added to the call stack

|-----------------------|
| findBinary(29, "001") |
| findBinary(58, "01")  |
| findBinary(116, "1")  |
|-----------------------|

move to the next recursion call
current input is 29
when function is called, the return value is added to the call stack

|------------------------|
| findBinary(14, "1001") |
| findBinary(29, "001")  |
| findBinary(58, "01")   |
| findBinary(116, "1")   |
|------------------------|

move to the next recursion call
current input is 14
when function is called, the return value is added to the call stack

|------------------------|
| findBinary(7, "01001") |
| findBinary(14, "1001") |
| findBinary(29, "001")  |
| findBinary(58, "01")   |
| findBinary(116, "1")   |
|------------------------|

move to the next recursion call
current input is 7
when function is called, the return value is added to the call stack

|-------------------------|
| findBinary(3, "101001") |
| findBinary(7, "01001")  |
| findBinary(14, "1001")  |
| findBinary(29, "001")   |
| findBinary(58, "01")    |
| findBinary(116, "1")    |
|-------------------------|

move to the next recursion call
current input is 3
when function is called, the return value is added to the call stack

|--------------------------|
| findBinary(1, "1101001") |
| findBinary(3, "101001")  |
| findBinary(7, "01001")   |
| findBinary(14, "1001")   |
| findBinary(29, "001")    |
| findBinary(58, "01")     |
| findBinary(116, "1")     |
|--------------------------|

move to the next recursion call
current input is 1
when function is called, the return value is added to the call stack

|---------------------------|
| findBinary(0, "11101001") |
| findBinary(1, "1101001")  |
| findBinary(3, "101001")   |
| findBinary(7, "01001")    |
| findBinary(14, "1001")    |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

move to the next recursion call
current input is 0
since return value for this has hit the base case,
it will start executing by poping the top stack frame from the call stack

return result: "11101001"
|---------------------------|
| "11101001"                |
| findBinary(1, "1101001")  |
| findBinary(3, "101001")   |
| findBinary(7, "01001")    |
| findBinary(14, "1001")    |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
| "11101001"                |
| findBinary(3, "101001")   |
| findBinary(7, "01001")    |
| findBinary(14, "1001")    |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
| "11101001"                |
| findBinary(7, "01001")    |
| findBinary(14, "1001")    |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
| "11101001"                |
| findBinary(14, "1001")    |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
|                           |
| "11101001"                |
| findBinary(29, "001")     |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
|                           |
|                           |
| "11101001"                |
| findBinary(58, "01")      |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
| "11101001"                |
| findBinary(116, "1")      |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
| "11101001"                |
|---------------------------|

return result: "11101001"
|---------------------------|
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|                           |
|---------------------------|
```
