/**
 * Concrete Iterators implement various traversal algorithms. These classes
 * store the current traversal position at all times.
 */
class AlphabeticalOrderIterator {
  constructor(collection, reverse = false) {
    this.collection = collection;
    /**
     * This variable indicates the traversal direction.
     */
    this.reverse = reverse;
    /**
     * Stores the current traversal position. An iterator may have a lot of
     * other fields for storing iteration state, especially when it is supposed
     * to work with a particular kind of collection.
     */
    this.position = 0;

    if (reverse) {
      this.position = collection.getCount() - 1;
    }
  }

  rewind() {
    this.position = this.reverse ?
      this.collection.getCount() - 1 :
      0;
  }

  current() {
    return this.collection.getItems()[this.position];
  }

  key() {
    return this.position;
  }

  next() {
    const item = this.collection.getItems()[this.position];
    this.position += this.reverse ? -1 : 1;
    return item;
  }

  valid() {
    if (this.reverse) {
      return this.position >= 0;
    }

    return this.position < this.collection.getCount();
  }
}

module.exports = AlphabeticalOrderIterator;
