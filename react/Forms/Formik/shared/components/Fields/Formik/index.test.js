import React from "react";
import { shallow } from "enzyme";

import FormikField, { FIELD_TYPES } from "./index";

jest.mock("./Dropdowns/Dropdown", () => () => <div />);
jest.mock("./Dropdowns/GroupDropdown", () => () => <div />);
jest.mock("./Pickers/DatePicker", () => () => <div />);
jest.mock("./Pickers/RangePicker", () => () => <div />);
jest.mock("./Checkbox", () => () => <div />);
jest.mock("./CheckboxGroup", () => () => <div />);
jest.mock("./FileUpload", () => () => <div />);
jest.mock("./MultipleTextInput", () => () => <div />);
jest.mock("./Slider", () => () => <div />);
jest.mock("./TextInput", () => () => <div />);
jest.mock("./TreeSelect", () => () => <div />);

const setup = (props) => {
  const enzymeWrapper = shallow(<FormikField {...props} />);

  return { enzymeWrapper };
};

describe("FormikField component", () => {
  it("Should return TextInput", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.text });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-text-input" }).exists()
    ).toBeTruthy();
  });

  it("Should return MultipleTextInput", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.multipleText });

    expect(
      enzymeWrapper
        .find({ "data-test-id": "formik-multiple-text-input" })
        .exists()
    ).toBeTruthy();
  });

  it("Should return Dropdown", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.dropdown });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-dropdown" }).exists()
    ).toBeTruthy();
  });

  it("Should return GroupDropdown", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.groupDropdown });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-group-dropdown" }).exists()
    ).toBeTruthy();
  });

  it("Should return DatePicker", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.datePicker });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-date-picker" }).exists()
    ).toBeTruthy();
  });

  it("Should return RangePicker", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.rangePicker });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-range-picker" }).exists()
    ).toBeTruthy();
  });

  it("Should return FileUpload", () => {
    const { enzymeWrapper } = setup({
      type: FIELD_TYPES.fileUpload,
      name: "Property image",
      formats: []
    });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-file-upload" }).exists()
    ).toBeTruthy();
  });

  it("Should return Checkbox", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.checkbox });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-checkbox" }).exists()
    ).toBeTruthy();
  });

  it("Should return CheckboxGroup", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.checkboxGroup });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-checkbox-group" }).exists()
    ).toBeTruthy();
  });

  it("Should return TreeSelect", () => {
    const { enzymeWrapper } = setup({ type: FIELD_TYPES.treeSelect });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-tree-select" }).exists()
    ).toBeTruthy();
  });

  it("Should return an unsupported type if no type was found", () => {
    const { enzymeWrapper } = setup({ type: "Any" });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik-unsupported-type" }).exists()
    ).toBeTruthy();
  });
});
