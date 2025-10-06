# Priority Queue Array Example

- utils

  ```ts
  enum Colors {
    Red = 0,
    Black = 1,
  }
  ```

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

```ts
class PriorityQueue<T> {
  private items: T[];

  constructor() {
    this.items = [];
  }

  public enqueue(element: T) {
    let added = false;

    for (let i = 0; i < this.items.length; i++) {
      if (compare(element, this.items[i]) === Compare.LessThan) {
        this.items.splice(i, 0, element);
        added = true;
        break;
      }
    }

    if (!added) {
      this.items.push(element);
    }
  }

  public dequeue() {
    return this.items.shift();
  }

  public peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[0];
  }

  public isEmpty() {
    return this.items.length === 0;
  }

  public clear() {
    this.items = [];
  }

  public size() {
    return this.items.length;
  }

  public toString() {
    if (this.isEmpty()) {
      return "";
    }
    return this.items;
  }
}
```
