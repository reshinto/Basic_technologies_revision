# Designing Good Classes

- Classes bind related data and expose functions that operate on that data
  - This helps make the code more organized
- There are many design principles and patterns that can help make our code better organized
  - Let's look at some rules which can help us design better classes
    - Organized and Encapsulated
    - Should be small and should do just one thing
    - Small number of instance variables

## Organized and Encapsulated

- A class should keep all data attributes and utility functions private
  - Only the functions that are supposed to be exposed should be kept public
- A class should be ordered like this
  - Start with the variables
    - public static constants
    - followed by private static attributes
    - followed by private instance attributes
  - followed by public functions
  - private utility function just after the public function that calls it

## Should be small and should do just one thing

- A class should be very small. Different experts have different views on `how small?`
  - Based on most of the views, a class should be small enough that it does just one thing
  - In general, it should have less than 20 functions
- If a class does more than one thing then it should be broken down into different classes each of which does a single thing

## Small number of instance variables

- A class should have strong cohesion
  - i.e., the functions of a class should be strongly related in supporting a single central purpose
- A maximal cohesive class is one in which all functions work with all the instance variables
  - Achieving that is pretty difficult
  - We should try to make our classes as cohesive as possible
  - This can be done by having a smaller number of instance variables such that each function in the class work with as many of the instance variables as possible
  - This can be done by splitting the class into multiple classes based on the responsibility of each class
