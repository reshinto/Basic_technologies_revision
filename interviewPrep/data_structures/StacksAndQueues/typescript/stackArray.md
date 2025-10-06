# Stack Array Example

```ts
class StackArray<T> {
  // stored Array
  private items: T[];

  constructor() {
    this.items = [];
  }

  /**
   * @description:
   * @param {T} element
   */
  public push(element: T) {
    this.items.push(element);
  }

  /**
   * @description:
   * @return {T}
   */
  public pop(): T {
    return this.items.pop();
  }

  /**
   * @description:
   * @return {T}
   */
  public peek(): T {
    return this.items[this.items.length - 1];
  }

  /**
   * @description:
   * @return {Boolean}
   */
  public isEmpty(): boolean {
    return this.items.length === 0;
  }

  /**
   * @description:
   * @return {Number}
   */
  public size(): number {
    return this.items.length;
  }

  /**
   * @description:
   */
  public clear() {
    this.items = [];
  }

  /**
   * @description:
   * @return {String}
   */
  public toString(): string {
    return this.items.toString();
  }
}
```
