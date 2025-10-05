# Open Closed Principle

- Software entities (classes, modules, functions, etc.) should be open for extension
  - but closed for modification
- the entity can allow its behavior to be extended without modifying its source code

## 2 types

- Both ways use generalizations (for instance, inheritance or delegate functions) to resolve the apparent dilemma, but the goals, techniques, and results are different

### Meyer's open-closed principle

- A module is open if it is still available for extension
  - e.g.: it should be possible to add fields to the data structures it contains, or new elements to the set of functions it performs
- A module is closed if is available for use by other modules
  - This assumes that the module has been given a well-defined, stable description (the interface in the sense of information hiding)
- A class is closed, since it may be compiled, stored in a library, baselined, and used by client classes
  - But it is also open, since any new class may use it as parent, adding new features
  - When a descendant class is defined, there is no need to change the original or to disturb its clients

### Polymorphic open-closed principle

- open-closed principle refer to the use of abstracted interfaces
  - where the implementations can be changed and multiple implementations could be created and polymorphically substituted for each other
- this advocates inheritance from abstract base classes
  - Interface specifications can be reused through inheritance but implementation need not be
  - The existing interface is closed to modifications and new implementations must, at a minimum, implement that interface

## Example that violates the Open-Closed Principle

- refer to `violateOpenClosedPrinciple.js`
- potential issues:
  - if later, you want to add a new option or new question type to the quiz
    - e.g.: a range of values type
      - refer to `violateOpenClosedPrincipleExtended.js`

## Example that passes the Open-Closed Principle

- refer to `passOpenClosedPrinciple.js`
