# JavaScript Example

## Violate LSP

```js
class Bird {
  fly() {
    console.log("I can fly");
  }
}

class Duck extends Bird {
  quack() {
    console.log("I can quack");
  }
}

class Penguin extends Bird {
  fly() {
    throw new Error("Cannot fly");
  }

  swim() {
    console.log("I can swim");
  }
}

// this violates the Liskov Substitution Principle
// as not every bird can fly
function makeBirdFly(bird) {
  bird.fly();
}

const duck = new Duck();
const penguin = new Penguin();

makeBirdFly(duck);
makeBirdFly(penguin); // throws an error as penguin can't fly
```

## Pass LSP

```js
class FlyingBird {
  fly() {
    console.log("I can fly");
  }
}

class SwimmingBird {
  swim() {
    console.log("I can swim");
  }
}

class Duck extends FlyingBird {
  quack() {
    console.log("I can quack");
  }
}

class Penguin extends SwimmingBird {}

function makeFlyingBirdFly(bird) {
  bird.fly();
}

function makeSwimmingBirdSwim(bird) {
  bird.swim();
}

const duck = new Duck();
const penguin = new Penguin();

makeFlyingBirdFly(duck);
makeSwimmingBirdSwim(penguin);
```
