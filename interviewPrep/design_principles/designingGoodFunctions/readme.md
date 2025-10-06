# Designing Good Functions

- Functions are one of the most important parts of writing code
  - They make the code reusable and easy to read and maintain. Functions make the code organized
- A good function should have the following properties:
  - Should be small
  - Should do just one thing
  - Should have fewer arguments
  - Should not have side effects
- One should be able to look at the function name and understand what that function does
  - If they want to know more, they should just be able to skim through the function to get detail which is at a lower level
  - For more lower-level details, they should look at the implementation of the functions called inside it
- A good function allows understanding it without going into lower-level details unless required

## Should be small

### How small?

- Functions should be very small
  - It should be hardly 20 lines long

### How to make functions smaller?

- Anything inside that function that can be made into a separate function should be extracted
  - The extracted function should be called from the previous function

### Single line code blocks

- Nested structures like if, else, while, for, try, etc should ideally call another function in their code block
  - This makes the code easier to read and understand

## Should do just one thing

- A function should do one thing and do it well
  - In general, all the things in a function should be at the same abstraction level
  - A function should not have both lower-level and higher-level details
- If another function can be extracted out of a function then it is doing more than one thing
  - We should extract functions to achieve the same level of abstraction
- Functions that can be divided into multiple sections do more than one thing

## Should have fewer arguments

- The ideal number of arguments for a function is zero (niladic)
  - Next comes one (monadic), followed closely by two (dyadic)
  - Three arguments (triadic) should be avoided where possible
  - More than three (polyadic) requires very special justification—and then shouldn’t be used anyway
- Arguments make the code harder to understand and test and so we should keep it as low as possible
  - In most cases, a set of related arguments used across functions deserves to be wrapped in a class of its own
- Output arguments are arguments that are required by the function only to be modified to contain the output
  - Output arguments make the function harder to understand and should be avoided
- Flag arguments are boolean arguments that make the code do two things based on the flag value
  - It should be avoided as it breaks the rule of doing only one thing

## Should not have side effects

- A function should not promise one thing and do something else as a side effect
- Example
  - Changing the parameters/class properties in a get/query method
- A set/update (command) function should not ideally update the parameters
  - They can however update the properties of the class the function belongs to

## Conclusion

- It is okay to start with long functions with multiple arguments which do more than one thing
  - Start refactoring larger functions into smaller functions till there is a single level of abstraction in the function and no more functions can be extracted
  - Make sure that the function names are descriptive and have fewer arguments
  - In the end, all the functions should follow the above rules
