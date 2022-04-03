import React, { memo, useCallback } from "react";
import { useField } from "formik";
import PropTypes from "prop-types";

const LoginInput = ({ name, placeholder, type }) => {
  const [field, meta, helpers] = useField(name);
  const { touched, error } = meta;
  const isError = touched && error;

  const inputValue = field?.value != null ? field.value : "";

  const handleTextInputChange = useCallback(
    (e) => {
      const newValue = e.target.value;

      field.onChange(e);
      helpers.setValue(newValue != null ? newValue : "");
    },
    [field, helpers]
  );

  return (
    <div>
      <div>
        <input
          data-test-id="login-input"
          type={type}
          placeholder={placeholder}
          {...field}
          onChange={handleTextInputChange}
          value={inputValue}
        />
      </div>
      <div className="error-area">
        {isError && <p data-test-id="login-input-error">{error}</p>}
      </div>
    </div>
  );
};

LoginInput.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  type: PropTypes.oneOf(["email", "password", "text"])
};

export default memo(LoginInput);
