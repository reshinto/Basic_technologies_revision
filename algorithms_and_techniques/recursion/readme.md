# Recursion
- it is a method that calls itself
  - it can return or can also not return a value
  - the stopping condition is when it hits the `base case`
    - this means that we can no longer grow the number of recursive calls that we are storing in memory
- using ATM Analogy
  1. what is the least amount of work i can do
  2. when would the process complete
  ```javascript
  const getMyPositionInLine = (person) => {
    if (person.nextInLine === null) {
      return 1;  // this is the base case
    }
    return 1 + getMyPositionInLine(person.nextInLine);  // this is the recursive call
  }
  ```
## Pros & Cons of using Recursion
| Pros | Cons |
| ---- | ---- |
| bridges the gap between elegance and complexity | slow due to CPU overhead |
| reduces the need for complex loops and auxiliary data structures | can lead to out of memory errors / stack overflow exceptions |
| can reduce time complexity easily with memoization | can be unnecessarily complex if poorly constructed |
| works really well with recursive structures like trees and graphs | |
  
## Call Stack
### Normal Call Stack without Recursion
- a is dependent on b which is dependent on c
```javascript
function a() {
  return "hello " + b();
}
  
function b() {
  return "my " + c();
}
  
function c() {
  return "friends.";
}
```
```
the following is a call stack
each row is a stack frame
  
when function a is called, the return value is added to the call stack
|----------------|
|                |
|                |
|                |
| "hello " + b() |
|----------------|
  
the return value also calls function b, it gets added to the call stack
|----------------|
|                |
|                |
| "my " + c()    |
| "hello " + b() |
|----------------|
  
the return value also calls function c, it gets added to the call stack
|----------------|
|                |
| "friends."     |
| "my " + c()    |
| "hello " + b() |
|----------------|
  
since return value for this has hit the base case,
it will start executing by poping the top stack frame from the call stack
 
return result: "friends."
|--------------------|
|                    |
|                    |
| "my " + "friends." |
| "hello " + b()     |
|--------------------|
 
return result: "my friends."
|--------------------------|
|                          |
|                          |
|                          |
| "hello " + "my friends." |
|--------------------------|
 
return result: "hello my friends."
|--------------------------|
|                          |
|                          |
|                          |
|                          |
|--------------------------|
```
### Call Stack with Recursion
```javascriot
function a() {
  return a();
}
```
```
   a()
|--a()--|    -> stack overflow when we run out of memory
|  a()  |
|  a()  |
|-------|
```
- the above example illustrates why a base case is required to prevent a stack overflow situation
  - a return value is important to do so
