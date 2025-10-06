# Python Example

## Violate LSP

```python
class Bird:
    def fly(self):
        print("I can fly")


class Duck(Bird):
    def quack(self):
        print("I can quack")


class Penguin(Bird):
    def fly(self):
        raise Exception("Cannot fly")

    def swim(self):
        print("I can swim")


# this violates the Liskov Substitution Principle
# as not every bird can fly
def make_bird_fly(bird):
    bird.fly()


duck = Duck()
penguin = Penguin()

make_bird_fly(duck)
make_bird_fly(penguin)  # throws an error as penguin can't fly
```

## Pass LSP

```python
class FlyingBird:
    def fly(self):
        print("I can fly")


class SwimmingBird:
    def swim(self):
        print("I can swim")


class Duck(FlyingBird):
    def quack(self):
        print("I can quack")


class Penguin(SwimmingBird):
    ...


def make_flying_bird_fly(bird):
    bird.fly()


def make_swimming_bird_swim(bird):
    bird.swim()


duck = Duck()
penguin = Penguin()

make_flying_bird_fly(duck)
make_swimming_bird_swim(penguin)
```
