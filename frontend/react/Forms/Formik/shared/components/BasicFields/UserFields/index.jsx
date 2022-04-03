import React from "react";

import FormikField, { FIELD_TYPES } from "../../Fields/Formik";
import LoginInput from "../../Fields/Common/LoginInput";

const UserFields = () => {
  return (
    <>
      <FormikField
        type={FIELD_TYPES.text}
        name="userName"
        label="user name"
      />
      <FormikField
        type={FIELD_TYPES.text}
        name="email"
        label="email"
        placeholder="email"
        isRequired
      />
      <FormikField
        type={FIELD_TYPES.text}
        name="phoneNumber"
        label="phone number"
        placeholder="000 0000 0000"
        mask="999 9999 9999 9999"
        isRequired
      />
      <LoginInput
        type="password"
        name="password"
        placeholder="create password"
      />
      <LoginInput
        type="password"
        name="confirmPassword"
        placeholder="confirm password"
      />
      <FormikField
        type={FIELD_TYPES.text}
        name="address"
        label="Address"
      />
    </>
  );
};

export default UserFields;
