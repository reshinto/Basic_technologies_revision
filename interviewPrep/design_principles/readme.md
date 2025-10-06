# Design Principles

## Overview

- there are **formal measurable criteria** that describe the quality of the code or design
  - examples
    - the cyclomatic complexity of methods
    - the depth of the inheritance hierarchy
    - the number of method lines
- they are useful and keeping these values in the normal range is necessary but not sufficient condition for good software design
- in addition to formal criteria, there are common concepts of good design
  - e.g.: `low coupling and high cohesion`
- there are design principles **between formal and informal criteria**
  - design principles are rules that experienced designers rely on
  - main goal is to describe in simple words what is `good and bad` in software design
- design principles are used to combat complexity and make it easier to introduce changes needed
- disadvantage of `separation through delegation`
  - the inability to inherit and compose properties from several objects at once
    - when creating a new adapter, you need to find all the places where you want to use it
  - in the need to introduce a new entity or layer in the form of, for example, adapters, which can increase the complexity
    - it is necessary to add 1 more abstraction to the project code base

## Code Smells

### Rigidity

- hard to change

### Fragility

- easy to break

### Immobility

- hard to reuse

### Viscosity

- hard to choose the right way to introduce changes

### Needless complexity

- over design

## Low Coupling and High Cohesion

- these concepts are useful, but are also too abstract and informal
- it characterizes a stable system
  - allows you to design the system so that the modules are interchangeable with other

### Low coupling

- modules should be as independent as possible from other modules
  - so that changes to modules do not heavily impact other modules

### High cohesion

- keep elements of the module that are related to the functionality that module provides as close to each other as possible

## [SOLID](./SOLID/readme.md)

- when the application has only 200 lines
  - the design itself is not needed
  - it is enough to write 5 - 7 methods carefully and everything will be fine
  - problems might arise when the system grows and requires scaling
- `SOLID` is an acronym used for the first 5 object-oriented principles by `Robert C. Martin` also known as `Uncle Bob`
  - he did not invent or discover them
  - but structured and combined them into a set of 5 principles commonly known as `SOLID`
- these principles establish the practices that tend to develop software with considerations for maintaining and extending as the project grows
  - adopting these practices can also contribute to avoiding code smells, refactoring code, and agile or adaptive software development

### [Single-responsibility Principle](./SOLID/SingleResponsibilityPrinciple/readme.md)

### [Open-closed Principle](./SOLID//OpenClosedPrinciple/readme.md)

### [Liskov Substitution Principle](./SOLID//LiskovSubstitutionPrinciple//readme.md)

### [Interface Segregation Principle](./SOLID/InterfaceSegregationPrinciple/readme.md)

### [Dependency Inversion Principle](./SOLID/DependencyInversionPrinciple/readme.md)

## [Don't Repeat Yourself](./DRY/readme.md)

- it is a principle of software development that aims at reducing the repetition of patterns and code duplication in favor of abstractions and avoiding redundancy

## [Keep it simple, stupid](./KISS/readme.md)

- it is a design principle which states that designs and/or systems should be as simple as possible
  - Wherever possible, complexity should be avoided in a system—as simplicity guarantees the greatest levels of user acceptance and interaction

## [You Aren't Gonna Need It](./YAGNI/readme.md)

- it is a practice in software development which states that features should only be added when required
  - As a part of the extreme programming (XP) philosophy, YAGNI trims away excess and inefficiency in development to facilitate the desired increased frequency of releases

## [Big Design Up Front](./BDUF/readme.md)

- you should spend more time fully designing the application before you even write the first line of code

## [Separation Of Concerns](./SOC/readme.md)

- if you’re designing a system that deals with several concepts, you want to group your functions into modules depending on what they have to deal with

## [Curly's Law](./curlyLaw/readme.md)

- it is about choosing a single, clearly defined goal for any particular bit of code: Do One Thing

## Premature Optimization is the Root of All Evil

- Programmers waste enormous amounts of time thinking about or worrying about, the speed of noncritical parts of their programs, and these attempts at efficiency actually have a strong negative impact when debugging and maintenance are considered
  - We should forget about small efficiencies, say about 97% of the time
    - premature optimization is the root of all evil
  - Yet we should not pass up our opportunities in that critical 3%

## Boy-Scout Rule

- Any time someone sees some code that isn't as clear as it should be, they should take the opportunity to fix it right there and then
  - or at least within a few minutes
- This opportunistic refactoring is referred to by Uncle Bob as following the boy-scout rule
  - always leave the code behind in a better state than you found it
