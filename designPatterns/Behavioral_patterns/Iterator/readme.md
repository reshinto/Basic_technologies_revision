# Iterator design pattern

- it allows sequential traversal through a complex data structure without exposing its internal details

## Problem

- most collection store their elements in simple list
  - however some are based on stacks, trees, graphs, and other complex data structures
- regardless of how a collection is structured, it must provide some way of accessing its elements so that other code can use it
- sounds like an easy job that can be done just by looping over all the elements
  - but how do you sequentially traverse elements of a complex data structure (e.g.: tree)
    - 1 day you might need depth first traversal, another day you might need breadth first traversal, another day you might need something else like random access

## Solution

- extract the traversal behavior of a collection into a separate object called an iterator
  - the iterator object encapsulates all of the traversal details

## Real world Analogy

- you are lost and wished to arrive at a certain destination
- solution
  1.  walk around and try to find the destination, you might waste a lot of time walking in circles, or not find the destination
  2.  download a navigation app for navigation. smart and inexpensive
  3.  spend some money and hire a local guide
- these 3 solutions act as iterators over the vast collections of destinations you wish to go

## Structure

![Iterator](../../images/iterator.png)

1. The Iterator interface declares the operations required for traversing a collection: fetching the next element, retrieving the current position, restarting iteration, etc.

2. Concrete Iterators implement specific algorithms for traversing a collection.

   - The iterator object should track the traversal progress on its own.
   - This allows several iterators to traverse the same collection independently of each other.

3. The Collection interface declares one or multiple methods for getting iterators compatible with the collection.

   - Note that the return type of the methods must be declared as the iterator interface so that the concrete collections can return various kinds of iterators.

4. Concrete Collections return new instances of a particular concrete iterator class each time the client requests one.

   - You might be wondering, where’s the rest of the collection’s code? Don’t worry, it should be in the same class.
   - It’s just that these details aren’t crucial to the actual pattern, so we’re omitting them.

5. The Client works with both collections and iterators via their interfaces.
   - This way the client isn’t coupled to concrete classes, allowing you to use various collections and iterators with the same client code.
   - Typically, clients don’t create iterators on their own, but instead get them from collections.
   - Yet, in certain cases, the client can create one directly; for example, when the client defines its own special iterator.
