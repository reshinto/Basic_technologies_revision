# Dictionary Example

```ts
class Dictionary<K, V> {
  private table: Map<K, V>;

  constructor() {
    this.table = new Map();
  }

  /**
   * @description: set key-value pair
   * @param {K} key
   * @param {V} value
   * @return {boolean}
   */
  public set(key: K, value: V): boolean {
    this.table.set(key, value);
    return true;
  }

  /**
   * @description: get value by key
   * @param {K} key
   * @return {V}
   */
  public get(key: K): V {
    return this.table.get(key);
  }

  /**
   * @description: Returns whether this key exists
   * @param {K} key
   * @return {boolean}
   */
  public hasKey(key: K): boolean {
    return this.table.has(key);
  }

  /**
   * @description: remove key-value pairs
   * @param {K} key
   * @return {boolean}
   */
  public remove(key: K): boolean {
    return this.table.delete(key);
  }

  /**
   * @description: return value array
   * @return {Array<V>}
   */
  public values(): V[] {
    return Array.from(this.table.values());
  }

  /**
   * @description: return key array
   * @return {Array<K>}
   */
  public keys(): K[] {
    return Array.from(this.table.keys());
  }

  /**
   * @description: Returns an array of key-value pairs
   * @return {Array<K, V>}
   */
  public keyValues(): [K, V][] {
    return Array.from(this.table.entries());
  }

  /**
   * @description: iterate over the entire dictionary
   * @param {function} callbackFn
   */
  public forEach(callbackFn: (key: K, value: V) => any) {
    const valuePairs = this.keyValues();
    for (let i = 0; i < valuePairs.length; i++) {
      // Terminate the iteration when callbackFn returns false
      if (callbackFn(valuePairs[i][0], valuePairs[i][1]) === false) {
        break;
      }
    }
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
    return this.table.size;
  }

  /**
   * @description:
   */
  public clear() {
    this.table.clear();
  }

  /**
   * @description:
   * @return {string}
   */
  public toString(): string {
    if (this.isEmpty()) {
      return "";
    }

    let objStringList = [];
    for (const [key, value] of this.table) {
      objStringList.push(`[${key}: ${value}]`);
    }
    return objStringList.join(",");
  }
}
```
