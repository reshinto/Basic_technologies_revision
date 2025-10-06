# TypeScript Example

## Violate LSP

```ts
interface Bird {
  fly(): void;
}

class Duck implements Bird {
  quack() {
    console.log("I can quack");
  }

  fly() {
    console.log("I can fly");
  }
}

class Penguin implements Bird {
  fly() {
    throw new Error("Cannot fly");
  }

  swim() {
    console.log("I can swim");
  }
}

// this violates the Liskov Substitution Principle
// as not every bird can fly
function makeBirdFly(bird: Bird) {
  bird.fly();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdFly(penguin); // throws an error as penguin can't fly
```

## Pass LSP

```ts
interface FlyingBird {
  fly(): void;
}

interface SwimmingBird {
  swim(): void;
}

class Duck2 implements FlyingBird {
  quack() {
    console.log("I can quack");
  }

  fly() {
    console.log("I can fly");
  }
}

class Penguin2 implements SwimmingBird {
  swim() {
    console.log("I can swim");
  }
}

function makeFlyingBirdFly(bird: FlyingBird) {
  bird.fly();
}

function makeSwimmingBirdSwim(bird: SwimmingBird) {
  bird.swim();
}

const duck2 = new Duck2();
const penguin2 = new Penguin2();

makeFlyingBirdFly(duck2);
makeSwimmingBirdSwim(penguin2);
```
