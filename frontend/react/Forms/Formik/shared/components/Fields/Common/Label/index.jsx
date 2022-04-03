import React, { memo } from "react";
import PropTypes from "prop-types";

export const Label = ({ label, name, isRequired }) => (
  <div>
    {label && (
      <label htmlFor={name}>
        {label}
        {isRequired && (
          <span data-test-id="label-asterisk" className="label__asterisk">
            *
          </span>
        )}
      </label>
    )}
  </div>
);

Label.propTypes = {
  label: PropTypes.string,
  name: PropTypes.string,
  isRequired: PropTypes.bool
};

export default memo(Label);
