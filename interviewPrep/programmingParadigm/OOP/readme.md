# Object Oriented Programming

- it is a style of programming or a programming paradigm
- it combines a group of related variables and functions into a unit
  - the unit is referred to as an object
  - the variables are referred to as properties
  - the functions are referred to as methods
- e.g.: a CAR object
  - has properties of "make, model, color"
  - and methods of "start(), stop(), move()"

## 4 pillars of OOP

### Encapsulation

- a concept that binds together the data and functions that manipulate the data, and that keeps both safe from outside interference and misuse
- a tool that helps to hide unimportant implementation details out of sight
- most commonly used in the context of information hiding
- Public mutable data violates encapsulation
  - because any client of the class can change the internal state of the class object without the notification of the class
- To achieve encapsulation in the design, two components are distinguished, its public interface and the private part
  - the public part should expose more about what the class does and hide unnecessary implementation details from clients
- Abstraction and encapsulation complement each other and form some more general holistic picture of the object-oriented programming paradigm
- play a key role in fighting complexity, providing the ability to design at a higher level, abstracting from implementation details
- example 1

  ```javascript
  // procedural programming
  let baseSalary = 30000;
  let overtime = 10;
  let rate = 20;
  function getWage(baseSalary, overtime, rate) {
    return baseSalary + overtime * rate;
  }
  getWage(baseSalary, overtime, rate);

  // encapsulation - this is better because getWage method does not requires any parameters
  // the fewer the number of parameters, the easier it is to use and maintain that function
  let employee = {
    baseSalary: 30000,
    overtime: 10,
    rate: 20,
    getWage: function () {
      return this.baseSalary + this.overtime * this.rate;
    },
  };
  employee.getWage();
  ```

- example 2

  - Encapsulation is violated

    ```ts
    class Paystub {
      private readonly employees: Employee[];

      public getEmployees(): Employee[] {
        return this.employees;
      }

      public computePayroll(): number {
        // using this.employees for calculation
        return 42;
      }
    }

    const p1 = new Paystub();
    // if employees data type changed, we can't add employee
    const employees = p1.getEmployees();

    employees.push(new Employee());
    employees.push(new Employee());

    p1.computePayroll();
    ```

  - Encapsulation is not violated

    ```ts
    class Paystub2 {
      private readonly employees: Employee[];

      public addEmployee(employee: Employee): void {
        this.employees.push(employee);
      }

      public computePayroll(): number {
        // using this.employees for calculation
        return 42;
      }
    }

    const p2 = new Paystub2();

    // there will never be an issue when adding employee
    p2.addEmployee(new Employee());
    p2.addEmployee(new Employee());

    p2.computePayroll();
    ```

### Abstraction

- it highlights some significant parts, meaningful information from a component, no matter whether it is a class or an architectural layer in the system, or a logical unit of our system
- (summary): it is the highlighting of significant parts or exclusion of insignificant parts from consideration
  - The act of representing essential features without including the background details or explanations
- In OOP, only data abstraction is considered
  - it is called as `abstraction` implying a set of the most significant characteristics of an object available for the program
- it is essential when dealing with system complexity by hiding implementation details and highlighting essential aspects of behavior
- main idea of abstraction is to describe real life objects and how they interact in a software system
- play a key role in fighting complexity, providing the ability to design at a higher level, abstracting from implementation details
- can be implemented using interfaces and abstract classes
- example 1

  ```javascript
  function Employee(name, age, baseSalary) {
    this.name = name;
    this.age = age;
    this.baseSalary = baseSalary;
    let monthlyBonus = 1500;

    // abstraction creation
    let calculateFinalSalary = function () {
      let finalSalary = baseSalary + monthlyBonus;
      console.log(finalSalary);
    };

    this.getEmployeeDetails = function () {
      console.log(this.name);
      calculateFinalSalary; // abstraction implementation;
    };
  }

  const employee = new Employee("John", 30, 2000);
  employee.getEmployeeDetails();
  ```

