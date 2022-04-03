import React from "react";
import { shallow } from "enzyme";

import { Label } from "./index";

const setup = (props) => {
  const enzymeWrapper = shallow(<Label label="Label name" {...props} />);

  return { enzymeWrapper, props };
};

describe("Label component", () => {
  it("Should display label asterisk if isRequired is true", () => {
    const { enzymeWrapper } = setup({ isRequired: true });

    expect(
      enzymeWrapper.find({ "data-test-id": "label-asterisk" }).exists()
    ).toBeTruthy();
  });

  it("Shouldn't display label asterisk if isRequired is false", () => {
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "label-asterisk" }).exists()
    ).toBeFalsy();
  });
});
