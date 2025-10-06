# Singly Linked List Example

## Utils

```ts
function defaultEquals<T>(a: T, b: T): boolean {
  return a === b;
}
```

## Node

```ts
class Node<T> {
  constructor(public element: T, public next?: Node<T>) {}
}
```

## Linked List

```ts
class LinkedList<T> {
  protected count = 0;
  protected head?: Node<T>;

  /**
   * @description:
   * @param {T} element
   */
  public push(element: T) {
    const node = new Node(element);
    let current;

    if (this.head == null) {
      // add directly when the first element
      this.head = node;
    } else {
      // find the last element, add after it
      current = this.getNodeAt(this.size() - 1);
      current.next = node;
    }

    // Finally increment the count by 1
    this.count++;
  }
  /**
   * @description: Get the node at the specified index
   * @param {number} index
   * @return {Node<T>} Returns the node at the specified index
   */
  public getNodeAt(index: number): Node<T> {
    if (index >= 0 && index <= this.count) {
      let node = this.head;
      // How many times to iterate on from the first node
      for (let i = 0; i < index && node != null; i++) {
        node = node.next;
      }
      return node;
    }
    return undefined;
  }

  /**
   * @description: Get the element at the specified index
   * @param {number} index
   * @return {T} Returns the element at the specified index
   */
  public getElementAt(index: number): T {
    return this.getNodeAt(index)?.element;
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

      // Insert elements are also divided into "first" and "non-first" cases
      if (index === 0) {
        const current = this.head;
        node.next = current;
        this.head = node;
      } else {
        // Untangle the next link at this location and insert a new node
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

      // Inserting and removing elements is also divided into two cases: "first" and "non-first"
      if (index === 0) {
        this.head = current.next;
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

  /**
   * @description: remove the specified element
   * @param {T} element
   * @return {T} element returns the removed element
   */
  public remove(element: T): T {
    const index = this.indexOf(element);
    return this.removeAt(index);
  }

  /**
   * @description: Returns the index of the specified element (only the first equal from the front is returned)
   * @param {T} element
   * @return {number} index
   */
  public indexOf(element: T): number {
    let current = this.head;

    // iterate over looking for equal elements
    for (let i = 0; i < this.size() && current != null; i++) {
      // use the method to determine equality
      if (defaultEquals(element, current.element)) {
        return i;
      }
      current = current.next;
    }

    return -1;
  }

  /**
   * @description:
   * @return {boolean}
   */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @description:
   * @return {number}
   */
  public size(): number {
    return this.count;
  }

  /**
   * @description: Get the first node of the linked list
   * @return {Node<T>}
   */
  public getHead(): Node<T> {
    return this.head;
  }

  /**
   * @description:
   */
  public clear() {
    this.head = undefined;
    this.count = 0;
  }

  /**
   * @description:
   * @return {string}
   */
  public toString(): string {
    if (this.head == null) {
      return "";
    }
    let objString = `${this.head.element}`;
    let current = this.head.next;
    for (let i = 1; i < this.size() && current != null; i++) {
      objString = `${objString},${current.element}`;
      current = current.next;
    }
    return objString;
  }
}
```