- example 2: implementation details, is the more unstable part of the abstraction, it can change while maintaining the public interface

  ```ts
  enum CoffeeSelection {
    FILTER_COFFEE,
    ESPRESSO,
    CAPPUCCINO,
  }

  class CoffeeBean {
    // implementation of CoffeeBeen
  }

  class Coffee {
    constructor(selection: CoffeeSelection, volume: number) {
      // implementation of Coffee
    }
  }

  class Configuration {
    constructor(weight: number, volume: number) {
      // implementation of Configuration
    }
  }

  // abstraction
  // implementation details are changed systematically, the requirements are changed systematically
  // the main thing is not to change the public interface on which clients depend
  class CoffeeMachine {
    private configMap: Map<CoffeeSelection, Configuration>;
    private beans: Map<CoffeeSelection, CoffeeBean>;

    constructor(beans: Map<CoffeeSelection, CoffeeBean>) {
      this.beans = beans;
      // create coffee configuration
      this.configMap = new Map<CoffeeSelection, Configuration>();
      this.configMap.set(CoffeeSelection.ESPRESSO, new Configuration(8, 28));
      this.configMap.set(
        CoffeeSelection.FILTER_COFFEE,
        new Configuration(30, 480)
      );
    }

    // The client knows that the coffee machine has only this method
    // Everything else, all the settings of the coffee machine, initialization in the constructor of some configuration of everything else
    // for the client this is not meaningful behavior, it should not depend on it, because it is unstable, it can change
    public brewCoffee(selection: CoffeeSelection): Coffee {
      const coffee = new Coffee(selection, 100);

      console.log("Making coffee...");

      return coffee;
    }
  }

  const main = () => {
    // create a |Map of available coffee beans
    const beans = new Map<CoffeeSelection, CoffeeBean>();

    beans.set(
      CoffeeSelection.ESPRESSO,
      new CoffeeBean("My favorite espresso bean", 1000)
    );
    beans.set(
      CoffeeSelection.FILTER_COFFEE,
      new CoffeeBean("My favorite filter coffee bean", 1000)
    );

    // get a new CoffeeMachine object
    const machine = new CoffeeMachine(beans);

    // brew a fresh coffee
    const espresso: Coffee = machine.brewCoffee(CoffeeSelection.ESPRESSO);
  };
  ```

### Inheritance

- it is a mechanism that allows you to eliminate redundant code
- it has a relationship between classes that lets you inherit or extend functionality from 1 class to another
- This is an `is` or `is a` relationship
  - a relationship between a base class and descendants
- This relationship is the strongest and in statically typed languages it cannot be broken
  - this must be considered when assessing the need to use inheritance in this case
  - If inheritance were applied in a place where one could do without it
    - this will make it difficult to understand and maintain code
    - because the inheritance hierarchy can be 10 classes or more
    - it is difficult to understand somewhere in the middle or how the last class will behave
    - hard to understand in what places which methods are being overwritten or overridden
    - Therefore, inheritance must be approached wisely
- not all Object Oriented languages are the same
  - c++ supports multiple inheritance
  - java only supports single inheritance
    - each class can extend or inherit functionality from only 1 other class
    - classes can implement multiple interfaces
- inheritance relationship

  - Parent/Child, Base/Derived, Superclass/Subclass

- example

  ```ts
  class Person {
    protected name: string;

    constructor(name: string) {
      this.name = name;
    }
  }

  class Employee extends Person {
    private department: string;

    constructor(name: string, department: string) {
      super(name);
      this.department = department;
    }

    public getDetails() {
      return `Hello, my name is ${this.name} and I work in ${this.department}.`;
    }
  }

  const howard = new Employee("Howard", "Sales");

  console.log(howard.getDetails()); // ok
  console.log(howard.name); // error
  console.log(howard.department); // error
  ```

- 3 access modifiers
  - Private
    - not accessible from the outside
    - only instances of this current class can work with these properties
    - The Employee class has a department property
    - only objects of the Employee class can work with this property
  - Protected
    - is a little wider than private
    - only instances of the current class and classes of descendants can work with them
    - From Employee, we can refer to name from Person
    - they are also closed to the outside world
  - Public
    - public properties and methods are those that are provided to clients in the form of a public interface
    - it should be the most stable and the most unchangeable

### Polymorphism - literally means many forms

- The provision of a single interface to entities of different types or the use of a single symbol to represent multiple different types
- it addresses an object as either super or subtype
- writes methods that accept supertype as arguments
- passes instances of subtypes
- increases code flexibility and reusability
- has 2 types

  1.  Compile time polymorphism (static binding / static polymorphism)
      - e.g.: method overloading
        - allows you to implement multiple methods within the same class that use the same name but different types/order/number of parameters
  2.  Runtime polymorphism (dynamic binding / dynamic polymorphism)
      - e.g.: method overriding
        - does not allow the compiler to determine the executed method
        - Within an inheritance hierarchy, a subclass can override a method of its superclass
          - That enables the developer of the subclass to customize or completely replace the behavior of that method
        - Overriding is about same method, same signature but different classes connected through inheritance

