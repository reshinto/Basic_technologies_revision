import React, { memo, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import PerfectScrollbar from "react-perfect-scrollbar";
import { Backdrop } from "@material-ui/core";
import PropTypes from "prop-types";

export const Modal = ({ height = "inherit", isOpen, isLoading, children }) => {
  const scrollableAreaRef = useRef();

  useEffect(() => {
    if (isOpen) {
      scrollableAreaRef.current.scrollTo(0, 0);
    }
  }, [isOpen]);

  return ReactDOM.createPortal(
    <>
      <div>
        {isLoading && <div data-test-id="modal-loader">Loading...</div>}
        <PerfectScrollbar
          containerRef={(_ref) => {
            scrollableAreaRef.current = _ref;
          }}
          options={{ wheelPropagation: false }}
          style={{ height }}
        >
          {children}
        </PerfectScrollbar>
      </div>
      <Backdrop open={isOpen} />
    </>,
    document.body
  );
};

Modal.propTypes = {
  height: PropTypes.oneOf(["inherit", "unset"]),
  isOpen: PropTypes.bool.isRequired,
  isNested: PropTypes.bool,
  isLoading: PropTypes.bool,
  children: PropTypes.node
};

export default memo(Modal);
