from typing import Collection
from WordsCollection import WordsCollection

if __name__ == "__main__":
    collection = WordsCollection()
    collection.add_item("First")
    collection.add_item("Second")
    collection.add_item("Third")

    iterator = collection.get_iterator()

    print("Straight traversal:")
    while iterator.valid():
        print(iterator.next())

    print("")
    print("Reverse traversal:")
    reverse_iterator = collection.get_reverse_iterator()
    while reverse_iterator.valid():
        print(reverse_iterator.next())
