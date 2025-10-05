from Item import Item


class Laptop(Item):
    def __init__(self, name, model, cost):
        super().__init__(name, "Laptop")
        self.model = model
        self.cost = cost

    def getDetails(self):
        print(f"{self.getName()} {self.model}, priced at {self.cost}")
