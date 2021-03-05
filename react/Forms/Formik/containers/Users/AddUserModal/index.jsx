import React, { memo, useCallback } from "react";
//import { useDispatch, useSelector } from 'react-redux';
import PropTypes from "prop-types";

import UserFields from "../../../shared/components/BasicFields/UserFields";
import FormModal from "../../../shared/components/Modals/FormModal";
import { userFormInitialValues } from "../../../shared/constants";
import { userFormSchema } from "../../../shared/services/validationSchemas";
//import { containerId, createUser } from '../reducer';

const isCreateUserLoading = false; // for illustration purpose

export const AddUserModal = ({ isOpen, onClose }) => {
  //const dispatch = useDispatch();

  //const { isCreateUserLoading } = useSelector((state) => state[containerId]);

  const handleFormSubmit = (f) => f;
  /*const handleFormSubmit = useCallback(
    (values, { setSubmitting, setFieldError, resetForm }) =>
      dispatch(createUser.request({ values, setSubmitting, setFieldError, resetForm, onClose })),
    [dispatch, onClose]
  );*/

  return (
    <FormModal
      data-test-id="form-modal"
      headerTitleDescriptor="modal title"
      acceptBtnTitleKey="add btn"
      cancelBtnTitleKey="cancel btn"
      cancelModalTitleKey="modal title"
      cancelModalContentDescriptor="cancel modal content"
      cancelModalRejectBtnTitleKey="cancel btn"
      cancelModalAcceptBtnTitleKey="yes btn"
      initialValues={userFormInitialValues}
      validationSchema={userFormSchema}
      height="unset"
      isOpen={isOpen}
      isLoading={isCreateUserLoading}
      onSubmit={handleFormSubmit}
      onClose={onClose}
    >
      <UserFields />
    </FormModal>
  );
};

AddUserModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
};

export default memo(AddUserModal);
