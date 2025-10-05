from AlphabeticalOrderIterator import AlphabeticalOrderIterator


class WordsCollection:
    def __init__(self):
        self.items = []

    def get_items(self):
        return self.items

    def get_count(self):
        return len(self.items)

    def add_item(self, item):
        self.items.append(item)

    def get_iterator(self):
        return AlphabeticalOrderIterator(self)

    def get_reverse_iterator(self):
        return AlphabeticalOrderIterator(self, True)
