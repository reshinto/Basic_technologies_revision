# Duck Typing

- it is a role which can be applied to some specific class in some specific moment of time
  - this is the moment when we can extract the duck types
  - duck type is not related to the interfaces or abstract classes, it is only about the specific class which plays specific role in specific moment of time
- duck-typing feature ensures type safety
- the technique in TypeScript is used to compare two objects by determining if they have the same type matching properties and objects members or not
- For example, if we assign an object with two properties and a method and the second object is only assigned with two properties

  - The typescript compiler raises a compile-time error in such situations when we create a variable of object1 and assign it a variable of the second object type

```ts
class Pigeon {
  sound = "coos";
}

class Owl {
  sound = "hoots";
}

class Penguin {
  sound = "peeps";
  swim() {
    console.log("I'm a bird and i can swim");
  }
}

let pigeon: Pigeon = new Owl(); // Works
let owl: Owl = new Pigeon(); // Works
let pigeon2: Pigeon = new Penguin(); // Works
let penguin: Penguin = new Pigeon(); // Compile time error
```

## If It Walks Like a Duck and Talks Like a Duck Then It's a Duck

- example

  - the prepare method will dramatically increase in the number of dependencies
    - it knows every class name, class method names and their arguments
      the worst is this type of code will only increase its size and dependencies number with time

```ts
class Mechanic {}
class TripCoordinator {}
class Driver {}

class Trip {
  bicycles;
  customers;
  vehicle;

  prepare(prepares: object[]) {
    return prepares.map((preparer) => {
      switch (preparer.constructor) {
        case Mechanic:
          return preparer.prepareBicycles(this.bicycles);
        case TripCoordinator:
          return preparer.buyFood(this.customers);
        case Driver:
          preparer.fillTank(this.vehicle);

          return preparer.fillWaterTank(this.vehicle);
      }
    });
  }
}
```

## Finding the Duck

- after identifying the problem, we need to minimize dependencies number to make the `Trip` functionality easily extensible without usage of switch case and other similar approaches
- every preparer class is responsible for preparing something for the `Trip`
  - we can try to extract some `Preparer` abstraction and call it a `duck type`
  - this becomes something similar to an interface

```ts
class Trip {
  prepare(prepares: { prepareTrip(trip: Trip) }[]) {
    prepares.map((preparer) => {
      preparer.prepareTrip(this);
    });
  }
}

class Driver {}

class Mechanic {
  prepareTrip(trip: Trip) {
    trip.bicycles.map((bicycle) => {
      this.prepareBicycle(bicycle);
    });
  }
}

class TripCoordinator {
  prepareTrip(trip: Trip) {
    this.buyFood(trip);
  }
}
```

## Writing Code that Relies on Ducks

1. `Recognizing Hidden Ducks`
   - You need to timely understand where the duck types are hidden and how to extract them, pay attention to the next places in the code:
     - Case statements that switch on class
       - similar to the switch..case situation, but here you check if you are working with instance of some specific class
     - instanceof operator
       - when trying to find out which exact class you are working with to apply specific steps to it, this may be a sign of hidden duck type
     - Checking the method exists `(if (obj.someMethod) { obj.someMethod() })`
       - It is also a good sign that there may be a hidden duck type when do not need to check the exact class but when you only need some specific method to exist
2. `Placing Trust in Your Ducks`
   - Let client code trust the duck type, in lack of the trust client code means the next: "I know who you are, so I know what you do"
   - Such knowledge transforms into tight coupling between classes which results into non extensible code
   - Flexible applications built on top of objects which works on trust
     – your goal as a developer is to make those objects reliable, to let the trust work
3. `Documenting Duck Types`
   - Preparer duck type and its open interface is a specific part of the design, but at the same time it is a virtual part of code, because it is neither a class nor a real interface
   - Preparers are an abstraction, just a convention which gives you the powerful system design tool, but this abstraction makes code less obvious
   - When you create a duck type, you must document and cover it with tests
4. `Sharing Code between Ducks`
   - In the example shared is only prepareTrip method, but when you start using duck types, you may notice that some part of the functionality is common for all the types
   - Share such functionality using mixins and other available approaches
5. `Choosing Your Ducks Wisely`
   - The last point, tells us that you do not need to create duck types just to have them
   - You need to find a balance between resources required for the refactoring, benefit gained, support simplicity and code clarity
