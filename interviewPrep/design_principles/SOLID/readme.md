# SOLID

## [Single Responsibility Principle](./SingleResponsibilityPrinciple/readme.md)

- A class should have one and only one reason to change, meaning that a class should have only one job

## [Open Closed Principle](./OpenClosedPrinciple/readme.md)

- Objects or entities should be open for extension but closed for modification

## [Linskov Substitution Principle](./LiskovSubstitutionPrinciple/readme.md)

- Let `Q(x)` be a property provable about objects x of type T
  - Then `Q(y)` should be true for objects y of type S where S is a subtype of T
- in another words
  - objects of a superclass should be replaceable with objects of its subclasses without breaking the application

## [Interface Segregation Principle](./InterfaceSegregationPrinciple/readme.md)

- A client should never be forced to implement an interface that it does not use, or clients should not be forced to depend on methods that they do not use

## [Dependency Inversion Principle](./DependencyInversionPrinciple/readme.md)

- High-level modules should not depend on low-level modules
  - Both should depend on abstractions
  - Abstractions should not depend on details
  - Details should depend on abstractions
