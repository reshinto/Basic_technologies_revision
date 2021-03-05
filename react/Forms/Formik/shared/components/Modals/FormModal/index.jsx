import React, { memo } from "react";
import { Form, Formik } from "formik";
import noop from "lodash/noop";
import PropTypes from "prop-types";

import useModal from "../../../hooks/useModal";
import FormFooter from "../../Form/FormFooter";
import FormHeader from "../../Form/FormHeader";
import Modal from "../../Modal";
import WarningModal from "../WarningModal";

export const FormModal = ({
  headerTitle,
  headerTitleDescriptor,
  headerSubtitleKey,
  acceptBtnTitleKey,
  cancelBtnTitleKey,
  closeBtnTitleKey,

  cancelModalTitleKey,
  cancelModalContentDescriptor,
  cancelModalRejectBtnTitleKey,
  cancelModalAcceptBtnTitleKey,

  children,

  initialValues,
  validationSchema,
  validate,
  enableReinitialize,
  height,
  isOpen,
  isLoading,
  passFormikProps,

  onSubmit = noop,
  onClose
}) => {
  const [
    isCancelModalVisible,
    handleCancelModalOpen,
    handleCancelModalClose
  ] = useModal();

  return (
    <Modal height={height} isOpen={isOpen} isLoading={isLoading}>
      <Formik
        data-test-id="formik"
        enableReinitialize={enableReinitialize}
        initialValues={initialValues}
        validationSchema={validationSchema}
        validate={validate}
        onSubmit={onSubmit}
      >
        {({ values, dirty, isValid, resetForm, errors, setFieldValue }) => {
          const { footerError } = errors;

          const handleCancelModalAcceptBtnClick = () => {
            handleCancelModalClose();
            resetForm();
            onClose();
          };

          const handleCloseBtnClick = () => {
            resetForm();
            onClose();
          };

          return (
            <Form data-test-id="form-wrapper">
              <div>
                <FormHeader
                  title={headerTitle}
                  titleDescriptor={headerTitleDescriptor}
                  subtitleKey={headerSubtitleKey}
                />
                <div data-test-id="form-body">
                  {passFormikProps
                    ? children({ values, setFieldValue })
                    : children}
                </div>
              </div>
              <FormFooter error={footerError}>
                {cancelBtnTitleKey && (
                  <button
                    data-test-id="cancel-btn"
                    type="button"
                    onClick={handleCancelModalOpen}
                  >
                    {cancelBtnTitleKey}
                  </button>
                )}
                {acceptBtnTitleKey && (
                  <button
                    data-test-id="accept-btn"
                    type="submit"
                    disabled={!dirty || !isValid}
                  >
                    {acceptBtnTitleKey}
                  </button>
                )}
                {closeBtnTitleKey && (
                  <button
                    data-test-id="close-btn"
                    type="button"
                    onClick={handleCloseBtnClick}
                  >
                    {closeBtnTitleKey}
                  </button>
                )}
              </FormFooter>
              {cancelModalContentDescriptor && (
                <WarningModal
                  data-test-id="warning-modal"
                  titleKey={cancelModalTitleKey}
                  contentDescriptor={cancelModalContentDescriptor}
                  acceptBtnTitleKey={cancelModalAcceptBtnTitleKey}
                  rejectBtnTitleKey={cancelModalRejectBtnTitleKey}
                  isOpen={isCancelModalVisible}
                  isNested
                  onAcceptClick={handleCancelModalAcceptBtnClick}
                  onRejectClick={handleCancelModalClose}
                />
              )}
            </Form>
          );
        }}
      </Formik>
    </Modal>
  );
};

FormModal.propTypes = {
  headerTitle: PropTypes.string,
  headerTitleDescriptor: PropTypes.string,
  headerSubtitleKey: PropTypes.string,
  acceptBtnTitleKey: PropTypes.string,
  cancelBtnTitleKey: PropTypes.string,
  closeBtnTitleKey: PropTypes.string,

  cancelModalTitleKey: PropTypes.string,
  cancelModalContentDescriptor: PropTypes.string,
  cancelModalRejectBtnTitleKey: PropTypes.string,
  cancelModalAcceptBtnTitleKey: PropTypes.string,

  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),

  initialValues: PropTypes.objectOf(PropTypes.any),
  validationSchema: PropTypes.any,
  validate: PropTypes.func,
  enableReinitialize: PropTypes.bool,
  height: PropTypes.oneOf(["inherit", "unset"]),
  isOpen: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool,
  passFormikProps: PropTypes.bool,

  onSubmit: PropTypes.func,
  onClose: PropTypes.func.isRequired
};

export default memo(FormModal);
