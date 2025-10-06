# Queue Example

```ts
class Queue<T> {
  private count: number;
  private lowestCount: number;
  private items: Map<number, T>;

  constructor() {
    this.count = 0;
    this.lowestCount = 0;
    this.items = new Map();
  }

  /**
   * @description: Enqueue in the count direction (bottom of the queue)
   * @param {T} element
   */
  public enqueue(element: T): void {
    this.items.set(this.count, element);
    this.count++;
  }

  /**
   * @description: Dequeue in the direction of lowestCount (top of queue)
   * @return {T} element
   */
  public dequeue(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    const result: T = this.items.get(this.lowestCount);
    this.items.delete(this.lowestCount);
    this.lowestCount++;
    return result;
  }

  /**
   * @description: Returns the element at the top of the queue
   * @return {T} element
   */
  public peek(): T {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items.get(this.lowestCount);
  }

  /**
   * @description: Returns whether the queue is empty
   * @return {Boolean}
   */
  public isEmpty(): boolean {
    return this.items.size === 0;
  }

  /**
   * @description: empty the queue
   */
  public clear(): void {
    this.items = new Map();
    this.count = 0;
    this.lowestCount = 0;
  }

  /**
   * @description: Returns the number of queue elements
   * @return {Number}
   */
  public size(): number {
    return this.items.size;
  }

  /**
   * @description: Override Object's default toString
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
