# Circular Linked List Example

## Node

```ts
class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}
```

## Circular Linked List

```ts
export default class CircularLinkedList<T> extends LinkedList<T> {
  /**
   * @description: Add an element to the end of the linked list
   * @param {T} element
   */
  public push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      this.head = node;
    } else {
      current = this.getNodeAt(this.size() - 1);
      current.next = node;
    }

    node.next = this.head; // 👈 Remember to point the next of the last node to head

    this.count++;
  }

  /**
   * @description: Inserts an element at the specified index
   * @param {T} element
   * @param {number} index
   * @return {boolean} Returns whether the insertion was successful
   */
  public insert(element: T, index: number) {
    if (index >= 0 && index <= this.count) {
      const node = new Node(element);
      let current = this.head;

      if (index === 0) {
        // 👇 When inserted into the first time, there are two cases
        if (this.head == null) {
          // no element
          this.head = node;
          node.next = this.head; // 👈 special
        } else {
          // already have some elements
          let tail = this.getNodeAt(this.size() - 1);
          this.head = node;
          node.next = current;
          tail.next = this.head; // 👈 special
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        node.next = previous.next;
        previous.next = node;
      }
      this.count++;
      return true;
    }
    return false;
  }

  /**
   * @description: removes the element at the specified index
   * @param {number} index
   * @return {T} Returns the removed element
   */
  public removeAt(index: number) {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      if (index === 0) {
        // 👇 Delete the first time, have two cases
        if (this.size() === 1) {
          // only one element
          this.head = undefined;
        } else {
          // has several elements
          let tail = this.getNodeAt(this.size() - 1);
          this.head = this.head.next;
          tail.next = this.head; // 👈 next points to head
        }
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        previous.next = current.next;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }
}
```
