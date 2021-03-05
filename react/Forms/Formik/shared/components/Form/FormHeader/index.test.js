import React from "react";
import { shallow } from "enzyme";

import FormHeader from "./index";

const setup = (additionalProps) => {
  const props = { title: "John Smith", ...additionalProps };
  const enzymeWrapper = shallow(<FormHeader {...props} />);

  return { enzymeWrapper, props };
};

describe("FormHeader component", () => {
  it("Should render title if titleDescriptor is undefined", () => {
    const { enzymeWrapper, props } = setup();
    const { title } = props;

    expect(
      enzymeWrapper.find({ "data-test-id": "form-header-title" }).text()
    ).toEqual(title);
  });

  it("Should render titleDescriptor if title undefined", () => {
    const { enzymeWrapper } = setup({ titleDescriptor: { id: "title" } });

    expect(
      enzymeWrapper.find({ "data-test-id": "form-header-title" }).text()
    ).toEqual("Translated Message");
  });

  it("Should render formHeader subtitle if headerSubtitleKey exists", () => {
    const { enzymeWrapper } = setup({ subtitleKey: "user__subtitle" });

    expect(
      enzymeWrapper.find({ "data-test-id": "form-header-subtitle" }).text()
    ).toEqual("Translated Message");
  });
});
