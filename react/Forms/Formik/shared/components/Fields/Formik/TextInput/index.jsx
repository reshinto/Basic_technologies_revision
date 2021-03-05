import React, { useCallback } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

import Label from "../../Common/Label";
import TextInput from "../../Common/TextInput";

const NOT_NUMBERS = /\D+/;

export const getNumber = (value) =>
  value && String(value).replace(NOT_NUMBERS, "")
    ? +String(value).replace(NOT_NUMBERS, "")
    : null;

export const getDigits = (value) =>
  value ? String(value).replace(NOT_NUMBERS, "") : null;

const FormikTextInput = ({
  label,
  name,
  placeholder,
  maxLength,
  mask,
  textArea,
  disabled,
  isSecure,
  isRequired,
  isNumber,
  hasOnlyDigits
}) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const isError = touched && !!error;

  const handleMaskedInputChange = useCallback(
    (e) => {
      field.onChange(e);
      helpers.setValue(e.target.value.replace(/ /g, ""));
    },
    [field, helpers]
  );

  const handleTextInputChange = useCallback(
    (e) => {
      let { value } = e.target;
      if (isNumber) {
        value = getNumber(value);
      }

      if (hasOnlyDigits) {
        value = getDigits(value);
      }

      field.onChange(e);
      helpers.setValue(value ?? "");
    },
    [field, helpers, isNumber, hasOnlyDigits]
  );

  return (
    <>
      <Label label={label} name={name} isRequired={isRequired} />
      <div>
        <TextInput
          data-test-id="text-input"
          field={field}
          value={field?.value ?? ""}
          placeholder={placeholder}
          maxLength={maxLength}
          mask={mask}
          textArea={textArea}
          disabled={disabled}
          isSecure={isSecure}
          isError={isError}
          onChange={mask ? handleMaskedInputChange : handleTextInputChange}
        />
        <div className="error-area">
          {isError && (
            <p data-test-id="error" className="error">
              {error}
            </p>
          )}
        </div>
      </div>
    </>
  );
};

FormikTextInput.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  mask: PropTypes.string,
  textArea: PropTypes.bool,
  disabled: PropTypes.bool,
  isSecure: PropTypes.bool,
  isRequired: PropTypes.bool,
  isNumber: PropTypes.bool,
  hasOnlyDigits: PropTypes.bool
};

export default FormikTextInput;
