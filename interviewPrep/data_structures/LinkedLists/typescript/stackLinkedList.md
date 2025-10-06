# Stack Linked List Example

```ts
class StackLinkedList<T> {
  private items: DoublyLinkedList<T>;

  constructor() {
    this.items = new DoublyLinkedList<T>();
  }

  public push(element: T) {
    this.items.push(element);
  }

  public pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.removeAt(this.size() - 1);
    return result;
  }

  public peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.getNodeAt(this.size() - 1).element;
  }

  public isEmpty() {
    return this.items.isEmpty();
  }

  public size() {
    return this.items.size();
  }

  public clear() {
    this.items.clear();
  }

  public toString() {
    return this.items.toString();
  }
}
```
