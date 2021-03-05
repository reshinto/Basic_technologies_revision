import React from "react";
import { shallow } from "enzyme";
import { useField } from "formik";

import TextInput from "./index";

jest.mock("formik", () => ({ useField: jest.fn() }));

const setup = (additionalProps) => {
  const props = {
    label: "test",
    name: "name",
    placeholder: "placeholder",
    textArea: false,
    disabled: false,
    isRequired: false,
    isNumber: false,
    hasOnlyDigits: false,
    ...additionalProps
  };
  const enzymeWrapper = shallow(<TextInput {...props} />);

  return { props, enzymeWrapper };
};

describe("TextInput component", () => {
  const mockField = [
    { value: 10, onChange: jest.fn() },
    { touched: false, error: false },
    { setValue: jest.fn() }
  ];

  beforeEach(() => {
    useField.mockReturnValue(mockField);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Should call onChange and setValue on mask input change", () => {
    const { enzymeWrapper } = setup({ mask: "99/99/9999" });

    const event = { target: { value: "10  10" } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith("1010");
  });

  it("Should call onChange and setValue on input change when is number", () => {
    const { enzymeWrapper } = setup({ isNumber: true });

    const event = { target: { value: "10a" } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith(10);
  });

  it("Should call onChange and setValue on input change when had only digits", () => {
    const { enzymeWrapper } = setup({ hasOnlyDigits: true });

    const event = { target: { value: "10a" } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith("10");
  });

  it("Should call onChange and setValue on input change when is not number", () => {
    const { enzymeWrapper } = setup();

    const event = { target: { value: "10a" } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith(event.target.value);
  });

  it("Should call onChange and setValue on input change when has not only digits", () => {
    const { enzymeWrapper } = setup();

    const event = { target: { value: "10a" } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith(event.target.value);
  });

  it("Should call onChange and setValue on input change when value is null", () => {
    const { enzymeWrapper } = setup();

    const event = { target: { value: null } };

    enzymeWrapper.find({ "data-test-id": "text-input" }).prop("onChange")(
      event
    );

    expect(mockField[0].onChange).toHaveBeenCalledWith(event);
    expect(mockField[2].setValue).toHaveBeenCalledWith("");
  });

  it("Should display error if touched is true and error exists", () => {
    useField.mockReturnValue([{}, { touched: true, error: "Error message" }]);
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "error" }).exists()
    ).toBeTruthy();
  });
});
