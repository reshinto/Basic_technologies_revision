# Keep It Simple, Stupid (KISS)

- During our everyday coding, things tend to get a bit messy quite quickly
  - Adding more code to the codebase means more mess added
  - And the end story is a hell no one want to witness, if the coding pattern was not clean and well planned from the beginning
- But, maintaining a few simple patterns can make the whole experience a lot better
- it is a design principal which states that most systems work best if they are kept simple rather than made overly complicated
  - KISS is used in a variety of disciplines, such as interface design, product design, and software development

## Why KISS?

- Less code takes less time to write, minimizes the amount of bugs, and is easier to modify and maintain
- The more complex something is, the more ways there are for it to fail, and the more difficult it is to explain to someone else who needs to understand it
- Perfection is reached not when there is nothing left to add, but when there is nothing left to take away

## Short-circuit Evaluation

### Bad example

```js
if (var1 === null || var1 === undefined || var1 === "") {
  console.log("VARIABLE NOT FOUND!");
} else {
  console.log(var1);
}
```

### Good examples

```js
console.log(var1 || "VARIABLE NOT FOUND!");
```

```js
const firstName = person && person.firstNames;
```

## Default parameters

### Bad example

```js
function volume(l, w, h) {
  if (w === undefined) w = 1;
  if (h === undefined) h = 1;
  return l * w * h;
}
```

### Good example

```js
const volume = (l, w = 1, h = 1) => l * w * h;
```

## Destructuring

### Bad example

```js
const person = {
  first: "Wes",
  last: "Bos",
  country: "Canada",
  city: "Hamilton",
  twitter: "@wesbos",
};
const first = person.first;
const last = person.last;
```

### Good example

```js
let {first, last} = person;
```

#### set default value if value does not exist

```js
let {first = "John", last = "Doe"} = person;
```

#### rename property

```js
let {first, last: surname} = person;
```

## Spreading

### Bad example

```js
const even = [2, 4, 6];
const nums = [10, 12, 16].concat(even); // 10,12,16,2,4,5
```

### Good example

```js
const even = [2, 4, 6];
const nums = [10, 12, 16, ...even];
```
