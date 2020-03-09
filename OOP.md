# Object Oriented Programming
* it is a style of programming or a programming paradigm
* it combines a group of related variables and functions into a unit
  * the unit is referred to as an object
  * the variables are referred to as properties
  * the functions are referred to as methods
* e.g.: a CAR object
  * has properties of "make, model, color"
  * and methods of "start(), stop(), move()"
## 4 pillars of OOP
1. Encapsulation
    * group related variables and functions that operate on them into objects
      * thus reduce complexity and increase reusability
    * (summary) hiding the code and data into a single unit
    ```javascript
    // procedural programming
    let baseSalary = 30000;
    let overtime = 10;
    let rate = 20;
    function getWage(baseSalary, overtime, rate) {
      return baseSalary + (overtime * rate);
    }
    getWage(baseSalary, overtime, rate);
    
    // encapsulation - this is better because getWage method does not requires any parameters
    // the fewer the number of parameters, the easier it is to use and maintain that function
    let employee = {
      baseSalary: 30000,
      overtime: 10,
      rate: 20,
      getWage: function() {
        return this.baseSalary + (this.overtime * this.rate);
      }
    };
    employee.getWage();
    ```
2. Abstraction
    * hide some of the properties and methods from outside
      * this will make the interface of those objects simpler
        * an object with a few properties and methods is easier to understand than an object with several properties and methods
      * this will help reduce the impact of change
        * in the future, if changes were to occur in the inner or private methods, none of the changes will leak outside
          * because there isn't any code that touches the methods outside of their content object
    * (summary) hide the details and the complexity and show only the essentials, which reduce complexity & isolate the impact of changes
    ```javascript
    function Employee(name, age, baseSalary) {
      this.name = name;
      this.age = age;
      this.baseSalary = baseSalary;
      let monthlyBonus = 1500;
      
      // abstraction creation
      let calculateFinalSalary = function() {
        let finalSalary = baseSalary + monthlyBonus;
        console.log(finalSalary);
      }
      
      this.getEmployeeDetails = function() {
        console.log(this.name);
        calculateFinalSalary;  // abstraction implementation;
      }
    }
    
    const employee = new Employee("John", 30, 2000);
    employee.getEmployeeDetails();
    ```
3. Inheritance
    * it is a mechanism that allows you to eliminate redundant code
    ```javascript
    class Employee {  // parent
      raiseAmt = 1.04;
    
      constructor(first, last, pay) {
        this.first = first;
        this.last = last;     
        this.pay = pay;
      }
        
      applyRaise() {
        this.pay = parseInt(this.pay * this.raise_amt);
      }
    }

    // Inheritance
    class Developer extends Employee {  // child
      raiseAmt = 1.1;
    
      constructor(first, last, pay, progLang) {
        super(first, last, pay)  // implement parent class init method
        this.progLang = progLang;
      }
    }
    
    const dev = new Developer("abc", "xyz", 5000, "Javascript")
    console.log(dev.pay)  // 5000
    dev.applyRaise()
    console.log(dev.pay)  // 5500
    ```
4. Polymorphism - literally means many forms
    * it is a technique that allows you to get rid of long if and else or switch and case conditional statements
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
    dog.makeSound();  // "Woof!"
    ```
## Value types vs Reference types
* primitives are copied by their value
```javascript
// example 1
let x = 0;
let y = x;
x = 20;  // y = 0, x = 20

// example 2
let number = 10;
function increase(number) {
  number++;
}
increase(number);
console.log(number);  // number = 10
```
* objects are copied by their reference
```javascript
// example 1
let x = { value: 0 };
let y = x;  
x.value = 20 // y = { value: 20 }

// example 2
let obj = { value: 10 };
function increase(obj) {
  obj.value++;
}
increase(obj);
console.log(obj);  // { value: 11 }
```
### Value types
* number, string, boolean, symbol, undefined, null
### Reference types
* object, function, array

## Factory
```javascript
// normal code - needs to make multiple of the same objects if have different radius value
const circle = {
  radius: 1,
  draw: function() {
    console.log("draw");
  }
}
circle.draw()

// factory function - only need to change the value in the parameter during initialization
function createCircle(radius) {
  return {
    radius,
    draw: function() {
      console.log("draw");
    }
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
  this.draw = function() {
    console.log("draw");
  }
}

const circle = new Circle(1);
circle.draw();
```
