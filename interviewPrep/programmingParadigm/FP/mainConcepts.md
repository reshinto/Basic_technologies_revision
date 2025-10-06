# Main Concepts

## Immutability

- The main rule of an immutable object is it cannot be modified after creation
- Conversely, a mutable object is each object which can be modified after creation
- The data flow in the program is lossy if the immutability principle is not followed
  - that is why it is the main concept of functional programming
- example: if data is mutated some bugs which are hard to find can be hidden

  - version 1

    ```ts
    const stat = [
      {name: "John", score: 1.003},
      {name: "Lora", score: 2},
      {name: "Max", score: 3.76},
    ];

    // expecting to create a new array, but contents in array got modified instead
    // this is because inside the stat, item got modified
    const statScoreInt = stat.map((el) => {
      el.score = Math.floor(el.score);
      el.name = el.name;

      return el;
    });

    console.log(stat); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
    console.log(statScoreInt); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
    ```

  - version 2

    ```ts
    const stat = [
      {name: "John", score: 1.003},
      {name: "Lora", score: 2},
      {name: "Max", score: 3.76},
    ];

    // new copied array got created as expected
    const statScoreInt = stat.map((el) => {
      return {score: Math.floor(el.score), ...el};
    });

    console.log(stat); // [{ name: "John", score: 1.003 }, { name: "Lora", score: 2 }, { name: "Max", score: 3.76 }]
    console.log(statScoreInt); // [{ name: "John", score: 1 }, { name: "Lora", score: 2 }, { name: "Max", score: 3 }]
    ```

- In JavaScript, it might be easy to confuse const with immutability
  - The variable which cannot be redeclared is created by using `const` but immutable objects are not created by const
  - You can't change the object that the binding refers to, but you can still change the properties of the object
    - which means that bindings created with const are mutable
- Immutable objects can't be changed at all
  - You can make a value truly immutable by `deep-freezing` the object
  - JavaScript has a method that freezes an object one-level deep (in order to freeze an object deeply, recursion could be used to freeze each property and nested objects)
- example

  - There are several libraries in JavaScript which try to follow this principle, for example, Immutable.js

  ```ts
  const a = Object.freeze({
    greeting: "Hello",
    subject: "student",
    mark: "!",
  });

  a.greeting = "Goodbye";
  // Error: Cannot assign to read only property 'foo' of object Object
  ```

### Side Effects

- it is a side effect
  - if state changes are observable outside the called function
  - they are not returned value of the function
- Side effects include:
  - Modifying any external variable or object property
    - e.g., a global variable, or a variable in the parent function scope chain
  - Logging to the console
  - Alert
  - Writing to the screen, in other words, replacing the content of a specific tag
    - querySelector(), getElementById(), etc.
  - Writing to a file
  - The HTTP request might have side effects
    - therefore the function that triggers the request transitively have side effects
  - Triggering any external process
  - Calling any other functions with side effects
- In functional programming side effects are mostly avoided
  - It makes a program much easier to understand, and much easier to test
- a program without side effects does nothing
  - If the code does not write to or read from a database, does not make any requests, does not change UI, etc.
    - it does not bring any value
    - So we cannot completely avoid side effects
- to isolate side effects from the rest of your software
  - by keeping side effects separately from the rest of the software
    - the application will be much easier to extend, refactor, debug, test, and maintain
- That is why a lot of front-end frameworks suggest using state management tools along with the library
  - Because it separates components rendering from state management
  - they are loosely coupled modules
  - ReactJS and Redux are examples of that

### Pure Functions

- A function is called pure if it has the following properties:
  - Given the same input, always returns the same output
  - Function without side effects
- A pure function also can be called a deterministic function
- JS arrays methods such as
  - map, filter, reduce etc., are examples of pure function
- A pure function does not depend on any state, it only depends on input parameters
- example 1: Pure function: no side effect

  - there are no side effects because price comes as an argument

  ```ts
  const doubledPrice = (price) => price * 2;
  doubledPrice(2);
  ```

- example 2: not pure function: have side effect

  - there is a side effect because
    - the price is changed inside the function, but price is declared outside the doubledPrice scope

  ```ts
  let price = 2;
  const doubledPrice = () => (price = price * 2);
  doubledPrice();
  ```

## No Shared State

- `Shared state` is a memory space (could be an object or simple variable) that is reachable from all program parts
  - In other words, it is global and exists in shared scope
  - It also could be passed as a property between scopes
  - If two or more application parts change the same data, then the data is a shared state

### Problems with shared state

- If the state is changing from more than one place in the application
  - there is a risk of one modification preventing another part of the application to work with the actual data
  - So it might lead to strange hard to track bugs
- example

  - Functions `main()` and `minor()` do something and wants to log an `arr`
  - Function `logGrocery()` logs elements into console
    - However, it removes elements from the array while logging them
    - `logGrocery()` breaks `minor()` and that is why there is an undefined

  ```ts
  const arr = ["bread", "milk", "wine"];

  function logGrocery(arr) {
    for (let i = 0; i <= arr.length + 1; i++) {
      console.log(arr.shift());
    }
  }

  function main() {
    // some code
    logGrocery(arr);
  }

  function minor() {
    // some code
    logGrocery(arr);
  }

  main();
  minor();

  // bread
  // milk
  // wine
  // undefined (1)
  ```

