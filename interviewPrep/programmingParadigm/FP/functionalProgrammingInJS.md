# Functional Programming in JavaScript

## Functional concepts in JavaScript

- Based on the concepts of FP let's see if we can say that JS is implementing a functional programming paradigm

### Immutability concept

- JavaScript has built-in methods which follow this rule
  - For example, filter, reduce, map
- example: array mutation

  - not a functional approach

  ```ts
  const fruit = ["banana", "orange"];
  fruit.push("kiwi");

  console.log(fruit); // ["banana", "orange", "kiwi"]
  ```

- example: immutable array

  - a functional approach

  ```ts
  const fruit = ["banana", "orange"];
  const newFruit = [...fruit, "kiwi"];

  console.log(fruit); // ["banana", "orange"]
  console.log(newFruit); // ["banana", "orange", "kiwi"]
  ```

### No Shared State concept

- In order to avoid a shared state in JS
  - you can use such a library like Redux, any other similar library, or all suggested approaches in the How to avoid shared state part could be used

### Composition concept

- The main idea of inheritance is to make code more reusable
- With the functional way, we can do it without inheritance by using the composition of small functions
- It has some advantages over inheritance
  - it is more flexible, does not require thinking in advance, and is easier to test

## Functional possibilities in JavaScript

- First class function is implemented in JS, so we can use it for our purpose
- example: functions are called one by one

  - not a functional approach

  ```ts
  const foo = (a, b) => a + b;
  const buzz = (c) => console.log(c);
  const res = foo(4, 5);
  buzz(res);
  ```

- example: passing function as an argument

  - a functional approach

  ```ts
  const foo = (a, b) => a + b;
  const buzz = (c) => console.log(c);
  buzz(foo(4, 5));
  ```

- Currying is a technique that has to be supported in the language

  - So functions with more than one argument can be divided into several functions with one argument

- JavaScript follows all functional rules, but also includes OOP principles
  - thus it is both a FP and OOP
  - can combine the best features of both approaches in order to achieve good results

## Widespread functional JavaScript libraries

### Ramda

- The library is designed specifically for a functional programming style
- one that makes it easy to create functional pipelines, one that never mutates user data
- Ramda includes all of the favorite list-manipulation functions you expect
  - e.g. map, filter, reduce, find, etc.
- Ramda methods are automatically curried
  - For example, The function multiply returns another function, remembers the first arguments, and multiplies the first argument with the second one
- example

  ```ts
  const double = R.multiply(2);
  double(3); // 6
  ```

### Lodash

- The lodash/fp module promotes more functional programming (FP) friendly style by exporting an instance of lodash with its methods wrapped to produce immutable auto-curried iteratee-first data-last methods
- Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers, objects, strings, etc.
- Lodash modular methods are great for:
  - Iterating arrays, objects, & strings
  - Manipulating & testing values
  - Creating composite functions
- example: array filtering

  ```ts
  var users = [
    {user: "barney", age: 36, active: true},
    {user: "fred", age: 40, active: false},
  ];

  _.filter(users, function (o) {
    return !o.active;
  }); // [{ user: "fred", age: 40, active: false }]
  ```

## Pros and Cons of Functional Programming

- PROS
  - No side effects (if they are not necessary)
    - because we are following the immutability principle
  - Pure functions are easier to understand because they depend only on the given input and don't change any states
    - With the same input, they always give the same output
    - Their function signature gives all the information about them
  - The ability of functional programming languages to treat functions as values and pass them to functions as parameters make the code more readable and easily understandable
  - Testing and debugging are easier
    - Since pure functions take only arguments and produce output, they don't produce any changes don't take input, or produce some hidden output
    - They use immutable values, so it becomes easier to check some problems in programs written using pure functions
  - It is used to implement concurrency / parallelism because pure functions don't change variables or any other data outside it
  - It adopts lazy evaluation which avoids repeated evaluation because the value is evaluated and stored only when it is needed
- CONS
  - The readability can be reduced by a lot of pure functions
  - Loss of performance could take place, because of the immutability principle
