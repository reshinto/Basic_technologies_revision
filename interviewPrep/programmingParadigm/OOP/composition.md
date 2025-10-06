# Composition

- it is one of the fundamental concepts in object-oriented programming
- It describes a class that references one or more objects of other classes in instance variables
- This allows the modeling of a `HAS-A association` between objects

## Composition vs Inheritance

- Composition uses different relation type

  - inheritance models strong `IS-A relation` between classes, it means that mountain bike is-a bicycle
  - composition models weaker `HAS-A relation`, mountain bike has-a wheel

- inheritance example

  - problem:
    - if need continuously extend existing functionality, will notice that spare parts functionality may not change all the time
    - or will require adjustments because of specific implementations of different subclasses
    - it becomes too difficult to extend spare parts functionality
      - composition will help solve this problem

  ```ts
  abstract class Bicycle {
    protected readonly defaultChain = "11-speed";

    constructor(opts) {
      this.style = opts.style;
      this.chain = opts.chain || this.defaultChain;
      this.tireSize = opts.tireSize || this.defaultTireSize;
    }

    spares() {
      return {
        chain: this.chain,
        tireSize: this.tireSize,
      };
    }
  }

  class RoadBike extends Bicycle {
    protected readonly defaultTireSize = "28";

    constructor(opts) {
      super(opts);

      this.tapeColor = opts.tapeColor;
    }

    spares() {
      return {
        ...super.spares(),
        tapeColor: this.tapeColor,
      };
    }

    protected get defaultChain() {
      return "2-speed";
    }
  }

  class MountainBike extends Bicycle {
    protected readonly defaultTireSize = "29";

    constructor(opts) {
      super(opts);

      this.frontShock = opts.frontShock;
    }

    spares() {
      return {
        ...super.spares(),
        frontShock: this.frontShock,
      };
    }
  }
  ```

## Moving from Inheritance to Composition

- by moving spare parts to `Parts` class, inheritance will be replaced with composition
  - now we have `Parts` class with all the spare functionality encapsulated inside it
  - `Bicycle` type depends on provided parts
  - when spares method is called inside Bicycle, it is delegated to Parts instance, and it decides which exact parts to return

```ts
class Bicycle {
  constructor(private size: string, private parts: Parts) {}

  spares() {
    return this.parts.spares();
  }
}

class Parts {
  constructor(private parts: Part[]) {}

  spares() {
    return this.parts
      .filter(({needsSpare}) => needsSpare)
      .reduce((spares, {name, value}) => ({
        ...spares,
        [name]: value,
      }));
  }
}

class Part {
  constructor(
    public name: string,
    public value: string,
    public needsSpare = true
  ) {}
}

const roadBike = new Bicycle(
  "M",
  new Parts([
    new Part("chain", "11-speed"),
    new Part("tireSize", "28"),
    new Part("tapeColor", "red"),
  ])
);
const mountainBike = new Bicycle(
  "L",
  new Parts([
    new Part("chain", "11-speed"),
    new Part("tireSize", "29"),
    new Part("readShock", "fox", false),
    new Part("frontShock", "manitou"),
  ])
);
```

## Accepting the Consequences of Inheritance

- Inheritance is best suited to adding functionally to existing classes when you will use most of the old code and add relatively small amounts of new code

### Benefits of Inheritance

- Use of inheritance results in code that can be described as `open-closed principle`
  - hierarchies are open for extension while remaining closed for modification
  - allows you to easily extend the class behaviour without modifying existing code, this is pretty safe way to get the needed result
  - when the encapsulation is not violated and classes are inherited in a correct way OCP will not be violated
- Correctly written hierarchies are easy to extend
  - The hierarchy embodies the abstraction and every new subclass plugs in a few concrete differences
  - The existing pattern is easy to follow and replicate
  - Hierarchies by their nature provide guidance for writing the code to extend them
- Use Inheritance for `IS-A Relationships`

### Cons of Inheritance

- Choosing inheritance to solve the wrong kind of problem
- High cost of making changes near the top of an incorrectly modeled hierarchy
  - In this case, the leveraging effect works to your disadvantage; small changes break everything
- Impossibility of adding behavior when new subclasses represent a mixture of types

## Accepting the Consequences of Composition

- Use composition when the behavior is more than the sum of its parts

### Benefits of Composition

- When using composition, the natural tendency is to create many small objects that contain straightforward responsibilities that are accessible through clearly defined interfaces
  - Interfaces need to be used when some part depends on (composes) other part, so it also helps to develop the new functionality
- These small objects have a `single responsibility principle` and specify their own behavior
  - They are transparent
  - it is easy to understand the code, and it is clear what will happen if it changes
- Because composed objects deal with their parts via an interface, adding a new kind of part is a simple matter of plugging in a new object that honors the interface
- Use Composition for has-a Relationships

### Cons of Composition

- A composed object relies on its many parts
  - Even if each part is small and easily understood, the combined operation of the whole may be less than obvious
- The benefits of structural independence are gained at the cost of automatic message delegation
  - The composed object must explicitly know which messages to delegate and to whom
- As these costs and benefits illustrate, composition is excellent at prescribing rules for assembling an object made of parts but does not provide as much help for the problem of arranging code for a collection of parts that are very nearly identical
