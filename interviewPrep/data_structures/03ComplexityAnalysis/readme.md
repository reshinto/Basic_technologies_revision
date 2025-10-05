# Complexity Analysis
- the process of determining how efficient an algorithm is
  - usually involves finding both the time and space complexity of an algorithm
- it is effectively used to determine how "good" an algorithm is and whether is it "better" than another one

# Time Space Complexity
## Time complexity
* The amount of time an algorithm takes to run
## Space complexity
* The amount of memory or RAM an algorithm needs to run
* It is the measuring of how much extra space the algorithm requires as a function of the input
    * Has 2 types
      1. In place
          * O(1) or Olog(N)
          * The space the algorithm takes is predictable and does not depend on the size of the input
      2. Out of place
          * O(N) or O(N^2)
          * The algorithm uses an extra array, or more, into which to sort the values
## Cases
### The best case (Big Omega, Ω)
### The Average case (Big Theta, Θ)
### The Worst case (Big O)

# Big O of Objects
* When to use objects?
  * when you don't need order
  * when you need fast access / insertion and removal
* Insertion: O(1)
* Removal: O(1)
* Searching: O(N)
    * this is not looking for a key
    * it is about checking to see if a given piece of information is in a value somewhere
        * check each key to see if value is the one we are searching for
* Access: O(1)

## Big O of Object Methods
* Object.keys: O(N)
* Object.values: O(N)
* Object.entries: O(N)
* hasOwnProperty: O(1)


# Big O of Arrays
* When to use arrays?
  * when you need order
  * when you need fast access / insertion and removal (sort of...)
* Insertion: it depends
    * push: O(1)
    * insert at a specific index: every element that is indexed after the newly inserted element will need to be reindexed
        * speed depends on the size of array
* Removal: it depends
    * pop: O(1)
    * remove at a specific index: every element that is index after the removed element will need to be reindexed
        * speed depends on the size of array
* Searching: O(N)
* Access: O(1)

## Big O of Array Methods
* push: O(1)
* pop: O(1)
* shift: O(N)
* unshift: O(N)
* concat: O(N)
* slice: O(N)
* splice: O(N)
* sort: O(N*logN)
* forEach/map/filter/reduce/etc.: O(N)


# Recursion
* Invoke the same function with a different input until you reach your base case
* 2 essential parts of recursive function
  * Base case
  * Different Input

## Base Case
* The condition when the recursion ends.

## Common Recursion Pitfalls
* No base case
* Forgetting to return or returning the wrong thing
* Stack overflow
  * RangeError: Maximum call stack size exceeded

# Comparison between Arrays and Linked Lists
## Linked Lists
* Do not have indexes
* Connected via nodes with a next pointer
* Random access is not allowed
## Arrays
* Indexed in order
* Insertion and deletion can be expensive
* Can quickly be accessed at a specific index

# Sorting
|Sort|Best Case|Average Case|Worst case|Space|Stability|Sorting Method|
|----|---------|------------|----------|-----|---------|--------------|
|Bubble sort|Ω(N)|Θ(N^2)|O(N^2)|O(1)|Stable|Comparison|
|Insertion sort|Ω(N)|Θ(N^2)|O(N^2)|O(1)|Stable|Comparison|
|Bucket sort|Ω(N+K)|Θ(N+K)|O(N^2)|O(N+K)|Stable|Distribution|
|Radix sort|Ω(NK)|Θ(NK)|O(NK)|O(N+K)|Stable|Distribution|
|Merge sort|Ω(N log(N))|Θ(N log(N))|O(N log(N))|O(N)|Stable|Comparison|
|Quick sort|Ω(N log(N))|Θ(N log(N))|O(N^2)|O(log(N))|Unstable|Comparison|