- The code quality tends to degrade with each change
  - This results in technical debt
  - The Boy-Scout Principle saves us from that

## Code for the Maintainer

- Code maintenance is an expensive and difficult process
  - Always code considering someone else as the maintainer and making changes accordingly even if you're the maintainer
  - After a while, you'll remember the code as much as a stranger
- Always code as if the person who ends up maintaining your code is a violent psychopath who knows where you live

## Principle of Least Astonishment

- Principle of Least Astonishment states that a component of a system should behave in a way that most users will expect it to behave
  - The behavior should not astonish or surprise users
- Code should do what the name and comments suggest
  - Conventions should be followed
  - Surprising side effects should be avoided as much as possible

## Hide Implementation Details

- Hiding implementation details helps to make changes in a component without making changes in the other modules/clients using that component
  - This can be achieved by creating interfaces and using them instead of the concrete classes
- Encapsulation with proper access management should also be done to expose only the required public functions

## Maximize Cohesion

- Cohesion is the degree to how strongly related and focused are the various responsibilities of a module
  - It is a measure of the strength of the relationship between the class’s methods and data themselves
  - We should strive to maximize cohesion
  - High cohesion results in better understanding, maintaining, and reusing components
- Cohesion is increased if
  - The functionalities embedded in a class, accessed through its methods, have much in common
  - Methods carry out a small number of related activities, by avoiding coarsely grained or unrelated sets of data
  - Related methods are in the same source file or otherwise grouped together
    - for example, in separate files but in the same sub-directory/folder

## Minimize Coupling

- Coupling is the degree to which each module depends on other modules; a measure of how closely connected two modules are
  - We should strive to minimize coupling
- Coupling is usually contrasted with cohesion
  - Low coupling often correlates with high cohesion and vice versa
- Tightly coupled modules have the following disadvantages
  - Change in one module might break another module
  - Change in one module usually forces a ripple effect of changes in other modules
  - Reusability decreases as dependency over other modules increases
  - Assembly of modules might require more effort and/or time
- Coupling can be reduced by
  - By hiding inner details and interacting through interfaces
  - Avoid interacting with classes that it can avoid directly dealing with
- Components in a loosely coupled system can be replaced with alternative implementations that provide the same services

## [Law of Demeter / Principle of Least Knowledge](./lawOfDemeter/readme.md)

- Code components should only talk to its direct relations and not to strangers

## [Design by Contract](./designByContract/readme.md)

- it is a software correctness methodology
  - It prescribes that software designers should define formal, precise and verifiable interface specifications for software components
  - which extend the ordinary definition of abstract data types with preconditions, postconditions and invariants

## Command-Query Separation (CQS)

- it states that every method should either be a command that performs an action, or a query that returns data to the caller, but not both
  - In other words, asking a question should not change the answer
- Query
  - Returns a result without changing the state
- Command
  Changes the state but does not return any value
- This way the query method could be used anywhere without changing the data / state
  - We should apply naming conventions (get, set, add, etc.) to imply whether it is a command or a query

## [Meaningful Variable Names](./meaningfulVariableNames/readme.md)

- variable names might be easy to write but it makes the code difficult to read and makes debugging more time-consuming

## [Designing Good Functions](./designingGoodFunctions/readme.md)

- A good function allows understanding it without going into lower-level details unless required

## [Designing Good Classes](./designingGoodClasses/readme.md)

- Classes bind related data and expose functions that operate on that data
  - This helps make the code more organized

## [Minimum Viable Product](./MVP/readme.md)

- it represents the minimum amount of functionality your product needs to have in order to understand how viable it is in reality

## [Proof Of Concept](./POC/readme.md)

- It normally comes before the MVP and it is only meant as a practical proof that the core functionality of what you’re trying to build is possible

## Anti SOLID

### Anti-SRP

- `Blurred` responsibility principle:
  - classes are split into many small classes, resulting in logic being spread across multiple classes and/or modules

### Anti-OCP

- Factory-Factory Principle
- The design is too general and extensible, with too many levels of abstraction

### Anti-LSP

- The principle of unclear inheritance:
  - either an excessive amount of inheritance, or in its complete absence

### Anti-ISP

- Thousand Interface Principle
- Class interfaces are fragmented into too many pieces, making them awkward for all clients to use

### Anti-DIP

- `DI-brain` Principle
- Interfaces are allocated for each class and passed in batches through constructors
- It becomes almost impossible to understand where the logic is
