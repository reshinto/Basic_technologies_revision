import React from "react";
import { shallow } from "enzyme";
import { useField } from "formik";

import CustomInput from "./index";

jest.mock("formik", () => ({ useField: jest.fn() }));

const basicMockSetup = [
  { value: "1", onChange: jest.fn() },
  { touched: false, error: false },
  { setValue: jest.fn() }
];

const setup = () => {
  const props = {
    name: "name",
    placeholder: "placeholder"
  };
  const enzymeWrapper = shallow(<CustomInput {...props} />);

  return { props, enzymeWrapper };
};

describe("CustomInput component", () => {
  it("Should render simple input if masked or textArea is false", () => {
    useField.mockReturnValue(basicMockSetup);
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "login-input" }).exists()
    ).toBeTruthy();
  });

  it("Should display error if touched is true and error exists", () => {
    useField.mockReturnValue([{}, { touched: true, error: "Error message" }]);
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "login-input-error" }).exists()
    ).toBeTruthy();
  });

  it("Should input value be empty string if field.value is null", () => {
    useField.mockReturnValue([{ value: null }, {}]);
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "login-input" }).props().value
    ).toEqual("");
  });

  it("Should input value be empty string if value is null", () => {
    const setValue = jest.fn();

    useField.mockReturnValue([{ onChange: jest.fn() }, {}, { setValue }]);
    const { enzymeWrapper } = setup();

    enzymeWrapper
      .find({ "data-test-id": "login-input" })
      .props()
      .onChange({ target: { value: "abc123" } });

    expect(setValue).toHaveBeenCalledWith("abc123");

    enzymeWrapper
      .find({ "data-test-id": "login-input" })
      .props()
      .onChange({ target: { value: null } });

    expect(setValue).toHaveBeenCalledWith("");
  });
});
