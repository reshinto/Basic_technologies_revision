# JavaScript Basic Data Structures
## Array
- almost always supports amortized O(1) time append/remove at the end of an array
### Common Array Operations
- `push(item)`
  - adds item to the end of array and returns the array length
  - amortized O(1)
- `pop()`
  - removes and returns the last element of the array
  - amortized O(1)
- `shift()`
  - removes and returns the first element of the array
  - O(n)
- `unshift(item)`
  - adds item to the start of the array and returns the array length
  - O(n)
- `splice(start_index, count_to_remove, add_item1, add_item2, ...)`
  - removes and returns count_to_remove item(s) from an array given its/their index and optionally replaces them with add_items
  - O(n)
- `slice(start_index, upto_index)`
  - Subarray slicing
  - slicing indices are left-inclusive and right-exclusive
  - upto_index can be ommited to extract till the end of the array
  - both start_index and upto_index can be negative to indicate an offset from the end of array
## Linked List
- append to end is O(1)
- finding an element is O(N)

```javascript
// create linked list with class constructor
class LinkedListNode {
    constructor(val, next = null) {
        this.val = val;
        this.next = next;
    }
}

// create linked list with function constructor
function LinkedListNode(val, next) {
  this.val = val;
  this.next = next;
}

// create linked list with object literal
const linkedListNode = { val: 1, next: { val: 2, next: null } };
```

## Stack
- Array also doubles as a stack
- Recursion and function calls are implemented with stack behind the scene
### Common Stack Operations
- push: `push(item)`, amortized O(1)
- pop: `pop()`, amortized O(1)
- size: `stack.length`, O(1)
- top: `stack[stack.length - 1]`, O(1)
## Queue
- use Array when we need a queue, but dequeing would take linear time instead of constant time
- In coding interviews, we see queues most often in breath-first search
- in monotonic deque, elements are sorted inside the deque that is useful in solving some advanced coding problems
### Common Stack Operations
- enqueue: `push(item)`, amortized O(1)
- dequeue: `shift()`, O(n)
- size: `queue.length`, O(1)
## Hash Table
- Javascript's Map is an implementation of the hash table
```javascript
const map = new Map();
```
- these are average case time complexity
- A hash table's worse time complexity is `O(N)` due to hash collision and other things
  - For the vast majority of the cases and certainly most coding interviews, the assumption of constant time lookup/insert/delete is valid
- Use a hash table if you want to create a mapping from A to B
  - Many starter interview problems can be solved with a hash table
### Common Stack Operations
- get using a key: `get(key)`, O(1)
- set a key, value: `set(key, value)`, O(1)
- remove using a key: `delete(key)`, O(1)
- check if a key exists: `has(key)`, O(1)
### Map vs. Object in Javascript
- Map offers several advantages over an Object when used as a hash table:
  - a Map does not contain default keys that could collide with your own
  - the keys of a Map can be of any data type, whereas an Object's keys must be either a string or a symbol
## Hash Set
- Javascript's Set is useful in answering existence queries in constant time
```javascript
const set = new Set();
```
- Hash set is useful when you only need to know existence of a key
  - Example use cases include DFS and BFS on graphs
### Common Stack Operations
- `has(item)` checks if item is in set, O(1)
- `add(item)` appends item to set and returns set, O(1)
- `delete(item)` removes item from set and returns true upon successful removal, otherwise returns false, O(1)
## Tree
- for binary tree
  ```javascript
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.left = null;
      this.right = null;
    }
  }
  ```
- for n-nary trees
  ```javascript
  class TreeNode {
    constructor(val) {
      this.val = val;
      this.children = [];
    }
  }
  ```
