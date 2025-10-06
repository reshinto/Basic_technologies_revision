# Curly's Law - Do One Thing

- it is about choosing a single, clearly defined goal for any particular bit of code: Do One Thing
- An entity (class, function, variable) should mean one thing, and one thing only
  - It should not mean one thing in one circumstance and carry a different value from a different domain some other time
  - It should not mean two things at once
  - It should mean One Thing and should mean it all of the time
- A variable should mean one thing, and one thing only
  - It should not mean one thing in one circumstance, and carry a different value from a different domain some other time
  - It should not mean two things at once
  - It must not be both a floor polish and a dessert topping
  - It should mean One Thing, and should mean it all of the time
- Bob Martin refers to Curly's Law as The Single Responsibility Principle
- Curly's Law is about choosing a single, clearly defined goal for any particular bit of code: Do One Thing
  - But in choosing one thing, you are ruling out an infinite universe of other possible things you could have done
- Curly's Law also means consciously choosing what your code won't do
  - This is much more difficult than choosing what to do, because it runs counter to all the natural generalist tendencies of software developers
  - It could mean breaking code apart, violating traditional OOP rules, or introducing duplicate code
  - It's taking one step backward to go two steps forward
- Each variable, each line of code, each function, each class, each project should Do One Thing
  - Unfortunately, we usually don't find out what that one thing is until we've reached the end of it

## it is reflected in several core principles of modern software development

### Don't Repeat Yourself

- If you have more than one way to express the same thing, at some point the two or three different representations will most likely fall out of step with each other
  - Even if they don't, you're guaranteeing yourself the headache of maintaining them in parallel whenever a change occurs
  - And change will occur
  - Don't repeat yourself is important if you want flexible and maintainable software

### Once and Only Once

- Each and every declaration of behavior should occur once, and only once
  - This is one of the main goals, if not the main goal, when refactoring code
  - The design goal is to eliminate duplicated declarations of behavior, typically by merging them or replacing multiple similar implementations with a unifying abstraction

### Single Point of Truth

- Repetition leads to inconsistency and code that is subtly broken, because you changed only some repetitions when you needed to change all of them
  - Often, it also means that you haven't properly thought through the organization of your code
  - Any time you see duplicate code, that's a danger sign
  - Complexity is a cost, don't pay it twice
