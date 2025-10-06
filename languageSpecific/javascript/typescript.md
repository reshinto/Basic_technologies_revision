# TypeScript

- it is an object-oriented, strongly typed language which is a superset of JavaScript
- it converts code to JavaScript
  - which can be executed anywhere that is JavaScript supported
    - browser, Nodejs, etc.
- developed by Microsoft
- it adds new capabilities to the language
  - Most notable addition are static type definitions
    - Thanks to types, it's possible, for example, to declare what kind of arguments we are expecting and what is returned exactly in our functions or what's the exact shape of the object that we are creating
  - It makes our code more secure and robust by preventing a lot of bugs before code is even shipped
  - it catches problems during writing the code
- TypeScript offers a whole lot of other great mechanisms like interfaces, classes, utility types and so on
  - on bigger projects you can declare your TypeScript compiler configuration in a separate file and granularly adjust how it works, how strict it is and where it stores compiled files

## Installation

> npm i -D typescript

### Run

> npx tsc example.ts

## Syntax

### Basic Types

```ts
let id: number = 5; // not required to define type
let id = 5; // this already defines the type

let company: string = "test";
let isPublished: boolean = true;
let x: any = "hello"; // try not to use the any keyword

let ids: number[] = [1, 2, 3, 4];
let arr: any[] = [1, true, "hello"]; // type format can be anything
let person: [number, string, boolean] = [1, "Brad", true]; // must follow type format and order

type Point = string | number; // works for type but not interface
const p1: Point = 1;

// works for both type and interface
type Point2 = {
  id: number;
  x: number;
};
const p2: Point2 = {
  id: 1,
  x: 2,
};

// dynamic property types, use when you don't know all the property names
type UnknownObject = {
  [k: string]: string;
};
```

### union

```ts
let employee: (string | number)[]; // allow strings and/or numbers in array
```

### enum

```ts
// value starts from 0 by default
enum Direction1 {
  Up,
  Down,
  Left,
  Right,
}

console.log(Direction1.Up); // 0 by default

// set value to start from 1
enum Direction2 {
  Up = 1,
  Down,
  Left,
  Right,
}

console.log(Direction2.Left); // 3

enum Direction3 {
  Up = "Up",
  Down = "Down",
  Left = "Left",
  Right = "Right",
}
```

### Objects

```ts
// method 1
const user1: {
  id: number;
  name: string;
} = {
  id: 1,
  number: "John",
};

// method 2
type User = {
  id: number;
  name: string;
};

const user2: User = {
  id: 1,
  number: "John",
};

// method 3
interface User2 {
  id: number;
  name: string;
}

const user3: User2 = {
  id: 1,
  number: "John",
};
```

### Type Assertion

```ts
// method 1
let id: any = 1;
let customerId = <number>id;

// method 2
let id2: any = 1;
let customerId2 = id as number;
```

### Functions

```ts
function addNum(x: number, y: number): number {
  return x + y;
}

function log(msg: string | number): void {
  console.log(msg);
}
```

### Interface

- can't be used with primitives or unions

```ts
interface Point {
  readonly id: number; // disable value modification, also works for type keyword
  y: number;
  x?: number; // ? enables it to be optional, also works for type keyword
  (x: number, y: number): number;
}

let p2: Point = {
  id: 1,
  y: 2,
};
```

- functions

```ts
interface Add {
  (x: number, y: number): number;
}

const add: Add = (x: number, y: number): number => x + y;
```

### Classes

```ts
// method 1
class Node1 {
  // adding of access modifiers is needed; does not work for javascript
  constructor(public element: number, private next?: Node1) {}

  getNext() {
    return this.next;
  }
}

const n1 = new Node1(1);
console.log(n1.element); // 1

// method 2
class Node2 {
  // not required in javascript
  public element: number;
  private next?: Node2;

  constructor(element: number, next?: Node2) {
    this.element = element;
    this.next = next;
  }

  getNext() {
    return this.next;
  }
}
const n2 = new Node2(2);
console.log(n2.element); // 2

// method 3
interface NodeInterface {
  element: number;
  // private next is not required
  getNext(): NodeInterface | undefined;
}

class Node3 implements NodeInterface {
  constructor(public element: number, private next?: NodeInterface) {}

  getNext() {
    return this.next;
  }
}

const n3 = new Node4(3);
console.log(n3.element); // 3

// method 4
class Node4<T> {
  public element: T;
  private next?: Node2<T>;

  constructor(element: T, next?: Node2<T>) {
    this.element = element;
    this.next = next;
  }

  getElement() {
    return this.element;
  }
}

const n4 = new Node4(4);
console.log(n4.element); // 4
```

- Inheritance

```ts
class Node3 {
  constructor(public element: number, private next?: Node3) {}

  getNext() {
    return this.next;
  }
}

class List extends Node3 {
  dsType: string;

  constructor(dsType: string, element: number, next?: Node3) {
    super(element, next);
    this.dsType = dsType;
  }
}
```

### Generics

```ts
// method 1
function getArray(items: any[]): any[] {
  return new Array().concat(items);
}

let numArr = getArray([1, 2, 3]);

// method 2: better method
function getArray2<T>(items: T[]): T[] {
  return new Array().concat(items);
}

// both works
let numArr2 = getArray2([1, 2, 3]);
let numArr3 = getArray2<number>([1, 2, 3]);
```

### Overriding Type or Interface

```ts
// can be either interface or type
interface A {
  x: string;
  y: number;
  z: string;
}

const obj: A = {
  x: "1",
  y: 2,
  z: "3",
};

// method 1: using interface method, A can be either type or interface
interface B extends Omit<A, "x" | "z"> {
  x: number;
  z: number;
}

const obj2: B = {
  x: 1,
  y: 2,
  z: 3,
};

// method 2: using type method, A can be either type or interface
type C = Omit<A, "x" | "z"> & {
  x: number;
  z: number;
};

const obj3: C = {
  x: 1,
  y: 2,
  z: 3,
};
```

## Others

### Decorators

- `tsconfig.json`

  ```json
  {
    "compilerOptions": {
      "target": "ES5",
      "experimentalDecorators": true
    }
  }
  ```

- no args example

  ```ts
  import {performance} from "perf_hooks";

  const measure = (
    target: Object,
    propertyKey: string,
    descriptor: PropertyDescriptor
  ) => {
    const originalMethod = descriptor.value;

    descriptor.value = function (...args) {
      const start = performance.now();
      const result = originalMethod.apply(this, args);

      const finish = performance.now();

      console.log(`Execution time: ${finish - start} milliseconds`);
      return result;
    };

    return descriptor;
  };

  class Rocket {
    @measure
    launch() {
      console.log("Launching in 3... 2... 1... 🚀");
    }
  }

  const rocket = new Rocket();
  rocket.launch();
  ```

- with args example

  ```ts
  const minimumFuel =
    (fuel: number) =>
    (target: Object, propertyKey: string, descriptor: PropertyDescriptor) => {
      const originalMethod = descriptor.value;

      descriptor.value = function (...args) {
        if (this.fuel > fuel) {
          originalMethod.apply(this, args);
        } else {
          console.log("Not enough fuel!");
        }
      };

      return descriptor;
    };

  class Rocket {
    fuel = 50;

    @minimumFuel(100)
    launchToMars() {
      console.log("Launching to Mars in 3... 2... 1... 🚀");
    }

    @minimumFuel(25)
    launchToMoon() {
      console.log("Launching to Moon in 3... 2... 1... 🚀");
    }
  }

  const rocket = new Rocket();
  rocket.launchToMars();
  rocket.launchToMoon();
  ```
