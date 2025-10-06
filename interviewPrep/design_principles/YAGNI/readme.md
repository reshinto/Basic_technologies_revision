# You Aren't Gonna Need It (YAGNI)

- This principle is similar to the KISS principle, once that both of them aim for a simpler solution

  - The difference between them is that YAGNI focus on removing unnecessary functionality and logic, and KISS focus on the complexity

## Why YAGNI?

- Any work that's only used for a feature that's needed tomorrow, means losing effort from features that need to be done for the current iteration
- Creeping featurism leads to code bloat

  - the software will becomes larger and much more complicated

- In other words
  - The point being that within an agile development framework, you should only focus on your current work iteration and not in the ones to come
    - This is because even though it might sound tempting to work ahead of time and deliver more functionality that you were expecting, the changing nature of the agile workflow makes the future unstable
      - by unstable, It means that given the short-iterations that characterize this methodology, you can receive early feedback, potentially completely changing the future of your project and rendering that feature you delivered without needing

## When not to practice YAGNI

- Learning something new
  - Evaluate a new technology exclusively to gain the time back later and minimize the risk of losing more time by making the wrong decision
- Current design decisions based on future needs
  - Don't sabotage your efforts because you think they violate YANGI
  - Instead, make the future-proof design decision, but only implement enough to fulfill the current need
- Abstracting external dependencies
  - Take time to abstract these dependencies will avoid rework and decrease the complexity
- Testing, Security, Scale, and Business Requirements
  - YAGNI is not a free-pass on writing tests, secure code, considering scale, or business requirements
