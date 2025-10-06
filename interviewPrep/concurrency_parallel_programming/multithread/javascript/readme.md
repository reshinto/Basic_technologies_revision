# JavaScript Example

## Single Threaded

### Asynchronous blocking

- can be slow or fast, but will not be faster than non-blocking code

```js
const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/posts/";
const postIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];
const results = [];

async function runTasks() {
  for (const postId of postIds) {
    console.log(`Working on post id ${postId}`);
    const response = await fetch(`${url}${postId}`);
    results.push(await response.json());
  }
}

async function main() {
  console.log("Timer started...");
  const startHrTime = process.hrtime();

  await runTasks();

  console.log(results);

  const elapsedHrTime = process.hrtime(startHrTime);
  const elapsedTimeInMs = elapsedHrTime[0] + "." + elapsedHrTime[1];
  console.log(
    `It took ${elapsedTimeInMs} seconds to make ${postIds.length} API calls`
  );
}

main();
```

### Asynchronous Non-blocking

- almost as fast as parallel programming in other languages

```js
const fetch = require("node-fetch");

const url = "https://jsonplaceholder.typicode.com/posts/";
const postIds = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22,
  23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41,
  42, 43, 44, 45, 46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60,
  61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79,
  80, 81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 91, 92, 93, 94, 95, 96, 97, 98,
  99, 100,
];
const results = [];

async function runTasks() {
  for (const postId of postIds) {
    console.log(`Working on post id ${postId}`);
    results.push(fetch(`${url}${postId}`));
  }
}

async function main() {
  console.log("Timer started...");
  const startHrTime = process.hrtime();

  await runTasks();

  for (const result of results) {
    const response = await result;
    console.log(await response.json());
  }

  const elapsedHrTime = process.hrtime(startHrTime);
  const elapsedTimeInMs = elapsedHrTime[0] + "." + elapsedHrTime[1];
  console.log(
    `It took ${elapsedTimeInMs} seconds to make ${postIds.length} API calls`
  );
}

main();
```
