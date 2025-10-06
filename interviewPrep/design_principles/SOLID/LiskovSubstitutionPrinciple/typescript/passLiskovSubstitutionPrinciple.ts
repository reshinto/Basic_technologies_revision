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
