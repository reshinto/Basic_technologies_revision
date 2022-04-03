import React from "react";
import PropTypes from "prop-types";

const FormFooter = ({ children, error }) => (
  <div data-test-id="form-footer">
    {error && <div>{error}</div>}
    <div>{children}</div>
  </div>
);

FormFooter.propTypes = {
  children: PropTypes.node,
  error: PropTypes.object
};

export default FormFooter;
