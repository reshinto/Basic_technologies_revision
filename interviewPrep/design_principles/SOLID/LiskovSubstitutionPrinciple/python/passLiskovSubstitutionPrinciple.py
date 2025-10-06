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
