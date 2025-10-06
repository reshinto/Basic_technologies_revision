# Sorted Linked List Example

## Utils

```ts
enum Compare {
  LessThan = -1,
  BiggerThan = 1,
  Equals = 0,
}

function compare<T>(a: T, b: T): number {
  if (a === b) {
    return Compare.Equals;
  }
  return a < b ? Compare.LessThan : Compare.BiggerThan;
}
```

## Sorted Linked List

```ts
class SortedLinkedList<T> extends LinkedList<T> {
  /**
   * @description: Add an element to the linked list
   * @param {T} element
   */
  public push(element: T) {
    if (this.isEmpty()) {
      super.push(element);
    } else {
      const index = this.getIndexNextSortedElement(element);
      super.insert(element, index);
    }
  }

  /**
   * @description: Add an element to the linked list
   * @param {T} element
   */
  public insert(element: T, index: number = 0) {
    if (this.isEmpty()) {
      return super.insert(element, 0);
    }
    index = this.getIndexNextSortedElement(element);
    return super.insert(element, index);
  }

  /**
   * @private
   * @description: Get the position where the element should be inserted
   * @param {T} element
   * @return {Number} index
   */
  private getIndexNextSortedElement(element: T) {
    let current = this.head;
    let i = 0;

    for (; i < this.size() && current; i++) {
      const comp = compare(element, current.element);
      if (comp === Compare.LESS_THAN) {
        return i;
      }
      current = current.next;
    }

    return i;
  }
}
```
