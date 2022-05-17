# Memory Management
## Java Memory
- when app run, need access to some of computer's memory to store the objects that we create and hold in memory
### The Stack
- every thread has its own stack
- it is managed by the Java Virtual Machine (JVM)
- java knows exactly when data on the stack can be destoryed
- stack works as First In Last Out structure (FILO)
  - each time a function is called, java pushes the local variables for that function on to the stack
  - the local variables are automatically popped from the stack when it reaches the close of the block that create that variable
- data on the stack can only be seen by the thread that owns the stack
- the stack is a tightly managed structure and java can maintain very tight scoping rules with the stack
- stacks are great for local variables because we want a local variable to have a short lifetime
### The Heap
