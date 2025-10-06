# Hash Tables

- it provides fast insertion, deletion, and lookup of key/value pairs
- under the hood, it uses a dynamic array of linked lists to efficiently store key/value pairs
  - when inserting a key/value pair, a hash function 1st maps the key, which is typically a string (or any data that can be hashed, depending on the implementation of the hash table) to an integer value and, by extension, to an index in the underlying dynamic array
  - then the value associated with the key is added to the linked list stored at that index in the dynamic array, and a reference to the key is also stored with the value
- it relys on highly optimized hash functions to minimize the number of collisions that occur when storing values
  - cases where 2 keys map to the same index
- e.g.: of what a hash table might look like under the hood
  ```
  [
    0: (value1, key1) -> null
    1: (value2, key2) -> (value3, key3) -> (value4, key4)
    2: (value5, key5) -> null
    3: (value6, key6) -> null
    4: null
    5: (value7, key7) -> (value8, key8)
    6: (value9, key9) -> null
  ]
  ```
  - in the hash table above, the keys key2, key3, and key4 collided by all being hashed to index 2
  - the keys key7 and key8 collided by both being hashed to index 5

## Standard Operations and complexities

- the worst case linear operations occur when a hash table experience a lot of collusions, leading to long linked lists internally
  - which take O(n) time to traverse
- however, in practice and in coding interview, we typically assume that the hash functions employed by hash tables are optimized that collisions are rare and constant time operations are guaranteed

### Initializing a hash table:

- if dumping n elements, it would take O(n) time, O(n) space

### Inserting a key/value pair: O(1) on average, O(n) in the worst case time

- hash table would resize when the dynamic array is not big enough to store a certain number of key/value pairs

### Removing a key/value pair: O(1) on average, O(n) in the worst case time

- hash table would resize when the dynamic array is too big after removing a certain number of key/value pairs

### Looking up a key: O(1) on average, O(n) in the worst case time
