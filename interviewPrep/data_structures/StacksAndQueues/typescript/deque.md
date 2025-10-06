# Deque Example

```ts
export default class Deque<T> {
  private count: number;
  private lowestCount: number;
  private items: Map<number, T>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = new Map();
  }

  /**
   * @description: Enqueue in the direction of lowestCount (top of queue)
   * @param {T} element
   */
  public addFront(element: T): void {
    this.lowestCount--;
    this.items.set(this.lowestCount, element);
  }

  /**
   * @description: Enqueue in the count direction (bottom of the queue)
   * @param {T} element
   */
  public addBack(element: T): void {
    this.items.set(this.count, element);
    this.count++;
  }

  /**
   * @description: Dequeue in the direction of lowestCount (top of queue)
   * @return {T} element
   */
  public removeFront(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    const result = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount++;
    return result;
  }

  /**
   * @description: Dequeue in count direction (bottom of queue)
   * @return {T} element
   */
  public removeBack(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items.get(this.count);
    this.items.delete(this.count);
    return result;
  }

  /**
   * @description: Returns the element at the top of the queue
   * @return {T} element
   */
  public peekFront(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.lowestCount);
  }

  /**
   * @description: Returns the element at the bottom of the queue
   * @return {T} element
   */
  public peekBack(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.count - 1);
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
   */
  public clear(): void {
    this.items = new Map();
    this.count = 0;
    this.lowestCount = 0;
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
   * @return {String}
   */
  public toString(): string {
    if (this.isEmpty()) {
      return "";
    }
    let objString: string = `${this.items.get(this.lowestCount)}`;
    for (let i = this.lowestCount + 1; i < this.count; i++) {
      objString = `${objString},${this.items.get(i)}`;
    }
    return objString;
  }
}
```
