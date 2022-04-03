import React, { useState } from "react";
import { shallow } from "enzyme";

import TextInput from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useState: jest.fn()
}));

const setup = (additionalProps) => {
  const props = {
    field: {},
    value: "",
    placeholder: "",
    textArea: false,
    disabled: false,
    isSecure: false,
    isError: false,
    onChange: jest.fn(),
    ...additionalProps
  };
  const enzymeWrapper = shallow(<TextInput {...props} />);

  return { enzymeWrapper, props };
};

describe("TextInput component", () => {
  beforeEach(() => {
    useState.mockReturnValue([false, jest.fn()]);
  });

  it("Should render simple input", () => {
    const { enzymeWrapper } = setup();

    expect(
      enzymeWrapper.find({ "data-test-id": "text-input" }).exists()
    ).toBeTruthy();
  });

  it("Should render textArea", () => {
    const { enzymeWrapper } = setup({ textArea: true });

    expect(
      enzymeWrapper.find({ "data-test-id": "text-area" }).exists()
    ).toBeTruthy();
  });

  it("Should render masked input", () => {
    const { enzymeWrapper } = setup({ mask: "99/99/9999" });

    expect(
      enzymeWrapper.find({ "data-test-id": "masked-text-input" }).exists()
    ).toBeTruthy();
  });

  it("Should render input with password type", () => {
    const { enzymeWrapper } = setup({ isSecure: true });

    expect(
      enzymeWrapper.find({ "data-test-id": "text-input" }).prop("type")
    ).toEqual("password");
    expect(
      enzymeWrapper.find({ "data-test-id": "text-input-eye-btn" })
    ).toBeTruthy();
  });

  it("Should render input with password type with opened eye", () => {
    useState.mockReturnValue([true, jest.fn()]);

    const { enzymeWrapper } = setup({ isSecure: true });

    expect(
      enzymeWrapper
        .find({ "data-test-id": "text-input-eye-btn-icon" })
        .prop("src")
    ).toEqual("on");
  });

  it("Should render input with password type with closed eye", () => {
    useState.mockReturnValue([false, jest.fn()]);

    const { enzymeWrapper } = setup({ isSecure: true });

    expect(
      enzymeWrapper
        .find({ "data-test-id": "text-input-eye-btn-icon" })
        .prop("src")
    ).toEqual("off");
  });

  it("Should call setState on eye btn click", () => {
    const setState = jest.fn();
    useState.mockReturnValue([false, setState]);

    const { enzymeWrapper } = setup({ isSecure: true });
    enzymeWrapper
      .find({ "data-test-id": "text-input-eye-btn" })
      .prop("onClick")();

    expect(setState).toHaveBeenCalledWith(true);
  });
});
