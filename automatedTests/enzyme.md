# Enzyme
- Creates virtual DOM for testing
- Allows testing without a browser
- Can search through DOM
  - have jQuery style selector
- Can simulate simple events
- Has shallow rendering
  - render componenets only 1 level deep
  - render parent, but use placeholders for children
    - children components won't be rendered
      - allows cleaner & quicker testing
- Provides access to props & states
  - allows manipulation of values
  - enable examining / testing for values
## Setup
### installation (does not include in the create-react-app)
- install the enzyme-adapter-react-version based on the react version you are using
> npm i --save-dev enzyme jest-enzyme enzyme-adapter-react-16
### file setup in xxx.test.js
- remove the ```import {render} from "@testing-library/react";```
  - this is because we will be using enzyme instead
- import the following
```javascript
import Enzyme, {shallow} from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";  // version depends on react version
```
- Configure enzyme
```javascript
Enzyme.configure({ adapter: new EnzymeAdapter() });
```
## Tests
- shallow rendering
  - useful to constrain yourself to testing a component as a unit
  - ensure that your tests aren't indirectly asserting on behavior of child components
```javascript
test("renders without crashing", () => {
  const wrapper = shallow(<App />);  // test fails if error is thrown
});
```
- debug
  - returns DOM / HTML as a string of the wrapper for debugging purposes
  - useful to print out to the console when tests are not passing when you expect them to
```javascript
test("renders without crashing", () => {
  const wrapper = shallow(<App />);  // test fails if error is thrown
  console.log(wrapper.debug());
});
```
