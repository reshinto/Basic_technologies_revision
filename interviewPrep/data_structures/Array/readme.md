# Array

- linear collection of data values that are accessible at numbered indices, starting at index 0
- the following are an array's standard operations and their corresponding time complexities

### initializing an array: O(n) time and space

- first specify a length N
- OS would then go to memory and find N multiplied by 8 memory slots (for a 64 bit OS) that are free and are back to back
- therefore, as N increases, the time it takes to initialize the array will also increase, the space will also increase depending on N

### traversing an array: O(n) time and O(1) space

- OS will traverse every memory slot (8 x N for a 64 bit integers)
  - number of memory slots to traverse depends on N
  - no additional space is required therefore space complexity is constant

### copying the array: O(n) space and time

- OS will traverse the entire array
- then it will initialize a new array of the same length with the same values

### accessing a value at a given index: O(1) time and space

- what happens behind the hood is the Operating System is finding the memory address that starts the array
  - then it checks how many bytes or memory slot does 1 element take up
    - if it is 64 bit, it is 8 bytes
    - the OS would then know that 1 element of an array will take 8 memory slots for a 64 bit OS
  - then it checks what index you specified and calculate the memory address
- no memory is being used during this process therefore space complexity is constant

### updating a value at a given index: O(1) time and space

- knows where the index is located as it does the same computation as to accessing the array
- then it swap old binary numbers with the new binary numbers
- therefore no new additional memory is being used

### inserting a value at the beginning: O(n) time, O(1) space

- the old array will be copied, and then the OS will look for another memory location that has the new space required
  - this is because the memory slot that is after the end of the old array is not guaranteed to be free, therefore you can't shift or add new memory slots
- space is constant because although creating new space is linear, it will also free up the old memory that was taken up by the old array

### inserting a value in the middle: O(n) time, O(1)space

- same concept as inserting a value at the beginning

### inserting a value at the end:

- amortized O(1) time, O(1) space when dealing with a dynamic array
  - because dynamic arrays are allocated almost double the memory size of what is actually required, adding new values to the end of the array only requires appending
  - only when the array memory has been filled up, would the array be copied and given double the memory slots that is newly required
    - during this case, time complexity becomes O(n)
      - however this can usually be ignored unless interviewer wants you to consider all cases
- O(n) time, O(1) space when dealing with a static array
  - same concept as inserting a value at the beginning

### removing a value at the beginning: O(n) time, O(1) space

- time complexity is linear because you have to shift all of the affected elements
- space is constant because no additional space is being created

### removing a value in the middle: O(n) time, O(1) space

- similar to removing a value at the beginning

### removing a value at the end: O(1) space and time

- the only thing done is freeing up the space of the last element

## Static array

- is an implementation of an array that allocates a fixed amount of memory to be used for storing the array's values
  - appending values to the array involves copying the entire array and allocating new memory for it, accounting for the extra space needed for the newly appended value
  - this is linear-time operation

## Dynamic array

- is an implementation of an array that preemptively allocates double the amount of memory needed to store the array's values
  - appending values to the array is a constant-time operation until the allocated memory is filled up
    - the array is copied and double the memory is once again allocated for it
  - this implementation leads to an amortized constant-time insertion-at-end operation
- a lot of popular programming languages like JavaScript and Python implements arrays as dynamic arrays
- in C++ and Java, dynamic arrays are respectively referred to as Vectors and ArrayLists
