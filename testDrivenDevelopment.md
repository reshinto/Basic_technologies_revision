# Test-Driven Development (TDD)
- Writing tests for production code before writing the actual code
- simple example: writing failing test first before writing the logic
```javascript
function inchesToCentimeters(x) {}

test(inchesToCentimeters(1) === 2.54);
test(inchesToCentimeters(5) === 12.7);
test(inchesToCentimeters(27) === 68.58);
test(inchesToCentimeters(196) === 497.84);
```
## Advantages of TDD
- Ensures code quality
- Forces us to clarify our thinking
- Improves communication between developers
  - Allows new developers to understand the intention from other developers or those who already left the company
    - adding comments to code is good, however, no guarantees that the comments will also be updated together with the code
    - tests provides a concrete medium to express what the code is supposed to do & the different situations where it should produce a certain output
      - if the code changes, tests must also be modified to prevent the tests from failing
- Improves the structure of the production code
  - Requires to think carefully about how the code is arranged
  - Forces to split up large chunks of code into smaller, more testable chunks (thus makes code loosely coupled)
- Allows developers to make worry-free changes
  - if all the test passes, then everything is okay
## Disadvantages of TDD
- Takes longer at first
- TDD is not always a favorite with management
- Need to be careful of writing bad tests
## Basic TDD cycle
1. Write a failing test
2. Write the code but only enough to make the failing code test pass
3. Refactor the code written
## Criteria for a good test
1. Readable
    - Test should be even more readable than the code they cover
    - it should answer "What's the actual behavior?", "What's the expected behavior?", "Why?"
2. Isolated
    - Test in 1 test cannot affect the results of the other tests
3. Thorough
    - Test must cover both generic expected inputs & unexpected or edge case inputs
4. Explicit
    - All the information required to reproduce the results of the test, must be readily accessible to anyone
    - There should be no shared state between components, nothing hidden, everything involved in getting to the final result should be clear & obvious
## 3 types of tests
1. Unit Tests: test very specific, low level pieces of functionality (end users won't really notice or think about directly)
2. Integration Tests: ensures that the individual pieces of the application work together correctly (e.g. testing if app communicates correctly with a database or api)
3. End-to-End (E2E) Tests: ensure the entire app works as seen from the viewpoint of a user
    - tools: [selenium](https://www.selenium.dev/documentation/en/), [puppeteer](https://github.com/puppeteer/puppeteer), [cypress](https://www.cypress.io/)
    
