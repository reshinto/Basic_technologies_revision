import React from "react";
import PropTypes from "prop-types";

const FormHeader = ({ title, titleDescriptor, subtitleKey }) => {
  return (
    <div>
      <h1 data-test-id="form-header-title">
        {titleDescriptor ? titleDescriptor : title}
      </h1>
      {subtitleKey && (
        <span data-test-id="form-header-subtitle">{subtitleKey}</span>
      )}
    </div>
  );
};

FormHeader.propTypes = {
  title: PropTypes.string,
  titleDescriptor: PropTypes.string,
  subtitleKey: PropTypes.string
};

export default FormHeader;
