import React, { useState } from "react";
import MaskedInput from "react-input-mask";
import PropTypes from "prop-types";

const TextInput = ({
  field,
  value,
  placeholder,
  maxLength,
  mask,
  textArea,
  disabled,
  isSecure,
  isError,
  onChange
}) => {
  const [isTextVisible, setTextVisibility] = useState(false);

  const handleHideIconClick = () => setTextVisibility(!isTextVisible);

  if (mask) {
    return (
      <MaskedInput
        data-test-id="masked-text-input"
        {...field}
        value={value}
        placeholder={placeholder}
        mask={mask}
        maskChar={null}
        disabled={disabled}
        onChange={onChange}
      />
    );
  }

  if (textArea) {
    return (
      <textarea
        data-test-id="text-area"
        {...field}
        value={value}
        placeholder={placeholder}
        disabled={disabled}
      />
    );
  }

  return (
    <div>
      <input
        data-test-id="text-input"
        {...field}
        type={isSecure && !isTextVisible ? "password" : "text"}
        value={value}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={disabled}
        onChange={onChange}
      />
      {isSecure && (
        <button
          data-test-id="text-input-eye-btn"
          type="button"
          onClick={handleHideIconClick}
        >
          <img
            data-test-id="text-input-eye-btn-icon"
            alt="Visibility icon"
            src={isTextVisible ? "on" : "off"}
          />
        </button>
      )}
    </div>
  );
};

TextInput.propTypes = {
  field: PropTypes.objectOf(PropTypes.any),
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  mask: PropTypes.string,
  textArea: PropTypes.bool,
  disabled: PropTypes.bool,
  isSecure: PropTypes.bool,
  isError: PropTypes.bool,
  onChange: PropTypes.func.isRequired
};

export default TextInput;
