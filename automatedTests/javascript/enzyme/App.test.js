import React from "react";
import {shallow} from "enzyme";
import {findByTestAttr} from "../test/testUtils";
import App from "./App";

const setup = (props = {}, state = null) => {
  return shallow(<App {...props} />);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});
