# Interface

- OOP is directly related to messages sent between objects
- it is important for objects to know what behavior they have inside, on whom they depend (to whom messages are sent)
  - and also how they communicate with each other
- Objects communicate through interfaces
- What do interfaces give us?
  - The presence of interfaces allows you to think about the task in a more abstract way, ignoring minor details
  - There are different levels of abstraction or ignorance of details

### Public Interfaces

- Reveal its primary responsibility
- Are expected to be invoked by others
- Will not change on a whim
- Are safe for others to depend on
- Are thoroughly documented in the tests

### Private Interfaces

- Handle implementation details
- Are not expected to be sent by other objects
- Can change for any reason whatsoever
- Are unsafe for others to depend on
- May not even be referenced in the tests

## When Should a Class Implement an Interface?

1. Class implements Strategy pattern, or it is part of family of objects

   - IRepository, IFormatter, IPrecondition

2. Class implements role interface (as a result of ISP: Interface Segregation Principle)

   - ICloneable, IComparable

3. Class implements interface required for connection with other classes

   - Class is an Adapter, the need for an interface is determined by DIP (Dependency Inversion Principle)

4. Class implements interface, because external environment depends on it

   - Provides testability to users of this class
   - This is not a single reason to create an interface

## When Should a Class Depend on an Interface?

- getting it through the constructor
  - The arguments of the class indicate that it cannot take some decision on its own, and it needs help from the called class
  - It's easiest when a class depends on primitives, a little more complicated when it depends on specific classes, and most difficult when it depends on an interface

1. Class deals with family of types

   - the "family of types" exists already and defined by requirements of existing model

2. As a result of DIP

   - class wants to communicate with object of another level, it defines the interface by itself and requires its implementation

3. For testing purposes: useful in case if implementation of the abstraction relies on external environment

## Interface vs Abstract Class

| Parameters            | Interface                                   | Abstract class                  |
| --------------------- | ------------------------------------------- | ------------------------------- |
| Multiple inheritances | Implement several interfaces Only           | one abstract class              |
| Structure             | Abstract methods                            | Abstract & concrete methods     |
| When to use           | Future enhancements                         | To avoid independence           |
| Adding new methods    | Could be hard                               | Easy to do                      |
| Access modifiers      | Only public                                 | Public, protected, private      |
| Usage                 | Defines the peripheral abilities of a class | Defines the identity of a class |

- An interface is more flexible from a client's point of view: any class can implement any interface

  - But the interface is "stiffer" from the point of view of its developer
    - it is more difficult to change it (the work of all clients will be broken)
    - restrictions cannot be imposed on the client's constructor
    - the code cannot be reused
  - Important Reasons For Using Interfaces:
    - Interfaces are used to achieve abstraction
    - Designed to support dynamic method resolution at run time
    - It helps you to achieve loose coupling
    - Allows you to separate the definition of a method from the inheritance hierarchy

- An abstract class is "stiffer" from the clients' point of view: the client will be forced to abandon the current base class
  - But an abstract class is "more flexible" from the point of view of its developer
    - it allows you to reuse code
    - restrict the constructor of descendants
    - allow you to make changes (easily add a virtual method without breaking existing clients)
    - more clearly define a "contract" with descendants using Template Methods
  - Important Reasons For Using Abstract Class:
    - Abstract classes offer default functionality for the subclasses
    - Provides a template for future specific classes
    - Helps you to define a common interface for its subclasses
    - Abstract class allows code reusability

## Summary: Creating a Message-Based Application

1. Create Explicit Interfaces
   - every time you create a class, declare its interfaces
   - Methods in the public interface should:
     - Be explicitly identified as such
     - Be more about what than how
     - Have names that, insofar as you can anticipate, will not change
2. Honor the Public Interfaces of Others
   - do your best to interact with other classes using only their public interfaces
3. Exercise Caution When Depending on Private Interfaces
   - despite your best efforts, you may find that you must depend on a private interface, this is a dangerous dependency that should be isolated
4. Minimize Context
   - construct public interfaces with an eye toward minimizing the context they require from others
   - Keep the what versus how distinction in mind
   - create public methods that allow senders to get what they want without knowing how your class implements its behavior
