import React from "react";
import PropTypes from "prop-types";

//import Dropdown from "./Dropdowns/Dropdown";
//import GroupDropdown from "./Dropdowns/GroupDropdown";
//import DatePicker from "./Pickers/DatePicker";
//import RangePicker from "./Pickers/RangePicker";
//import Checkbox from "./Checkbox";
//import CheckboxGroup from "./CheckboxGroup";
//import FileUpload from "./FileUpload";
//import MultipleTextInput from "./MultipleTextInput";
//import Slider from "./Slider";
import TextInput from "./TextInput";
//import TreeSelect from "./TreeSelect";

const Dropdown = () => <>Drop down</>;
const GroupDropdown = () => <>Group drop down</>;
const DatePicker = () => <>Date picker</>;
const RangePicker = () => <>Range picker</>;
const Checkbox = () => <>Checkbox</>;
const CheckboxGroup = () => <>Checkbox Group</>;
const FileUpload = () => <>File upload</>;
const MultipleTextInput = () => <>Multiple Text Input</>;
const Slider = () => <>Slider</>;
const TreeSelect = () => <>Tree select</>;

export const FIELD_TYPES = {
  text: "text",
  multipleText: "multipleText",
  dropdown: "dropdown",
  groupDropdown: "groupDropdown",
  datePicker: "datePicker",
  rangePicker: "rangePicker",
  slider: "slider",
  fileUpload: "fileUpload",
  checkbox: "checkbox",
  checkboxGroup: "checkboxGroup",
  treeSelect: "treeSelect"
};

const FormikField = ({ type, ...otherProps }) => {
  let control;

  switch (type) {
    case FIELD_TYPES.text:
      control = <TextInput data-test-id="formik-text-input" {...otherProps} />;
      break;
    case FIELD_TYPES.multipleText:
      control = (
        <MultipleTextInput
          data-test-id="formik-multiple-text-input"
          {...otherProps}
        />
      );
      break;
    case FIELD_TYPES.dropdown:
      control = <Dropdown data-test-id="formik-dropdown" {...otherProps} />;
      break;
    case FIELD_TYPES.groupDropdown:
      control = (
        <GroupDropdown data-test-id="formik-group-dropdown" {...otherProps} />
      );
      break;
    case FIELD_TYPES.datePicker:
      control = (
        <DatePicker data-test-id="formik-date-picker" {...otherProps} />
      );
      break;
    case FIELD_TYPES.rangePicker:
      control = (
        <RangePicker data-test-id="formik-range-picker" {...otherProps} />
      );
      break;
    case FIELD_TYPES.slider:
      control = <Slider data-test-id="formik-range-picker" {...otherProps} />;
      break;
    case FIELD_TYPES.fileUpload:
      control = (
        <FileUpload data-test-id="formik-file-upload" {...otherProps} />
      );
      break;
    case FIELD_TYPES.checkbox:
      control = <Checkbox data-test-id="formik-checkbox" {...otherProps} />;
      break;
    case FIELD_TYPES.checkboxGroup:
      control = (
        <CheckboxGroup data-test-id="formik-checkbox-group" {...otherProps} />
      );
      break;
    case FIELD_TYPES.treeSelect:
      control = (
        <TreeSelect data-test-id="formik-tree-select" {...otherProps} />
      );
      break;
    default:
      control = (
        <span data-test-id="formik-unsupported-type">
          Unsupported type {type}
        </span>
      );
  }

  return <div>{control}</div>;
};

FormikField.propTypes = {
  type: PropTypes.string
};

export default FormikField;
