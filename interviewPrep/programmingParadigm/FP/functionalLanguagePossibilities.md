# Functional Language Possibilities

- to be a functional language, it is not enough to just follow functional principles, language itself has to support some functional possibilities
- a few examples of functional languages: Scala, Clojure, Lisp, Haskell

### When to use functional approach

- in projects where a lot of math and concurrency is required
- example
  - digital signal processing
  - digital image processing
  - data manipulation
  - supply chain projects
  - agricultural projects

## First Class Functions

- a programming language supports first-class functions if it treats functions as first-class citizens
- language supports first-class functions if it
  - can pass functions as parameters to other functions
  - can return them as values from other functions
  - can assign them to variables or can store them in data structures
- storing function in object data structure example

  ```ts
  const example = {
    name: "John",
    getName() {
      return console.log(this.name);
    },
  };
  ```

- the language must implement the feature passing function as a parameter
- It is not a functional concept, and it is a language possibility
  - By using this feature we can follow another functional concept such as higher order function (HOF)

### Higher Order Function

- it is any function that takes a function as an argument, returns a function, or both
- it is often used to:
  - Abstract or isolate actions, effects, or async flow control using callback functions, promises, monads, etc.
  - Create utilities that can act on a wide variety of data types
  - Partially apply a function to its arguments or create a curried function for the purpose of reuse or function composition
  - Take a list of functions and return some composition of those input functions
- example

  ```ts
  const consoleValue = (value) => console.log(value); // (1)
  const logPowerOfTwo = (logFn, value) => logFn(value * value); // (2)

  logPowerOfTwo(consoleValue, 5); // 25 (3)
  ```

## Currying

- it is a technique that converts function with more than one parameter into the chain of functions with one argument
- In a math way, it is a process of transforming function with multiple arities in functions with less (usually one) arity
  - Arity: number of function's arguments
- it is not something that you have to use every time, it is something that is useful in certain situations
  - For example, if you need to call the same function with some of the same parameters a lot
  - This function can be divided into smaller ones and some of them can be called when needed
- For example, currying a function foo that takes three arguments creates three functions

  - usual syntax

    ```ts
    const foo = (a, b, c) => a + b + c;

    foo(1, 2, 3); // 6
    ```

  - currying version 1

    ```ts
    const curryingSum = (a) => (b) => (c) => a + b + c;

    curryingSum(1)(2)(3); // 6
    ```

  - currying version 2

    ```ts
    const curryingSum = function (a) {
      return function (b) {
        return function (c) {
          return a + b + c;
        };
      };
    };

    curryingSum(1)(2)(3); // 6
    ```
