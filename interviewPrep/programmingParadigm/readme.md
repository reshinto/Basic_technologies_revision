# Programming Paradigm

- it is a sort of programming style
- it is not bound to a certain programming language
- it provides us with means and structure for execution of a program
- it is a complex of concepts, instruments, principles that define the fundamentals of programming style

## Declarative Programming

- programmer instructs the computer on what is to be computed
- you do not know how it works, but you know what it does
- it is a good idea to decouple DOM manipulation from app logic
  - improves the testability of code
- improves readability of code
- must define the specification for solving a task
  - e.g.: we describe what the problem's field and how and what kind of result we expect
- the order of execution and the method of achieving results does not matter
- common example is `HTML`
  - it describes the contents of the page, but not the way it should be rendered
- with declarative programming, the exact path of a program is not deterministic from the perspective of executed code
- SQL example

  ```sql
  select upper(name)
  from people
  where length(name) > 5
  order by name
  ```

## Imperative Programming

- the script is basically telling the computer how to do something
- imperative phrases which change the global state of a program
- not scalable
- we describe the system as a process of execution of instructions that change the state of the system
- it is commonly considered to be less extensible that the others
- examples: `C++`, `C`, `Go`, `JavaScript`
- not all languages can be categorized to a single programming paradigm
  - usually a language support 2 or even 3 paradigms at the same time
  - example, `JavaScript` supports imperative, functional, and object-oriented paradigms at the same time
- with imperative programming, you know exactly what is happening
  - you can dial into the execution of a program and easily debug it
- all code is imperative in the end when it is executed by the processor

```
result = []
    i = 0
start:
    numPeople = length(people)
    if i >= numPeople goto finished
    p = people[i]
    nameLength = length(p.name)
    if nameLength <= 5 goto nextOne
    upperName = toUpper(p.name)
    addToList(result, upperName)
nextOne:
    i = i + 1
    goto start
finished:
    return sort(result)
```

## Object-Oriented Programming

- program is defined by object which combine state and behavior
- good for structured and modular code
- well suited for big projects
- it describes the computer program as a set of specific objects, that are instances of a class
- the objects communicate by sending, receiving, and processing the messages
  - the messages may include parameters
- the objects have state
  - they can change when processing a message
- objects may create other objects or may send messages when processing a message
- it is well-suited for big projects that require having a state within the app
- its message-oriented approach provides a way for objects to be replaced by other objects of a same type
  - means that the behavior of a program can be changed just by replacing an object
- same objects as building blocks could be reused in other parts of the same system

```ts
class Task {
  public createdDate: string;
  public completed: boolean;
  public completedDate?: string;

  constructor(public name: string) {
    this.completed = false;
    this.createdDate = new Date().toString();
  }
}

class TasksList {
  private tasks: Task[] = [];

  addTask(name: string): void {
    this.tasks.push(new Task(name));
  }

  completeTaskByName(name: string): Task | never {
    const task = this.getTodoTasks().find((task) => task.name === name);

    if (!task) {
      throw new Error("The task is not found");
    }

    task.completed = true;
    task.completedDate = new Date().toString();

    return task;
  }

  getTodoTasks(): Task[] {
    return this.tasks.filter((task) => !task.completed);
  }

  getCompletedTasks(): Task[] {
    return this.tasks.filter((task) => Boolean(task.completed));
  }
}

const tasksList = new TasksList();

tasksList.addTask('Study "Principles of OOP" theory');
tasksList.addTask('Complete "Principles of OOP" home task');

console.log(tasksList.getTodoTasks());
console.log(tasksList.getCompletedTasks());

tasksList.completeTaskByName('Study "Principles of OOP" theory');

console.log(tasksList.getTodoTasks());
console.log(tasksList.getCompletedTasks());
```

## Functional Programming

- treats computations as the evaluation of functions and avoids changing state and mutable data
- eliminating side effects
  - e.g.: changes in state that do not depend on the function inputs
    - can make it much easier to understand and predict the behavior of a program
- emphasize using of immutable data
- it describe the program as a set of functions (not objects or procedures)
  - that are used as building blocks to manipulate data
- it forces us to use function in their mathematical sense
  - as they just declare a relationship between 2 entities
- functions do not change the state of a program (also known as `pure`)
  - they pipe the data through them to produce a result
- there are no variables, only constants
- can have a certain nesting of functions
  - where the result of the function can be expressed as a list of arguments that are passed to the function
  - however, arguments can also be functions
- programming languages that can pass a function as a parameter to another function are known as `first-class citizen function`
  - e.g.: JavaScript
- a program in functional programming is not represented by a specific state, but by a combination of function calls at a certain point in time
- it pushes the idea that is is good to use immutable data
  - immutable data is faster because it is put into memory once and it does not change
- `pure functions` are functions without side effects
  - when there is
    - a list of parameters as function arguments
    - a certain logic for handling them
    - a certain result in return
  - the function does not change data and state outside its scope
  - if you change a variable outside the scope of the function
    - this indicates that the function is impure, having a `side effect`
  - functional programming assumes that the functions are pure and should follow the principle of single responsibility
    - each function should have a single responsibility
    - because the essence of functional programming is in the combination of various functions with different responsibilities to achieve the result

```ts
import {flow, map, entries, groupBy, orderBy, take, sumBy} from "lodash/fp";

const driverStandings = [
  {name: "Carlos Sainz", car: "FERRARI", points: 127},
  {name: "Charles Leclerc", car: "FERRARI", points: 138},
  {name: "George Russell", car: "MERCEDES", points: 111},
  {name: "Sergio Perez", car: "RED BULL RACING RBPT", points: 147},
  {name: "Lewis Hamilton", car: "MERCEDES", points: 93},
  {name: "Max Verstappen", car: "RED BULL RACING RBPT", points: 181},
];

const getTop2CarConstructorStandings = flow(
  groupBy("car"),
  entries,
  map(([car, driver]) => ({car, points: sumBy("points")(driver)})),
  orderBy("points", "desc"),
  take(2)
);

console.log(getTop2CarConstructorStandings(driverStandings));
```
