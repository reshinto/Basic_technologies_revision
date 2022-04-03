import React from "react";
// required only if using toast
import { toast } from "react-toastify";

export const ERROR_TYPES = {
  server: "Server Error",
  internal: "Internal Error"
};

class ErrorHandler {
  errorsMap = new Map();

  showError(errorCode, type = ERROR_TYPES.server) {
    if (!errorCode) {
      return;
    }

    const errorContent = () => (
      <>
        <img alt="Attention Icon" />
        {errorCode}
      </>
    );

    const errorId = toast.error(errorContent, { className: "server-error" });
    this.errorsMap.set(errorId, type);

    return errorId;
  }

  closeAllErrors() {
    this.errorsMap.forEach((_, key) => toast.dismiss(key));
  }
}

export const errorHandler = new ErrorHandler();
