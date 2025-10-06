# Algorithms

- it is any well-defined computational procedure that takes some value, or set of values as input and produces some value, or set of values, as output
  - it is a sequence of computational steps that transform the input into the output
- it is also a tool for solving a well-specified computational problem
  - The statement of the problem specifies in general terms the desired input/output relationship
  - The algorithm describes a specific computational procedure for achieving that input/output relationship

## Algorithm Characteristics

- Algorithms usually have a specific set of input values that it can work with to get a result
  - For example, sorting algorithms take collections of data values and try to order them
- can also talk about the classification of an algorithm using a variety of criteria
  - Some algorithms operate on their datasets sequentially, which means they are sequential in nature
  - Whereas a parallel algorithm can split a dataset into smaller pieces and then work with each one at the same time
- The algorithm can be exact by producing a known predictable value
  - it can also be approximate by trying to find an answer that may not be consistent
  - For example, a face recognition algorithm may not give the same answer every time with the same face
- Algorithms can be deterministic, where they perform each step with an exact solution
  - it can be non-deterministic if they try to find a solution using consecutive guesses that become more accurate over time

## Common Algorithms

### Search Algorithms

- it find specific data in structure
  - for example, a substring within a string
- One of the most common types of algorithms you come across is search algorithms, which are used when you need to find a piece of data within a larger data structure
  - For example, searching for a substring within a larger string, or perhaps searching for a file in a set of subfolder in the file system

### Sorting Algorithms

- Take a dataset and apply a sort to order it
- Sorting algorithms are another very common type used when working with ordered datasets
  - they take a dataset and put them in a specific order

### Computational Algorithms

- Computational algorithms are used to get from one dataset to another
  - example, calculating whether a given number is a prime number, or perhaps converting a temperature from one scale to another

### Collection Algorithms

- Work with collections of data
  - count specific items, navigate among data elements, filter out unwanted data etc.
- there are collection algorithms that involve manipulating or navigating between sets of data that are stored in a particular structure
  - examples, counting the number of specific items, filtering out unwanted data, etc.

## Algorithm Performance

- algorithms are designed to work with datasets and solve computational problems
  - it is important to understand how to talk about the performance of an algorithm
  - This is an important factor in how you choose a particular algorithm for solving a computational problem, as well as understanding how your program will behave in different circumstances
- if we want to measure how the performance of an algorithm changes based on the size of the input dataset
  - use the term called `Big-O notation` to describe the performance of an algorithm
    - This notation format is used to describe how a particular algorithm works as the input data set grows over time
    - the reason the letter `O` is used is that the rate at which the complexity of an algorithm grows is also called order of operation
      - It usually describes a worst-case scenario of how long it will take to complete a given operation
      - it's important to note that many algorithms and data structures have more than one Big-O value
      - For example, data structures can usually perform several types of operations, such as inserting or searching for values, each with its own order of operations

## Correctness of Algorithm

- An algorithm is considered correct if, at any admissible (for a given problem) input, it finishes its work and produces a result that meets the requirements of the problem
  - In this case, the algorithm is said to solve the given computational problem
- An incorrect algorithm (for some input) may not stop at all or give an incorrect result
  - but this does not mean that such algorithms are completely useless
  - If errors are rare enough, or it is possible to control the frequency of errors, we may admit the use of incorrect algorithms
  - It may be that initially we have a specific task with one data set, and we have compiled an algorithm
    - Then some new data begins to arrive, there are not many of them, but with them the algorithm slows down significantly
    - But since there is little such data so far, the algorithm is quite working

## Analyzing Algorithm

- Analyzing an algorithm has come to mean predicting the resources that the algorithm requires
  - Occasionally, resources such as memory, communication bandwidth, or computer hardware are of primary concern, but most often it is computational time that we want to measure
  - Generally, by analyzing several candidate algorithms for a problem, we can identify a most efficient one
  - Such analysis may indicate more than one viable candidate, but we can often discard several inferior algorithms in the process
- Before we can analyze an algorithm, we must have a model of the implementation technology that we will use, including a model for the resources of that technology and their costs
  - we will assume a generic one processor, random-access machine (RAM) model of computation as our implementation technology and understand that our algorithms will be implemented as computer programs
  - In the RAM model, instructions are executed one after another, with no concurrent operations
