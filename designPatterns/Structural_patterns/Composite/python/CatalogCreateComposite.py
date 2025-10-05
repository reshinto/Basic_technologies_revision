from Item import Item


class Catalog(Item):
    def __init__(self, name):
        super().__init__(name, "Catalog")
        self.collection = []

    def add(self, product):
        self.collection.append(product)
        return self

    def getDetails(self):
        print(self.getName().upper())
        for item in self.collection:
            item.getDetails()
