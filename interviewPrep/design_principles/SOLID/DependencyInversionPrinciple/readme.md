# Dependency Inversion Principle (DIP)

- High level modules should not import anything from low-level modules
  - both should depend on abstractions
    - e.g.: interfaces
- Abstractions should not depend on details

  - details (concrete implementations) should depend on abstractions

- in other words: High-level modules, which provide complex logic, should be easily reusable and unaffected by changes in low-level modules, which provide utility features
  - To achieve that, you need to introduce an abstraction that decouples the high-level and low-level modules from each other
  - The design principle does not just change the direction of the dependency, as you might have expected when you read its name for the first time
  - It splits the dependency between the high-level and low-level modules by introducing an abstraction between them
  - So, in the end, you get two dependencies:
    - the high-level module depends on the abstraction
    - the low-level depends on the same abstraction

## Example

- Let us dive deep into dependency inversion principle by having a look at the example below
  - Suppose we are working on an application that uses `MySQL` database
  - We have `UserTransaction` class that will be used to query User table in the database
  - It contains `init()` method that takes instance of `MySQLDatabase` class and two base operations:
    - `insert()`
    - `delete()`

```ts
interface Database {
  insert(entity: object): object;
  delete(entity: object): object;
  get(entity: object): object;
}

class UserTransaction {
  private db;
  init(db: MySQLDatabase) {
    this.db = db;
  }

  insert(user: object) {
    return !this.db.get(user) ? this.db.insert(user) : null;
  }
  delete(user: object) {
    return !this.db.get(user) ? this.db.delete(user) : null;
  }
}
```

- `MySQLDatabase` is a low-level module, `UserTransaction` is a high-level one
  - But based on the definition of the Dependency Inversion Principle, which says to separate abstractions from the implementation, this fragment of code violates it, because the `UserTransaction` class depends on the `MySQLDatabase` class
- But what if at some point we decided to replace `MySQL` to `PostgreSQL` database, which has a completely different interface compared to `MySQL`?
  - We would not only need to create `PostgreSQLDatabase` class, but also update `UserTransaction` class implementation

```ts
class PostgreSQLDatabase {
  insert(entity: object) {
    return {
      /* insert using PostgreSQL syntax */
    };
  }
  delete(entity: object) {
    return {
      /* delete using PostgreSQL syntax */
    };
  }
  get(entity: object) {
    return {
      /* get using PostgreSQL syntax */
    };
  }
}
```

- There should be low coupling between classes used
  - `UserTransaction` class does not have to worry about the database being used
  - To fix that, we have to create an interface so that the low-level and high-level modules depend on the abstraction (interface)

```ts
interface Database {
  insert(entity: object): object;
  delete(entity: object): object;
  get(entity: object): object;
}

class PostgreSQLDatabase implements Database {
  insert(entity: object) {
    return {
      /* insert using PostgreSQL syntax */
    };
  }
  delete(entity: object) {
    return {
      /* delete using PostgreSQL syntax */
    };
  }
  get(entity: object) {
    return {
      /* get using PostgreSQL syntax */
    };
  }
}

class UserTransaction {
  private db;
  init(db: Database) {
    this.db = db;
  }

  insert(user: object) {
    return !this.db.get(user) ? this.db.insert(user) : null;
  }
  delete(user: object) {
    return !this.db.get(user) ? this.db.delete(user) : null;
  }
}
```

- Now both modules (low-level and high-level) depend on abstraction
  - No matter which database is used (either `PostgreSQL` or `MySQL`), `UserTransaction` class depends on `Database` interface
  - Therefore, if at some point we decide to roll back to `MySQL` or introduce a new database, we will not need to change the `UserTransaction` class
  - Dependency Inversion principle is not violated, and we can introduce new requirements very quickly without changing all the related modules

## Summary

- what is the use of the `Observer` pattern from a DIP point of view
  - `Turns out` control over the course of the program, giving a reaction to the event to the observer object
    - the observer inverts control of program execution in a similar way to event handlers in the GUI
    - event handlers are called at the time of a user input event
      - mouse click, keypress
    - observer reacts to a change in the state of the observed object
- according to the DIP, the relationship between the modules should be as the following
  - high and low level modules must depend on abstractions
    - modules do not need to work with specific modules, they can work with any entity that implements the specified interface, which reduces coupling
- The Dependency Inversion Principle introduces an interface abstraction between higher-level and lower-level software components to remove the dependencies between them

### When to allocate an interface from a class?

- Class is an implementation of some strategy and will be used in a polymorphic manner
- Class is used to work with external environments (files, sockets, configuration, etc.)

### When not to allocate a class interface?

- Class is an immutable Value Object or Data Object
- Class has stable behavior (does not work with the external environment)
