# Stack Example

```ts
class Stack<T> {
  // stored Map
  private items: Map<number, T>;

  //
  constructor() {
    this.items = new Map();
  }

  /**
   * @description: push onto the stack
   * @param {T} element
   */
  public push(element: T) {
    this.items.set(this.items.size, element);
  }

  /**
   * @description:
   * @return {T}
   */
  public pop(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.get(this.items.size - 1);
    this.items.delete(this.items.size - 1);
    return result;
  }

  /**
   * @description: Returns the top element of the stack
   * @return {T}
   */
  public peek(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.items.size - 1);
  }

  /**
   * @description:
   * @return {Boolean}
   */
  public isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * @description:
   * @return {Number}
   */
  public size(): number {
    return this.items.size;
  }

  /**
   * @description:
   */
  public clear() {
    this.items.clear();
  }

  /**
   * @description:
   * @return {String}
   */
  public toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let result: string = "";
    this.items.forEach((value, key) => {
      result = `${result}${key === 0 ? "" : ","}${value}`;
    });
    return result;
  }
}
```
