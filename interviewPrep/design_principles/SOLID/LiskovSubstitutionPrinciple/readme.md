# Liskov Substitution Principle (LSP)

- if S is a subtype of T, then objects of type T may be replaced with objects of type S
  - which means that every single usage of the parent class should be replaceable with its child class
- That requires the objects of your subclasses to behave in the same way as the objects of your superclass
  - Clients can reliably use any type or subtype, always expecting consistent behavior or, in other words, that the contract will be kept
  - A simple formulation of the principle is as follows:
    - it should be possible to substitute any subtype for base type
- There are several `rules` that must be followed for LSP compliance:
  - `contract rules` and `variance rules`

## Contract Rules

### Preconditions cannot be strengthened in a subtype

- Preconditions are defined as all the conditions necessary for a method to run reliably and without fault
  - If subclass is replaced with superclass and preconditions are tightened for existing methods, then existing functionality will break
- Suppose we have a class for calculating shipping price ShippingCalculator
  - This class has `calculate()` method defined, which takes two arguments:
    - size and weight and calculates delivery price
  - The `calculate()` method will not work properly if weight or size provided are less or equal zero
- These are preconditions
  - Suppose at some point we are given new requirements for shipping service:
    - we need to support worldwide delivery that should be done only if weight and size of product we want to deliver are less than 10
  - We create class `WorldWideShipping` that extends `ShippingCalculator` class and override `calculate()` method based on new requirements
  - Now `WorldWideShipping` does not fulfill `ShippingCalculator` expectations, because it works only with size and weight less than 10
  - As a result, `WorldWideShipping` strengthens preconditions and violates the Liskov substitution principle
  - All clients should now be aware of the new type and treat it as a special case

```ts
class ShippingCalculator {
  public calculate(weight: number, size: number, destination: USADestination) {
    if (weight <= 0 || size <= 0) {
      throw new Error("Weight and size should be greater than 0");
    }

    const shippingPrice = weight * size;

    return shippingPrice;
  }
}

class WorldWideShipping extends ShippingCalculator {
  // correct destination type passed: Destination
  public calculate(weight: number, size: number, destination: Destination) {
    // preconditions are strengthened
    if (weight < 10 && size < 10) {
      throw new Error("No international shipping for you");
    }

    return super.calculate(weight, size, destination);
  }
}
```

### Postconditions cannot be weakened in a subtype

- Postconditions check whether an object is being left in a valid state before a method is returned
  - The reason you cannot weaken postconditions is because existing clients might break when a new subclass is introduced
- Let us get back to `ShippingCalculator.calculate()` method
  - The postcondition is the rule that the delivery cost is always more than 0
  - Suppose our customers decided to bring in free delivery for products which size and weight are less than 1
  - We create class `FreeShipping` and override `calculate()` method based on new requirements
  - In this case, we weakened postconditions compared to the original ones
  - We broke the original logic which assumed that the `shippingPrice` is always a positive number
  - As a result, clients who are sure in original postconditions and who have previously worked with the base class, may break when switching to the subclass
  - Moreover, it will also be required for them to check which instance of the calculator they are working with to handle new requirements

```ts
class FreeShipping extends ShippingCalculator {
  // incorrect destination type passed: should be Destination
  public calculate(
    weight: number,
    size: number,
    destination: TexasDestination
  ) {
    if (weight <= 0 || size <= 0) {
      throw new Error("Weight and size should be greater than 0");
    }

    // postconditions are weakened
    const shippingPrice =
      weight < 1 && size < 1 ? 0 : super.calculate(weight, size, destination);

    return shippingPrice;
  }
}
```

## Variance Rules

### There must be covariance of the return types in the subtype

- Covariance is when function return values can be changed to subtypes, moving down the hierarchy
- Suppose we have a base Product class defined with `getShippingProvider()` method which returns an instance of `ShippingCalculator` class
  - We want to introduce a new product phone, that is why we create `Phone` class and extend it from base `Product` class
  - Phones can be delivered worldwide
  - Therefore, `getShippingProvider()` should return an instance of `WorldWideShipping` class
  - Covariance of return types is kept:
    - `getShippingProvider()` returns an instance of `WorldWideShipping` class, which is subtype of `ShippingCalculator` (moving down to hierarchy)

