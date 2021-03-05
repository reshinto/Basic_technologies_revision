import React, { memo } from "react";
import PropTypes from "prop-types";

import Modal from "../../Modal";

export const WarningModal = ({
  titleKey,
  contentDescriptor,
  acceptBtnTitleKey,
  rejectBtnTitleKey,
  isOpen,
  isNested,
  isLoading,
  onAcceptClick,
  onRejectClick
}) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Modal
      data-test-id="warning-modal"
      height="unset"
      isOpen={isOpen}
      isNested={isNested}
      isLoading={isLoading}
    >
      <div>
        <div>{titleKey}</div>
        <div>{contentDescriptor}</div>
        <div>
          {onRejectClick && (
            <button
              data-test-id="warning-modal-reject-btn"
              type="button"
              onClick={onRejectClick}
            >
              {rejectBtnTitleKey}
            </button>
          )}
          {onAcceptClick && (
            <button
              data-test-id="warning-modal-accept-btn"
              type="button"
              onClick={onAcceptClick}
            >
              {acceptBtnTitleKey}
            </button>
          )}
        </div>
      </div>
    </Modal>
  );
};

WarningModal.propTypes = {
  titleKey: PropTypes.string.isRequired,
  contentDescriptor: PropTypes.string,
  acceptBtnTitleKey: PropTypes.string,
  rejectBtnTitleKey: PropTypes.string,
  isLoading: PropTypes.bool,
  isOpen: PropTypes.bool.isRequired,
  isNested: PropTypes.bool,
  onAcceptClick: PropTypes.func,
  onRejectClick: PropTypes.func
};

export default memo(WarningModal);
