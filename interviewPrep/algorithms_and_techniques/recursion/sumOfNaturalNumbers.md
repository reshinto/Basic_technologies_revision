# Sum of natural numbers
- positive integers that start from 1 onwards
```
input: 10
output: 1 + 2 + 3 + 4 + 5 + 6 + 7 + 8 + 9 + 10 = 55
```
- before working on the recursion, need to think about the following
  - What is the base case / stopping condition?
- What is the smallest amount of work I can do in each iteration?
```javascript
function recursiveSummation(inputNum) {
  if (inputNum <= 1) return inputNum;
  return inputNum + recursiveSummation(inputNum - 1);
}
```
```
input: 10

current input is 10
when function is called, the return value is added to the call stack
|----------------------------|
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 9
when function is called, the return value is added to the call stack

|----------------------------|
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 8
when function is called, the return value is added to the call stack

|----------------------------|
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 7
when function is called, the return value is added to the call stack

|----------------------------|
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 6
when function is called, the return value is added to the call stack

|----------------------------|
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 5
when function is called, the return value is added to the call stack

|----------------------------|
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 4
when function is called, the return value is added to the call stack

|----------------------------|
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 3
when function is called, the return value is added to the call stack

|----------------------------|
|  3 + recursiveSummation(2) |
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 2
when function is called, the return value is added to the call stack

|----------------------------|
|  2 + recursiveSummation(1) |
|  3 + recursiveSummation(2) |
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

move to the next recursion call
current input is 1
since return value for this has hit the base case,
it will start executing by poping the top stack frame from the call stack

|----------------------------|
|  1                         |
|  2 + recursiveSummation(1) |
|  3 + recursiveSummation(2) |
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 1
|----------------------------|
|  2 + 1                     |
|  3 + recursiveSummation(2) |
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 3
|----------------------------|
|  3 + 3                     |
|  4 + recursiveSummation(3) |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 6
|----------------------------|
|  4 + 6                     |
|  5 + recursiveSummation(4) |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 10
|----------------------------|
|  5 + 10                    |
|  6 + recursiveSummation(5) |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 15
|----------------------------|
|  6 + 15                    |
|  7 + recursiveSummation(6) |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 21
|----------------------------|
|  7 + 21                    |
|  8 + recursiveSummation(7) |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 28
|----------------------------|
|  8 + 28                    |
|  9 + recursiveSummation(8) |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 36
|----------------------------|
|  9 + 36                    |
| 10 + recursiveSummation(9) |
|----------------------------|

return result: 45
|----------------------------|
| 10 + 45                    |
|----------------------------|

return result: 55
|----------------------------|
|                            |
|----------------------------|
```
## Iterative solution
```javascript
function recursiveSummation(inputNum) {
  let sum = 0;
  for (let i=0; i<inputNum; i++) {
    sum += inputNum - i;
  }
  return sum;
}
```
