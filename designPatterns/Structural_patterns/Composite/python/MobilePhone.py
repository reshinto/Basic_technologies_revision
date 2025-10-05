from Item import Item


class MobilePhone(Item):
    def __init__(self, name, color, cost):
        super().__init__(name, "Mobile Phone")
        self.color = color
        self.cost = cost

    def getDetails(self):
        print(f"{self.getName()} :: {self.color} color, priced at {self.cost}")
