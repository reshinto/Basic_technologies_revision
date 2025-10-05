# Decorator design pattern

- lets you attach new behaviors to objects by placing these objects inside special wrapper objects that contain the behaviors.

## Definition

- original definition
  - Attach additional responsibilities to an object dynamically
  - decorators provide a flexible alternative to sub classing for extending functionality
- a good way to define pluggable behaviors and features for clients that do not alter their original function but add extra abilities
- also known as a wrapper pattern
  - when used with functions, a decorator ingests a function and returns back a function
    - this way it behaves as a higher order function
- example
  - the react framework uses the concept of higher order components
    - which results in a component gaining extra abilities and functionality

## Problem

- In a notification library which lets other programs notify their users about important events
  - the initial version of the library was based on the Notifier class that had a few fields, a constructor and a single send method
  - the method could accept a message argument from a client
    - and send the message to a list of emails that were passed to the notifier via its constructor
  - a 3rd party app which acted as a client was supposed to create and configure the notifier object once
    - and then use it each time something important happened
- then you realize that users of the library expect more than just email notifications
  - many of them want to receive SMS about critical issues
  - others want to be notified on Facebook
  - corporate users want to get Slack notifications
- if you try to extend the Notifier class
  - and put the additional notification methods into new subclasses
    - now the client needs to instantiate the desire notification class
    - and use it for all further notifications
- but if someone asked you to use several notification types at once
  - can try to address that problem by creating special subclasses
    - which combined several notification methods within 1 class
  - however, this approach would bloat the code immensely
    - for both the library code and the client code
- thus a need to find some other way to structure notifications classes so that their number won't accidentallly break some record

## Solution

- extending a class is the 1st thing that comes to mind when needed to alter an object's behavior
  - however, inheritance has several serious caveats that we need to be aware of
    - inheritance is static
      - we can't alter behavior of an existing object at runtime
      - can only replace the whole object with another 1 that's created from a different subclass
    - subclasses can have just 1 parent class
      - in most languages, inheritance doesn't let a class inherit behaviors of multiple classes at the same time
- To overcome these caveats is by using Aggregation or Composition instead of inheritance
  - both alternatives work almost the same way
    - 1 object has a reference to another and delegates it some work
    - whereas with inheritance, the object itself is able to do that work
      - inheriting the behavior from its superclass
- with this new approach, can easily substitute the linked helper object with another
  - changing the behavior of the container at runtime
  - an object can use the behavior of various classes
    - having references to multiple objects and delegating them all kinds of work
  - aggregation / composition is the key principle behind many design pattersn including decorator
- Wrapper is the alternative nickname for the Decorator pattern that clearly expresses the main idea of the pattern
  - a wrapper is an object that can be linked with some target object
  - the wrapper contains the same set of methods as the target and delegates to it all requests it received
  - however, the wrapper may alter the result by doing something either before or after it passes the request to the target
- when does the wrapper become a real decorator
  - the wrapper implements the same interface as the wrapped object
    - from the client's perspective, these objects are identical
  - make the wrapper's reference field accept any object that follows that interface
    - this will let you cover an object in multiple wrappers, adding the combined behavior of all the wrappers to it
- in the notification example, leave the simple email notification behavior inside the base Notifier class
  - but turn all other notification methods into decorators
  - the client code would need to wrap a basic notifier object into a set of decorators that match the client's peferences
    - the resulting objects will be structures as a stack
      - the last decorator in the stack would be the object that the client actually works with
      - since all decorators implement the same interface as the base notifier
        - the rest of the client code won't care whether it works with the pure notifier object or the decorated one
  - the same approach could be applied to other behaviors such as formatting messages or composing the recipient list
    - the client can decorate the object with any custom decorats
      - as long as they follow the same interface as the others

## Analogy

- wearing clothes is an example of decorators
  - when you're cold, you wrap yourself in a sweater
  - if you're cold with a sweater, you can wear a jacket on top
  - if it's raining, you can put on a raincoat
  - all of these garments extend your basic behavior but aren't part of you
    - you can easily take off any piece of clothing whenever you don't need it

## Structure

![Decorator](../../images/decorator.png)

1. The Component declares the common interface for both wrappers and wrapped objects.

2. Concrete Component is a class of objects being wrapped.

   - It defines the basic behavior, which can be altered by decorators.

3. The Base Decorator class has a field for referencing a wrapped object.

   - The field’s type should be declared as the component interface so it can contain both concrete components and decorators.
   - The base decorator delegates all operations to the wrapped object.

4. Concrete Decorators define extra behaviors that can be added to components dynamically.

   - Concrete decorators override methods of the base decorator and execute their behavior either before or after calling the parent method.

5. The Client can wrap components in multiple layers of decorators, as long as it works with all objects via the component interface.

## When to use

- Use the Decorator pattern when you need to be able to assign extra behaviors to objects at runtime without breaking the code that uses these objects

  - The Decorator lets you structure your business logic into layers,
    - create a decorator for each layer
    - and compose objects with various combinations of this logic at runtime
  - The client code can treat all these objects in the same way, since they all follow a common interface

- Use the pattern when it’s awkward or not possible to extend an object’s behavior using inheritance
  - Many programming languages have the `final` keyword that can be used to prevent further extension of a class
    - For a final class, the only way to reuse the existing behavior would be to wrap the class with your own wrapper, using the Decorator pattern

## How to implement

1. Make sure your business domain can be represented as a primary component with multiple optional layers over it
2. Figure out what methods are common to both the primary component and the optional layers
   - Create a component interface and declare those methods there
3. Create a concrete component class and define the base behavior in it
4. Create a base decorator class
   - It should have a field for storing a reference to a wrapped object
   - The field should be declared with the component interface type to allow linking to concrete components as well as decorators
   - The base decorator must delegate all work to the wrapped object
5. Make sure all classes implement the component interface
6. Create concrete decorators by extending them from the base decorator
   - A concrete decorator must execute its behavior before or after the call to the parent method (which always delegates to the wrapped object)
7. The client code must be responsible for creating decorators and composing them in the way the client needs

## Pros & Cons

### Pros

- can extend an object’s behavior without making a new subclass
- can add or remove responsibilities from an object at runtime
- can combine several behaviors by wrapping an object into multiple decorators
- Single Responsibility Principle
  - can divide a monolithic class that implements many possible variants of behavior into several smaller classes

### Cons

- It’s hard to remove a specific wrapper from the wrappers stack
- It’s hard to implement a decorator in such a way that its behavior doesn’t depend on the order in the decorators stack
- The initial configuration code of layers might look pretty ugly

## Summary

- the decorator pattern, ingests a function and returns back a function
- decorators can be used to add features and function to existing objects dynamically
- implemented as higher order functions

### Javascript

- the TC39 has proposed the decorator (@decorator) syntax for use with classes and class methods
- until the format is released, the decorator syntax can be implemented using the babel complier

### Python

- the decorator design pattern is NOT the same as the python decorator / function wrapper
