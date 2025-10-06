# Interface Segregation Principle (ISP)

- no client should be forced to depend on methods it does not use
- this helps to split interfaces that are very large into smaller and more specific ones
  - so that clients will only have to know about the methods that are of interest to them
    - also referred to as `role interfaces`
- the goal of this principle is to reduce the side effects of using larger interfaces by breaking application interfaces into smaller ones
  - It is like the Single Responsibility Principle, where each class or interface serves a single purpose
- Precise application design and correct abstraction is the key behind the Interface Segregation Principle
  - Though it will take more time and effort in the design phase of an application and might increase the code complexity, in the end, we get a flexible code

## Purpose

- the purpose is to
  - keep a system decoupled
  - allow easy refactor, change, and redeploy

## Example

- We have `Staff` interface and class `Lecturer` that implements `Staff` interface
  - Thus, it does not violate the principle
  - For simplicity, let us ignore the actual business implementation of these methods

```ts
interface Staff {
  name: string;
  salary: number;
  adjustSalary(): number;
}

class Lecturer implements Staff {
  constructor(public name: string, public salary: number) {}

  adjustSalary() {
    return this.salary * 0.9;
  }
}
```

- Now, as we move ahead in time, and more features come in, there is a need to add management staff, so we created `Administrator` class
- Everything looks good so far
- But what if we need to extend `Lecturer` and `Administrator` classes behavior?
  - Let us say that we want to add `giveLecture()` method to `Lecturer` class and `arrangeMeeting()` to `Administrator`
  - In this case we need to extend `Staff` interface with those methods

```ts
interface Staff {
  name: string;
  salary: number;
  adjustSalary(): number;
  giveLecture(): void;
  arrangeMeeting(): void;
}

class Lecturer implements Staff {
  constructor(public name: string, public salary: number) {}

  adjustSalary() {
    return this.salary * 0.9;
  }
  giveLecture() {}
  arrangeMeeting() {}
}

class Administrator implements Staff {
  constructor(public name: string, public salary: number) {}

  adjustSalary() {
    return this.salary * 0.75;
  }
  arrangeMeeting() {}
  giveLecture() {}
}
```

- Now, since the `Staff` interface has changed and more methods were added, all the implementing classes now must implement the new methods
- The problem is, implementing them is unwanted and could lead to many side effects
- Here, the `Administrator` implementation class must implement the `giveLecture()` method without any actual need for this
- And so, the principle is violated
- Let us break up the interfaces and apply the Interface Segregation Principle
  - As you can see, we have created two more interfaces `AcademicStaff` and `ManagerStaff` that extend the base Staff interface
  - Each of the new interfaces contain only those methods that they need
  - Therefore, Lecturer class now implements `AcademicStaff` and `Administrator` class `AcademicStaff` interface

```ts
interface Staff {
  name: string;
  salary: number;
  adjustSalary(): number;
}

interface AcademicStaff extends Staff {
  giveLecture(): void;
}

interface ManagerStaff extends Staff {
  arrangeMeeting(): void;
}

class Lecturer implements AcademicStaff {
  constructor(public name: string, public salary: number) {}

  adjustSalary() {
    return this.salary * 0.9;
  }
  giveLecture() {}
}

class Administrator implements ManagerStaff {
  constructor(public name: string, public salary: number) {}

  adjustSalary() {
    return this.salary * 0.75;
  }
  arrangeMeeting() {}
}
```

## Summary

- essence of ISP

  - design interfaces so that the entities that implement them do not depend on methods they do not use
    - the ISP helps to design the interfaces so that changes only affect those modules whose functionality they actually affect

- benefits of DIP

  - reduced coupling of modules
    - high-level modules should not depend on low-level modules
    - both types must depend on abstractions
  - increased module cohesion
    - according to the principle, modules should not directly depend on other modules, but on abstractions

- As you can see fat interfaces lead to inadvertent coupling between classes, and you should avoid them
  - When designing interfaces, you should always ask yourself the question **Do really need all the methods on this interface I'm using? If not, how can I break them into smaller interfaces?**
  - Treat interface segregation with certain pragmatism and use common sense