- example 1

  ```javascript
  class Animal {
    constructor(name) {
      this.name = name;
    }

    makeSound() {
      console.log("Generic animal sound");
    }
  }

  // polymorphism - override the makeSound method
  class Dog extends Animal {
    constructor(name) {
      super(name);
    }

    makeSound() {
      console.log("Woof!");
    }
  }
  const dog = new Dog("Happy");
  dog.makeSound(); // "Woof!"
  ```

- example 2: Static polymorphism: overloading

  ```ts
  interface Hero {
    name: string;
    skill: string;
    weakness: string;
  }

  class HeroService {
    protected heroes: Hero[] = [
      {name: "Superman", skill: "fly", weakness: "cryptonit"},
      {name: "Spiderman", skill: "spider-sense", weakness: "MJ"},
      {name: "Batman", skill: "superhuman power", weakness: "law"},
      {name: "Flash", skill: "run", weakness: "unknown"},
    ];

    public getHero(name: string);
    public getHero(name: string, skill: string);

    public getHero(name: string, skill?: string): Hero {
      if (!skill) {
        return this.heroes.find((hero) => hero.name === name);
      }

      return this.heroes.find(
        (hero) => hero.name === name && hero.skill === skill
      );
    }
  }

  const heroService = new HeroService();
  const hero1 = heroService.getHero("Flash");
  const hero2 = heroService.getHero("Superman", "fly");
  ```

- example 3: Dynamic polymorphism: overriding

  ```ts
  class HeroService {
    // implementation of HeroService
  }

  class AntiHeroService extends HeroService {
    public getHero(weakness: string): Hero {
      return this.heroes.find((hero) => hero.weakness === weakness);
    }
  }

  const antiHeroService = new AntiHeroService();
  const hero = antiHeroService.getHero("law");
  ```

- in java

  | Method Overloading                                                                                                     | Method Overriding                                                                                                         |
  | ---------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
  | it is a compile-time polymorphism                                                                                      | it is a run-time polymorphism                                                                                             |
  | It helps to increase the readability of the program                                                                    | It is used to grant the specific implementation of the method which is already provided by its parent class or superclass |
  | It occurs within the class                                                                                             | It is performed in two classes with inheritance relationships                                                             |
  | it may or may not require inheritance                                                                                  | it always needs inheritance                                                                                               |
  | methods must have the same name and different signatures                                                               | methods must have the same name and same signature                                                                        |
  | the return type can or can not be the same, but we just have to change the parameter                                   | the return type must be the same or co-variant                                                                            |
  | Static binding is being used for overloaded methods                                                                    | Dynamic binding is being used for overriding methods                                                                      |
  | It gives better performance. The reason behind this is that the binding of overridden methods is being done at runtime | Poor performance                                                                                                          |
  | Private and final methods can be overloaded                                                                            | Private and final methods can’t be overridden                                                                             |
  | Argument list should be different while doing method overloading                                                       | Argument list should be same in method overriding                                                                         |

## Value types vs Reference types

- primitives are copied by their value

```javascript
// example 1
let x = 0;
let y = x;
x = 20; // y = 0, x = 20

// example 2
let number = 10;
function increase(number) {
  number++;
}
increase(number);
console.log(number); // number = 10
```

- objects are copied by their reference

```javascript
// example 1
let x = {value: 0};
let y = x;
x.value = 20; // y = { value: 20 }

// example 2
let obj = {value: 10};
function increase(obj) {
  obj.value++;
}
increase(obj);
console.log(obj); // { value: 11 }
```

### Value types

- number, string, boolean, symbol, undefined, null

### Reference types

- object, function, array

## Factory

```javascript
// normal code - needs to make multiple of the same objects if have different radius value
const circle = {
  radius: 1,
  draw: function () {
    console.log("draw");
  },
};
circle.draw();

// factory function - only need to change the value in the parameter during initialization
function createCircle(radius) {
  return {
    radius,
    draw: function () {
      console.log("draw");
    },
  };
}

const circle = createCircle(1);
circle.draw();
```

## Constructor

```javascript
// constructor function
function Circle(radius) {
  this.radius = radius;
  this.draw = function () {
    console.log("draw");
  };
}

const circle = new Circle(1);
circle.draw();
```
