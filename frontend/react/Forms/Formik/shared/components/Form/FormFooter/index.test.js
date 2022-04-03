import React from "react";
import { shallow } from "enzyme";

import FormFooter from "./index";

describe("FormFooter component", () => {
  const setup = () => {
    const enzymeWrapper = shallow(<FormFooter />);

    return { enzymeWrapper };
  };

  it("Should render FormFooter correctly", () => {
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "form-footer" }).exists()
    ).toBeTruthy();
  });
});
