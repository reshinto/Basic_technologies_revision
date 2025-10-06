# JavaScript Example

## Violate DRY

```js
let drinks = ["lemonade", "soda", "tea", "water"];
let food = ["beans", "chicken", "rice"];

console.log(drinks[0]);
console.log(drinks[1]);
console.log(drinks[2]);
console.log(drinks[3]);

console.log(food[0]);
console.log(food[1]);
console.log(food[2]);
```

## Pass DRY

```js
let drinks = ["lemonade", "soda", "tea", "water"];
let food = ["beans", "chicken", "rice"];

function logItems(array) {
  for (let i = 0; i < array.length; i++) {
    console.log(array[i]);
  }
}

logItems(drinks);
logItems(food);
```
