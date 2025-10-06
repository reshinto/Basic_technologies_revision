# Functional Programming

- the main unit of functional programming is a function
- the aim is to `abstract control flows and operations` on data with functions
  - by doing so we could `avoid side effects` and `reduce mutation` of state

## Imperative programming paradigm

- it is one of the oldest programming paradigms
- It has a close connection to machine architecture
- By changing the state through assignment statements we are achieving results
- The state is changing by performing step-by-step tasks
- The main concept is how to achieve our goal
- If you are following the imperative programming paradigm you have several statements and the result is stored after execution of all of them

| pro                      | cons                                 |
| ------------------------ | ------------------------------------ |
| Very simple to implement | Less efficient and less productive   |
|                          | Parallel programming is not possible |

- example

  - creation of new empty array doubled
  - going through array with for loop
  - double each element
  - push the doubled element into doubled array
  - return doubled array

  ```ts
  const doubleMap = (numbers) => {
    const doubled = [];

    for (let i = 0; i < numbers.length; i++) {
      doubled.push(numbers[i] * 2);
    }

    return doubled;
  };

  console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
  ```

## Declarative programming paradigm

- The main idea is to define what needs to be accomplished by the program, but not how it needs to be implemented
- instead of instructing how to achieve the desired results we focus only on the result itself
- It is different from imperative programming which focuses on a set of commands which need to be executed in order to achieve the required solution
- it describes a particular class of problems that have to be solved and a language implementation takes care of finding the solution
- With this approach, the resulting program is simpler to read
- example

  - all routine work is done by map
  - we only pass the callback in which we provide the condition which is important to us in this case

  ```ts
  const doubleMap = (numbers) => numbers.map((n) => n * 2);

  console.log(doubleMap([2, 3, 4])); // [4, 6, 8]
  ```

## Is FP imperative or declarative

- FP implements most of the declarative rules
  - such as programmers focus on what to do, composition, recursion, immutability, functions as first-class objects, etc.

| Characteristic            | Imperative Approach                                          | Functional Approach                                    |
| ------------------------- | ------------------------------------------------------------ | ------------------------------------------------------ |
| Description               | The program directly changes computed state                  | The program avoids mutating state and computation data |
| Key points                | Direct assignments, global variables, common data structures | Compositional, recursion, no side effects              |
| Programmer focus          | How to perform tasks and how to track state changing         | What is desired and what transformations are required  |
| State changes             | Important                                                    | Non-existent                                           |
| Order of execution        | Important                                                    | Low importance                                         |
| Primary flow control      | Loops, conditionals and function calls                       | Function calls, recursion                              |
| Primary manipulation unit | Instances of structures or classes                           | Functions as first-class objects and data collections  |
