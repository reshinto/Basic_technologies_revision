# [Enzyme](https://enzymejs.github.io/enzyme/)
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
> npm i --save-dev [check-prop-types](https://github.com/ratehub/check-prop-types#readme) enzyme [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#readme) enzyme-adapter-react-16
- or
> yarn add --dev [check-prop-types](https://github.com/ratehub/check-prop-types#readme) enzyme [jest-enzyme](https://github.com/FormidableLabs/enzyme-matchers/tree/master/packages/jest-enzyme#readme) enzyme-adapter-react-16
### file setup in xxx.test.js
- remove the ```import {render} from "@testing-library/react";```
  - this is because we will be using enzyme instead
- import the following
```javascript
import Enzyme, {shallow} from "enzyme";  // Enzyme not required if configured in setupTests.js
import EnzymeAdapter from "enzyme-adapter-react-16";  // version depends on react version, only required if setupTests.js is not created
import checkPropTypes from "check-prop-types";  // only required if checking prop types
```
- Configure enzyme
  - doing this requires the following to be written in every test file
```javascript
Enzyme.configure({ adapter: new EnzymeAdapter() });
```
- create a ```setupTests.js``` file in the src directory to enable auto configuration
  - non create-react-apps must create a ```jest.config.js``` file with the following configuration
    ```
    module.exports = {
      setupFilesAfterEnv: ["<rootDir>/src/setupTests.js"]
    }
    ```
  - once the following file has been configured, this fill will always run first before running the tests
```javascript
import Enzyme from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new EnzymeAdapter() });
```
- Create a setup function to enable shallow rendering
```javascript
const setup = (props={}, state=null) => {
  return shallow(<App {...props} />);
};
```
- Enable default props and overriding
```javascript
const defaultProps = { success: false };

const setup = (props={}, state=null) => {
  const setupProps = {...defaultProps, ...props};  // ...props will overwrite defaultProps
  return shallow(<App {...setupProps} />);
};
```
- Create a function to find the component
```javascript
export const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};
```
### prevent data-test attribute from displaying in production
- install the required library
> npm i --save-dev [babel-plugin-react-remove-properties](https://www.npmjs.com/package/babel-plugin-react-remove-properties)
- enable modifying of React settings
> npm run eject
- edit the babel settings in the package.json file
```javascript
"babel": {
  "env": {
    "production": {
      "plugins": [
        ["react-remove-properties", {"properties": ["data-test"]}]
      ]
    }
  },
  "presets": ["react-app"]
}
```
- build production
> npm run build
- install a static server to run the production code
> npm i -g serve
- run server
> serve -s build
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
- render without error
```javascript
test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
```
- using beforeEach to reuse code for all tests inside a describe
```javascript
describe("describe the tests purpose", () => {
  let wrapper;
  beforeEach(() => {
    wrapper = setup();
  });
  test("test something", () => {
    const appComponent = findByTestAttr(wrapper, "component-app");
    expect(appComponent.length).toBe(1);
  });
});
```
- test initial state value
```javascript
test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");  // counter is the variable in the state
  expect(initialCounterState).toBe(0);
});
```
- test clicking of button & state change
```javascript
test("clicking button increments counter display", () => {
  const counter = 7;
  const wrapper = setup(null, {counter});
  
  // find button and click
  const button = findByTestAttr(wrapper, "increment-button");
  button.simulate("click");
  
  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});
```
- test props
```javascript
test("renders no text when 'success' prop is false", () => {
  const wrapper = setup({ success: false });
  const component = findByTestAttr(wrapper, "component-app");
  expect(component.text()).toBe("");
});

test("renders non-empty message when 'success' prop is true", () => {
  const wrapper = setup({ success: false });
  const message = findByTestAttr(wrapper, "component-message");
  expect(message.text().length).not.toBe(0);
});
```
- test prop types
```javascript
test("does not throw warning with expected props", () => {
  const exprectedProps = {success: false};
  // replace ComponentName to the name of the component you are testing
  const propError = checkPropTypes(ComponentName.propTypes, expectedProps, "prop", ComponentName.name);
  expect(propError).toBeUndefined();
});
```
```javascript
// can be refactored
import checkPropTypes from "check-prop-types"
  
export const checkProps = (component, conformingProps) => {
  const propError = checkPropTypes(
    component.propTypes,
    conformingProps,
    "prop",
    component.name
  );
  expect(propError).toBeUndefined();
};
```
```javascript
// refactored to
test("does not throw warning with expected props", () => {
  const exprectedProps = {success: false};
  checkProps(Congrats, expectedProps);
});
```
