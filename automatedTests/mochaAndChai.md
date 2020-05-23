# Mocha and Chai unit testing
## Basic setup
### Installation
> npm i --save-dev mocha chai
### Create test file
- if the file you wanna test is named as abc.js, create the same file but ends with test.js
- save all test files into a test folder
> abc.test.js
### Enable ES6 support and to ensure it is transpiled correctly by installing babel
- not required if not using import and export from ES6
>npm i --save-dev @babel/core @babel/preset-env @babel/register
#### Create a .babelrc file
- the content of the file must have the following
```
{
  "presets": ["@babel/preset-env"]
}
```
## run tests
- without ES6 support
> mocha "test/**/*.js"
- with ES6
> npx mocha "test/**/*.test.js" --recursive --require @babel/register
### save the above command in the package.json script test area
```
"scripts": {
  "test": "npx mocha 'test/**/*.test.js' --recursive --require @babel/register"
},
```
- run test with ```npm test```
## Mocha Keywords
### describe
- Use to group similar tests together
- it is a function that takes 2 basic arguments
  - 1st arg is a string used to describe the group of tests we are running
    - example:
      ```javascript
      import {getLetterCount} from "./letter-count";
      
      describe("getLetterCount - basic functionality", );
      ```
  - 2nd arg is a function that contains the actual tests we wanna run
    - inside this function, we can write more describes to curther categorize our tests
    - or write a mocha function called "it"
      - example:
        ```javascript
        import {getLetterCount} from "./letter-count";
      
        describe("getLetterCount - basic functionality", () => {
          it();
        });
        ```
### it
- use to denote individual tests / individual pieces of functionality that we want to test
- it is a function that takes 2 basic arguments
  - 1st arg is a string to tell us what exact piece of functionality this test will be covering
    - example:
      ```javascript
      import {getLetterCount} from "./letter-count";
      
      describe("getLetterCount - basic functionality", () => {
        it("returns an empty object when passed an empty string", );
      });
      ```
  - 2nd arg is a function that contains the actual claims (assertions) we want to make about our code
    - Need to use the "expect" keyword from chai library to make the assertions
      - example:
        ```javascript
        import {expect} from "chai";
        import {getLetterCount} from "./letter-count";
      
        describe("getLetterCount - basic functionality", () => {
          it("returns an empty object when passed an empty string", () => {
            const expected = {};
            const actual = getLetterCount("");
            expect(actual).to.deep.equal(expected);
          });
        });
        ```
## Chai keywords
### expect
- to.deep.equal
  - compare 2 different objects
    - set actual to store the actual value of the return value of the function we want to test
    - set expected as the value we expect the actual variable to be
    - must use "deep" because we are comparing objects, which are stored at different memory locations
      - if "deep" is not used, result will be false even if the values are equal
        - result will only return true if both objects are pointed to the same memory location
      ```javascript
      expect(actual).to.deep.equal(expected);
      ```
- to.equal
  - compare 2 values (numbers, string, boolean, etc.)
  ```javascript
  expect(actual).to.equal(expected);
  ```
- to.be.a
  - check type ("function", "string", "object", "array", "null", "undefined", "error", "promise", etc.)
  ```javascript
  expect(actual).to.be.a("function");
  ```
  