### How to avoid it

- We can avoid shared state by copying data
- Until we are reading from a shared state without any modification we are safe
- Before doing some modifications we need to `un-share` our state
- example

  - Functions `main()` and `minor()` do something and wants to log an `arr`
  - Function `logGrocery()` logs elements into console
    - The code creates a new variable `localArray`, a copy of `arr`
    - So the `localArray` is modified, and it is a new declaration on each call
  - Avoiding mutations by updating non-destructively

  ```ts
  const arr = ["bread", "milk", "wine"];

  function logGrocery(arr) {
    const localArr = [...arr]; // important

    for (let i = 0; i <= localArr.length + 1; i++) {
      console.log(localArr.shift());
    }
  }

  function main() {
    // some code
    logGrocery(arr);
  }

  function minor() {
    // some code
    logGrocery(arr);
  }

  main();
  minor();

  // bread
  // milk
  // wine
  // bread
  // milk
  // wine
  ```

- example: Preventing mutations by making data immutable

  - We can prevent mutations of shared data by making that data immutable
    - If data is immutable, it can be shared without any risks
    - In particular, there is no need to copy defensively

  ```ts
  const shoppingList = ["bread", "milk", "wine"];

  function addToShoppingList(arr, item) {
    return [...arr, item];
  }

  function main(item) {
    // some code
    return addToShoppingList(arr, item);
  }

  const withFruit = main("fruit");

  console.log(withFruit); // ['bread', 'milk', 'wine', 'fruit']
  console.log(shoppingList); // ['bread', 'milk', 'wine']
  ```

## Composition

- `Function composition` is a combination of two or more functions
- The single function does a small piece which is not valuable for an application
  - in order to achieve the desired result, small functions have to be combined together
  - can imagine composing functions as pipes of functions that data has to go through, so that outcome is reached
- In functional programming, it is preferable to use composition over inheritance

### Composition over inheritance

- composition is easier in maintenance and for reusability purposes
- It is easy to refactor the code if needed
- Composition is a simple mental model, so there is no need to think in advance of hierarchy, and we can combine all small pieces in the way that we need them to be
- example: combines the power of objects and functional programming

  ```ts
  const dog = (name) => {
    const self = {
      name,
    };

    return self;
  };

  const buddy = dog("Buddy");
  ```

- example 1: using composition

  ```ts
  const canSayHi = (self) => ({
    sayHi: () => console.log(`Hi! I'm ${self.name}`),
  });

  const canEat = () => ({
    eat: (food) => console.log(`Eating ${food}...`),
  });
  ```

  ```ts
  const behaviors = (self) => Object.assign({}, canSayHi(self), canEat());

  const dog = (name) => {
    const self = {
      name,
    };

    const dogBehaviors = (self) => ({
      bark: () => console.log("Ruff!"),
    });

    return Object.assign(self, behaviors(self), dogBehaviors(self));
  };

  const buddy = dog("Buddy");

  buddy.sayHi(); // Hi! I'm Buddy
  buddy.eat("Petfood"); // Eating Petfood...
  buddy.bark(); // Ruff!
  ```

  ```ts
  const cat = (name) => {
    const self = {
      name,
    };

    const catBehaviors = (self) => ({
      meow: () => console.log("Meow!"),
      haveLunch: (food) => {
        self.eat(food);
      },
    });

    return Object.assign(self, catBehaviors(self), canEat());
  };

  const kitty = cat("Kitty");

  kitty.haveLunch("fish"); // Eating fish...
  kitty.meow(); // Meow!
  ```

- example 2: using composition to create a statistic board with the possibility to sort, find all occurrences, and filter by prop

  - `compose` function is a self-invoking function that can take any number of parameters and execute right-to-left
    - in other words, performs right-to-left function composition
      So, you can compose functions the way you need
    - There is a possibility to filter and sort in one part of the application and filter and find in another without any duplication, by composing small reusable parts
  - `self-invoking function` is a nameless (anonymous) function that is invoked immediately after its definition

  ```ts
  const stat = [
    {name: "Lora", score: 1.003},
    {name: "Lora", score: 1.003},
    {name: "Lora", score: 2},
    {name: "Max", score: 3.76},
  ];

  const sort = (arr) => {
    return arr.sort((a, b) => b.score - a.score);
  };

  const filter = (params) => {
    return (arr) => arr.filter((item) => item.name === params);
  };

  const findAll = (params) => {
    return (arr) => arr.filter((item) => item.score === params);
  };

  const compose = (...funcs) => {
    return (arr) => {
      return funcs.reverse().reduce((acc, func) => func(acc), arr);
    };
  };

  console.log(compose(filter("Lora"))(stat)); // [{ name: "Lora", score: 1.003 }, { name: "Lora", score: 1.003 }, { name: "Lora", score: 2 }]
  console.log(compose(findAll(1.003), filter("Lora"))(stat)); // [{ name: "Lora", score: 1.003 }, { name: "Lora", score: 1.003 }]
  console.log(compose(sort, filter("Lora"))(stat)); // [{ name: "Lora",score: 2 }, { name: "Lora",score: 1.003 }, { name: "Lora",score: 1.003 }]
  ```
