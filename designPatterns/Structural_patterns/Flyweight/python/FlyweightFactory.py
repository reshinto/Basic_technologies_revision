from Flyweight import Flyweight


class FlyweightFactory:
    def __init__(self, initial_flyweights):
        self.flyweights = {}
        for state in initial_flyweights:
            self.flyweights[self.get_key(state)] = Flyweight(state)

    def get_key(self, state):
        return "_".join(state)

    def get_flyweight(self, shared_state):
        key = self.get_key(shared_state)

        if not key in self.flyweights:
            print("FlyweightFactory: Can't find a flyweight, creating new one.")
            self.flyweights[key] = Flyweight(shared_state)
        else:
            print("FlyweightFactory: Reusing existing flyweight.")

        return self.flyweights[key]

    def list_flyweights(self):
        count = len(list(self.flyweights.keys()))
        print(f"\nFlyweightFactory: I have {count} flyweights:")
        for key in self.flyweights:
            print(key)
