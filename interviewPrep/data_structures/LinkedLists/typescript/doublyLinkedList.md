# Doubly Linked List Example

## Node

```ts
class DoublyNode<T> extends Node<T> {
  constructor(
    public element: T,
    public next?: DoublyNode<T>,
    public prev?: DoublyNode<T>
  ) {
    super(element, next);
  }
}
```

## Doubly Linked List

```ts
class DoublyLinkedList<T> extends LinkedList<T> {
  // There is one more tail node, and rewriting head
  protected head?: DoublyNode<T>;
  protected tail?: DoublyNode<T>;

  /**
   * @description: Add an element to the end of a doubly linked list
   * @param {T} element
   */
  public push(element: T) {
    const node = new DoublyNode(element);

    if (this.head == null) {
      this.head = node;
      this.tail = node; // 👈 new
    } else {
      // 👇 revise
      // Add to the tail, exchange pointers with each other
      this.tail.next = node;
      node.prev = this.tail;
      // Finally set node to tail
      this.tail = node;
    }
    this.count++;
  }

  /**
   * @description: Inserts an element at the specified index
   * @param {T} element
   * @param {number} index
   * @return {boolean} Returns whether the insertion was successful
   */
  public insert(element: T, index: number): boolean {
    if (index >= 0 && index <= this.count) {
      const node = new DoublyNode(element);
      let current = this.head;

      // 👇 insert into the first
      if (index === 0) {
        // linked list is empty
        if (this.head == null) {
          this.head = node;
          this.tail = node;
          // linked list is not empty
        } else {
          node.next = this.head;
          this.head.prev = node; // NEW
          this.head = node;
        }
        // 👇 insert to the last
      } else if (index === this.count) {
        current = this.tail;
        current.next = node;
        node.prev = current;
        this.tail = node;
        // 👇 insert to the last
      } else {
        const previous = this.getNodeAt(index - 1);
        current = previous.next;
        node.next = current;
        previous.next = node;

        current.prev = node; // NEW
        node.prev = previous; // NEW
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
  public removeAt(index: number): T {
    if (index >= 0 && index < this.count) {
      let current = this.head;

      // 👇 delete the first
      if (index === 0) {
        this.head = this.head.next;
        // If there is only one element, the tail needs to be adjusted at the same time
        if (this.count === 1) {
          this.tail = undefined;
        } else {
          this.head.prev = undefined;
        }
        // 👇 delete the last
      } else if (index === this.count - 1) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = undefined;
        // 👇 normal delete
      } else {
        current = this.getNodeAt(index);
        const previous = current.prev;
        const next = current.next;
        previous.next = next;
        next.prev = previous;
      }
      this.count--;
      return current.element;
    }
    return undefined;
  }

  /**
   * @description: Get the last node of the linked list
   * @return {Node<T>}
   */
  public getTail(): DoublyNode<T> {
    return this.tail;
  }

  /**
   * @description:
   */
  public clear() {
    super.clear();
    this.tail = undefined;
  }

  /**
   * @description: output string from tail to head
   * @return {string}
   */
  public inverseToString() {
    if (this.tail == null) {
      return "";
    }
    let objString = `${this.tail.element}`;
    let previous = this.tail.prev;
    while (previous != null) {
      objString = `${objString},${previous.element}`;
      previous = previous.prev;
    }
    return objString;
  }
}
```
