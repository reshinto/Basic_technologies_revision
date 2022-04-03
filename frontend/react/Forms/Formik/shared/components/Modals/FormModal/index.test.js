import React from "react";
import { shallow } from "enzyme";
import noop from "lodash/noop";

import { FormModal } from "./index";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return { ...original, createPortal: (node) => node };
});

const mockOpen = jest.fn();
const mockClose = jest.fn();
jest.mock("../../../hooks/useModal", () => () => [true, mockOpen, mockClose]);

jest.mock("../../Modal", () => ({ children }) => <div>{children}</div>);

describe("FormModal component", () => {
  const setup = (additionalProps = {}) => {
    const props = {
      headerTitleDescriptor: {
        id: "test"
      },
      isOpen: true,
      onSubmit: jest.fn(),
      onClose: jest.fn(),
      ...additionalProps
    };
    const enzymeWrapper = shallow(<FormModal {...props} />);

    return { enzymeWrapper, props };
  };

  it("Should call onSubmit on form submit", () => {
    const { enzymeWrapper, props } = setup();
    const { onSubmit } = props;

    enzymeWrapper.find({ "data-test-id": "formik" }).prop("onSubmit")();

    expect(onSubmit).toHaveBeenCalled();
  });

  it("Should call empty function if onSubmit does not exist", () => {
    const { enzymeWrapper } = setup({ onSubmit: undefined });

    expect(
      enzymeWrapper.find({ "data-test-id": "formik" }).prop("onSubmit")
    ).toEqual(noop);
  });

  it("Should call onClose and close warning modal on accept warning modal btn click", () => {
    const { enzymeWrapper, props } = setup({
      cancelModalTitleKey: "test",
      cancelModalContentDescriptor: { id: "test" }
    });
    const { onClose } = props;

    const formikProps = {
      dirty: false,
      isValid: false,
      resetForm: jest.fn(),
      errors: {}
    };
    enzymeWrapper
      .find({ "data-test-id": "formik" })
      .renderProp("children")(formikProps)
      .find({ "data-test-id": "warning-modal" })
      .prop("onAcceptClick")();

    expect(mockClose).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("Should call close warning modal on reject warning modal btn click", () => {
    const { enzymeWrapper } = setup({
      cancelModalTitleKey: "test",
      cancelModalContentDescriptor: { id: "test" }
    });

    const formikProps = {
      dirty: false,
      isValid: false,
      resetForm: jest.fn(),
      errors: {}
    };
    enzymeWrapper
      .find({ "data-test-id": "formik" })
      .renderProp("children")(formikProps)
      .find({ "data-test-id": "warning-modal" })
      .prop("onRejectClick")();

    expect(mockClose).toHaveBeenCalled();
  });

  it("Should call onClose and reset form on close btn click", () => {
    const { enzymeWrapper, props } = setup({ closeBtnTitleKey: "title" });
    const { onClose } = props;
    const formikProps = {
      dirty: false,
      isValid: false,
      resetForm: jest.fn(),
      errors: {}
    };

    enzymeWrapper
      .find({ "data-test-id": "formik" })
      .renderProp("children")(formikProps)
      .find({ "data-test-id": "close-btn" })
      .prop("onClick")();

    expect(formikProps.resetForm).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("Should disable add button when form is not dirty or is not valid", () => {
    const { enzymeWrapper } = setup({ acceptBtnTitleKey: "title" });
    const arr = [
      { props: { dirty: false, isValid: false, errors: {} }, res: true },
      { props: { dirty: true, isValid: false, errors: {} }, res: true },
      { props: { dirty: false, isValid: true, errors: {} }, res: true }
    ];

    arr.forEach(({ props, res }) => {
      const acceptBtn = enzymeWrapper
        .find({ "data-test-id": "formik" })
        .renderProp("children")(props)
        .find({ "data-test-id": "accept-btn" });

      expect(acceptBtn.prop("disabled")).toEqual(res);
    });
  });

  it("Shouldn render CancelButton if cancelBtnTitleKey exists", () => {
    const { enzymeWrapper } = setup({
      cancelBtnTitleKey: "user__cancel_btn"
    });
    const formik = enzymeWrapper.find({ "data-test-id": "formik" }).dive();

    expect(formik.find({ "data-test-id": "cancel-btn" }).exists()).toBeTruthy();
  });

  it("Should use children as a function when passFormikProps is true", () => {
    const children = jest.fn();

    const { enzymeWrapper } = setup({
      passFormikProps: true,
      children
    });
    enzymeWrapper.find({ "data-test-id": "formik" }).dive();

    expect(children).toHaveBeenCalled();
  });
});
