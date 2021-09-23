# Memory Leaks
## JavaScript / NodeJS
### V8 handles 2 main memory categories
1. Stack
    - it stores the primitive data types: Number, String,
boolean, Null, Undefined, Symbol and references to non-primitive
data types Object
2. Heap
    - stores the non-primitive data types: Object
### V8 has a garbage collector runs mainly Mark and Sweep algorithm
  - It checks for all objects' reference paths to the root node, which is the global or window object
  - If any reference has no path to the root node, it will be marked as garbage and will be swept later
- Important Note: When the Garbage Collector runs, it pauses your application entirely until it finishes its work
  - so you need to minimize its work by taking care of your objects' references
### Global Variables
- As they have a direct path to the root node, they will stay in memory as long as the application is running
- so you need to be careful when setting global variables and the amount of data you’ll set to them
### Multiple References
- Setting multiple references to the same object may cause a problem
- also as you may remove one ref and forget the other which will keep your object still exists in the Heap
### Closures
- In closures simply you keep references to objects to be used later
- this feature has many advantages but if it’s used without caution
  - it may cause big issues as these references will keep objects in heap and these objects might be large ones, not just simple objects
#### Run app with garbage collector attach to chrome debugger options
> node --expose-gc --inspect=9222 app.js
