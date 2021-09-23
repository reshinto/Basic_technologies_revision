# Asynchronous
## JavaScript / NodeJS
### Promises
- Use promises whenever you are using asynchronous or blocking code
- resolve maps to then and reject maps to catch for all practical purposes
- Make sure to write both .catch and .then methods for all the promises
- If something needs to be done in both cases use finally
- We only get one shot at mutating each promise
- We can add multiple handlers to a single promise
- The return type of all the methods in the Promise object, regardless of whether they are static methods or prototype methods, is again
a Promise
- In Promise.all, the order of the promises are maintained in the values variable, irrespective of which promise was first resolved

### Async
- async functions return a promise
- async functions use an implicit Promise to return results
  - Even if you don’t return a promise explicitly, the async function makes sure that your code is passed through a promise
- await blocks the code execution within the async function, of which it (await statement) is a part
- There can be multiple await statements within a single async function
- When using async await, make sure you use try catch for error handling
- Be extra careful when using await within loops and iterators
  - You might fall into the trap of writing sequentially-executing code when it could have been easily done in parallel
- await is always for a single Promise
- Promise creation starts the execution of asynchronous functionality
- await only blocks the code execution within the async function
  - It only makes sure that the next line is executed when the promise resolves
  - So, if an asynchronous activity has already started, await will not have any effect on it
#### async library
```npm i async```
```javascript
async.map(["foo.txt", "bar.txt"], fs.stat, (error, results) => {
  console.log(results);
});
```
```javascript
async.parallel([
  (callback) => { setTimeout(callback, 1000); },
  (callback) => { setTimeout(callback, 1000); }
], (error, results) => { console.log("I took 2 seconds."); });
```
```javascript
async.waterfall([
  (callback) => { setTimeout(callback, 1000); },
  (callback) => { setTimeout(callback, 1000); }
], (error, results) => { console.log("I took 2 seconds."); });
```
