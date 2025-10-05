# Basic Data Structures
## Stack
- `first in, last out` property
- an item can be inserted and removed from a stack
- but an item can only be removed from the stack after all the items added after it are removed first
- supports three operations
  1. Insert (or "Push"): Putting an item into the stack
  2. Peek: Look at the top item of the stack (the last inserted item that's not removed)
  3. Remove (or "Pop"): Remove the top item of the stack
- Usefulness:
  - one of the most fundamental concepts of computer programming
    - recursion: utilizes a stack under the hood
      - As such, Depth-First Search uses a stack, either directly or through the use of recursion
### Implementation
- using an (statically-sized) array and a pointer pointing to the top of the stack (usually the next unused space)
- When inserting an item
  - set the value at the pointer to the item and increment the pointer by 1
- When removing an item
  - decrease the pointer by 1
- no need to reset the item at the pointer because it isn't accessible by the stack
  - it will be overwritten when more items are inserted
    - might still want to reset it for languages with garbage collectors to prevent memory leaks
### Caution
- In a real world scenario, need to be careful when doing an operation on a stack
  - Removing an item from a stack with no items will cause an `underflow` error
  - If we have a static sized array as a stack and we try to insert an item into the stack while it's full
    - it will cause an `overflow`
- Underflow errors can be prevented by checking if the stack is empty before removing an item from the stack
  - as programs almost never want to pop from an empty stack
  - If a program does want that, that program probably wants to do something different if the stack is empty
  - `Overflow` errors are a bit tricky, as programs sometimes would like to add more items to the stack
- for modern programming languages, there is usually a dynamically sized array data structure and can be used as a stack
  - Insertion and deletion from the list has a time complexity of O(1) (on average), just like a stack
  - Since memories are dynamically assigned to the list, don't have to worry about overflowing
    - because if it reaches a max size, the system will just allocate more memory for them
  - e.g.: python
    ```python
    # Initializes the stack
    stack = []
    # Pushing 5 into the stack
    stack.append(5)
    # Look at the top item of the stack and print it
    print(stack[-1])
    # Removing the top item from the stack
    stack.pop()
    ```
## Queue
- `first in, first out` property
- an item can be inserted and removed from the queue
- but an item can only be removed from the queue after all the items added before it are removed first
- supports three operations
  1. Insert (or "Push"): Putting an item into the end of the queue
  2. Peek: Look at the first item of the queue
  3. Remove (or "Pop"): Remove the first item of the queue
### Implementation
- use an array and two pointers
  - one pointing to the start of the queue, and one pointing at the end of the queue
- When inserting an item into the queue
  - set the entry at the end pointer to the value and increase the end pointer by one
- When removing an item from the queue, increase the start pointer by one
### Deque 
- is a double-ended queue
- inserting and removing items from the queue can be done on both end
- can use the same implentation logic, but allow the increment and decrement of both start and end pointers
### Caution
- One of the flaws of the current implementation
  - when one of the queue pointers reaches the end of the array, it will cause an overflow
  - However, if some elements have been removed from the other end
    - then when the queue overflows, there are still a lot of unused empty spaces
  - improvement that can be done on this implementation is to make the array "loop"
    - When a pointer tries to move past the array, it loops around to the other end of the array instead
      - This is known as a `Circular Buffer`
- Most modern programming languages offer a built-in deque data structure
  - and they often use a dynamic array as its underlying data structure
  - they can also use a double-linked list, like Python's deque class 
    - won't have to worry about deques overflowing because the resizing of the array is handled for you
  - e.g. python
    ```python
    # Initialize a new deque
    queue = deque()
    # Add 2 to the end of the deque
    queue.append(2)
    # Add 4 to the front of the deque
    queue.appendleft(4)
    # Look at the end of the deque and print it
    print(queue[-1])
    # Look at the front of the deque and print it
    print(queue[0])
    # Remove the end of the deque
    queue.pop()
    # Remove the front of the deque
    queue.popleft()
    ```
## Hash Map
### Hash Function
- is a function that can convert a data of arbitrary size to a value of a fixed size (usually 32-bit integer)
  - The result of the function is called the hash value
- for a valid hash function
  - two items representing the same values must return the same hash value as a result
    - e.g.: two data representing the string "Smith" must return the same value in the hash function, regardless how this string is represented internally
    - The function always return the same value
      - as long as the size and entries of the array are the same, regardless of any other attributes such as memory address, etc.
    - The converse is not necessarily true as two items with the same hash values are not necessarily equal
      - e.g. `[32, 10]` has the same hash value as `[18, 10, 14]`, even though they are not equal
      - Such cases where the hash of two different items are the same is known as a `hash collision`
- good hash function with the following attributes can help improve the efficiency of hash tables
  - it is easy to calculate the hash value (the function has low time complexity)
  - The chance of collision is very low
  - All possible values are utilized approximately equally
### Hash Tables
- when programming, we need a data structure that maps from an arbitrary data type to another arbitrary data type, like an array with non-integer index
- it is one way of representing this data structure
- idea is we have an array of fixed size as our data structure
  - When we add a key to the data structure
    - we first convert it down to an integer within the range of the array (using a hash function)
      - and put that key in that index (where the hash value represents)
  - When looking up using that key, we hash it again and look up that index
  - Since the same value always hash to the same thing, we will always find the correct item in that index
### Improvements
- As the possibilities of keys increases, collision (where two different items have the same hash value) is unavoidable by the pigeonhole principle
  - In that case, it is necessary to consider what happens when two keys with the same hash are used in this table
  - With the current situation, the data structure will treat them as interchangeable
    - which can lead to unexpected behavior
      - e.g. you want to set the entry for "Anne", but doing so will change the entry for "John", which is often not what we want
- One method of dealing with this problem is `Separate Chaining`
  - Instead of storing the entry directly in the array
    - we use a list of key-value pairs in each entry in the array instead
    - When we set the value represented by a key in the hash table, after finding out the hash of that key, we first search for if the key exists already in the list represented by the hash value
      - If so, we can update the value to a new one
      - Otherwise, we can append the new key value pair into the list
      - The list is usually a linked list, although other lists that can dynamically increase in size will do as well
  - Searching for an item takes similar steps
- Another strategy is `Open Addressing`
  - use the same table to store everything, but we find the next unused space instead when adding a new key
### Efficiency
- Assuming the hash function uses constant time
  - the average time complexity is `O(n / k)` for each insertion/access operation on the table because of the pigeonhole principle
    - where n is the number of entries in the hash table
    - k is the array size of the table
  - in the worst case scenario, where everything in the array is hashed to the same key, the time complexity is `O(n)`
- having a good hash function is very important to the efficiency of a hash table
  - Having a simple hash function ensures that each key lookup is efficient
  - Having a hash function where collision is unlikely ensures that the number of entries at each index is kept at minimal
    - thus improving the efficiency of each lookup
- Most modern programming languages offer a dynamic hash table: a hash table whose size dynamic changes as more items are added
  - each access to the table has an average time complexity of `O(1)`
    - which is very close to that of accessing an array
  - As such, when you need a non-integer index, you can use a hash table instead
  - e.g. Python has the dict class, while Java has the HashMap class
    - e.g.: python
      ```python
      # Initialize a new hash map
      hashmap = {}
      # Set the entry represented by "John" to 28
      hashmap["John"] = 28
      # Check if "John" is in the hash map
      if "John" in hashmap:
          # Print the entry represented by "John"
          print(hashmap["John"])
      ```