```ts
class Product {
  public getShippingProvider(): ShippingCalculator {
    return new ShippingCalculator();
  }
}

class Phone extends Product {
  // WorldWideShipping is subtype of ShippingCalculator
  public getShippingProvider(): WorldWideShipping {
    return new WorldWideShipping();
  }
}
```

- Example of violating the covariance rule of return types in subtype is given below
  - As you can see, we are moving up the hierarchy of classes

```ts
class Product {
  public getShippingProvider(): WorldWideShipping {
    return new WorldWideShipping();
  }
}

class Phone extends Product {
  public getShippingProvider(): ShippingCalculator {
    return new ShippingCalculator();
  }
}
```

### There must be contravariance of the method arguments in the subtype

- Contravariance is when function arguments can be changed to supertypes, moving up the hierarchy
- Suppose at some point we decided to deliver products only to the USA and free shipping is possible only to Texas
  - We extend `calculate()` method and pass destination needed to it
  - Contravariance of function arguments is kept in `WorldWideShipping` class, but not in `FreeShipping` class
  - Destination should be an instance of `Destination` class in `FreeShipping.calculate()` method

```ts
class Destination {}
class USADestination extends Destination {}
class TexasDestination extends USADestination {}

class ShippingCalculator {
  public calculate(weight: number, size: number, destination: USADestination) {
    // calculate
  }
}

class WorldWideShipping extends ShippingCalculator {
  // correct destination type passed: Destination
  public calculate(weight: number, size: number, destination: Destination) {
    // calculate
  }
}

class FreeShipping extends ShippingCalculator {
  // incorrect destination type passed: should be Destination
  public calculate(
    weight: number,
    size: number,
    destination: TexasDestination
  ) {
    // calculate
  }
}
```

### Invariants must be maintained

- A data invariant is a state that remains true for the entire lifetime of an object
  - Data invariants refer to the expected internal state of an object
  - Whenever a new subclass is created, it must continue to honor all the data invariants that were part of the base class
  - The violation of this principle is easy to introduce because subclasses have a lot of freedom to introduce new ways of changing previously private data
- A list of users with unique emails can be an example of a data invariant
  - Let us have a look at `Users.add()` method
  - By adding a simple guard condition to the method, we prevented adding an invalid value and preserved the data invariant
  - In `NotUniqueUsers.add()` method we violate the parent class invariants, since we give the opportunity to add non-unique values to the collection of users
  - Data invariants must be persisted throughout the hierarchy of classes
  - Every class in the chain of inheritance must fulfill the invariants of all its heirs, otherwise no one can guarantee the correctness of the behavior

```ts
class User {
  constructor(private email: string) {}

  hasSameEmail(other: User): boolean {
    return other.email === this.email;
  }
}

class Users {
  private users: User[] = [];

  public add(user: User): boolean {
    if (this.users.some(user.hasSameEmail.bind(user))) {
      return false;
    }

    this.users.push(user);

    return true;
  }
}

class NotUniqueUsers extends Users {
  private collection: User[] = [];

  public add(user: User): boolean {
    this.collection.push(user);

    return true;
  }
}
```

### Summary

- essence of LSP

  - design entities so that their descendants do not conflict with the underlying behavior
    - the behavior of inheritors should be expected for functions that use the base class
  - design entities so that their descendants can be substituted for 1 another without changing the function that uses them
    - the general interface should be such that in the classes that implement it, the preconditions are not stronger, and the postconditions are not weaker

- why contract programming is useful from LSP point of view
  - contracts prevent descendants from developing behavior that contradicts the behavior of the underlying entity
    - postconditions cannot be weakened in a subclass
  - contracts define the behavior of the underlying entity that its descendants must follow
    - preconditions cannot be strengthened in a subclass
- In case of not following LSP:
  - Inheritance hierarchies will lead to confusion
    - So, passing the subclass instance instead of base class into the method will result in a weird behavior of the existing code
  - Unit tests for base class will never pass for subclasses
