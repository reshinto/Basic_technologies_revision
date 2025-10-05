class AlphabeticalOrderIterator:
    def __init__(self, collection, reverse=False):
        self.collection = collection
        self.reverse = reverse
        self.position = 0
        if reverse:
            self.position = collection.get_count() - 1

    def rewind(self):
        self.position = self.collection.get_count() if self.reverse else 0

    def current(self):
        return self.collection.get_items()[self.position]

    def key(self):
        return self.position

    def next(self):
        item = self.collection.get_items()[self.position]
        self.position += -1 if self.reverse else 1
        return item

    def valid(self):
        if self.reverse:
            return self.position >= 0
        return self.position < self.collection.get_count()
