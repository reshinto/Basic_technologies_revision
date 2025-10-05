# Overview
## Runtime
- usually do not consider constants when analyzing the time complexity
- usually want to find the "family" of functions that most closely the growth in computational time
- e.g.: `O(2n)`, `O(5n)` can be loosely said to belong the family of functions `O(n)`
  - common convention to simply consider it an `O(n)` function and discard the constant
- however important to be careful of constants
  - sometimes a sufficiently bad constant can increase runtime substantially
  - In some specific cases one may want to consider optimizing algorithms to have a better constant
### O(1)
- Constant time complexity
- e.g.:
  - Hashmap lookup
  - Finding and applying math formula
### O(log(N))
- grows VERY slowly
- lookup by primary key in a relational database is log(N)
  - many mainstream relational databases such as postgres use B-trees for indexing by default
  - search in B-tree is log(N)
- e.g.:
  - Binary search or variant
  - Balanced binary search tree lookup
### O(N)
- Linear time normally means looping through a linear data structure a constant number of times
- e.g.:
  - Going through array/linked list
  - Two pointers
  - Some types of greedy
  - Tree/graph traversal
  - Stack/Queue
### O(K log(N))
- Heap push/pop K times
- When you encounter problems that look for the "top K elements"
  - you can usually solve them with pushing and popping to a heap, K times
- e.g.:
  - K closest points
  - merge K sorted lists
  - Binary search K times
### O(N log(N))
- Sorting
  - The default sorting algorithm's expected runtime in all mainstream languages
    - e.g. java uses a variant of merge sort for object sorting and a variant of quick sort for primitive type sorting
- Divide and conquer with a linear time merge operation
  - Divide is normally `log(N)`, and if merge is `O(N)` then the overall runtime is `O(N log(N))`
- e.g.:
  - smaller numbers to the right
### O(N^2)
- quadratic time
- Nested loops
- For small N < 1000, is not that bad for modern computers
  - can probably pass most Leetcode tests with quadratic time for small Ns
  - However, in an interview, solution usually has to do better than quadratic time to impress the interviewer
- e.g.:
  - Many brute force solutions
  - visiting each matrix entry
### O(2^N)
- Grows very rapidly
- Often requires memoization to avoid repeated computations and reduce complexity
- e.g.:
  - Combinatorial problems
  - backtracking
    - subsets
### O(N!)
- Grows insanely rapidly
- Only solvable by computers for small N
- Often requires memoization to avoid repeated computations and reduce complexity
- e.g.:
  - Combinatorial problems
  - backtracking
    - permutations
## Keywords
### Top k
- Heap
  - K closest points
### How many ways..
- DFS
  - Decode ways
- DP
  - Robot paths
### Substring
- Sliding window
  - Longest substring without repeating characters
### Palindrome
- two pointers
  - Valid Palindrome
- DFS
  - Palindrome Partitioning
- DP 
  - Palindrome Partitioning 2
### Tree
- shortest, level-order
  - BFS
    - Binary tree level-order traversal
- else
  - DFS
    - Max Depth
### Parentheses
- Stack
  - Valid Parentheses
### Subarray
- Prefix sum
  - Subarray sum
- Hashmap
  - Continuous subarray sum
### X Sum
- Two pointer
  - Two sum
### Max/longest sequence
- Dynamic programming, DFS
  - Longest increasing subsequence
- mono deque
  - Sliding window maximum
### Minimum/Shortest
- Dynammic programming, DFS
  - Minimal path sum
- BFS
  - Shortest path
### Partition/split ... array/string
- DFS
  - Decode ways
### Subsequence
- Dynamic programming, DFS
  - Longest increasing subsequence
- Sliding window
  - Longest increasing subsequence
### Matrix
- BFS, DFS
  - Flood fill, Islands
- Dyanmic programming
  - Maximal square
### Jump
- Greedy/DP
  - Jump game
### Game
- Dynamic programming
  - Divisor game, Stone game
### Connected component, Cut/remove, Regions/groups/connections
- Union Find
  - Number of connected components, Redundant connections
### Transitive relationship
- If the items are related to one another and the relationship is transitive
  - then chances are we can build a graph and use BFS or Union Find
    - string converting to another, BFS
      - Word Ladder
    - string converting to another, BFS, Union Find
      - Sentence Similarity
    - numbers having divisional relationship, BFS, Union Find
      - Evaluate Division
### Interval
- Greedy
  - sort by start/end time and then go through sorted intervals Interval Pattern
