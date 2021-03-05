import React from "react";
import { shallow } from "enzyme";

import { WarningModal } from "./index";

jest.mock("react-dom", () => {
  const original = jest.requireActual("react-dom");

  return { ...original, createPortal: (node) => node };
});

const mockOpen = jest.fn();
const mockClose = jest.fn();
jest.mock("../../../hooks/useModal", () => () => [true, mockOpen, mockClose]);

const setup = (additionalProps) => {
  const props = {
    titleKey: "test",
    contentDescriptor: { id: "test" },
    isOpen: true,
    onAcceptClick: jest.fn(),
    onRejectClick: jest.fn(),
    ...additionalProps
  };
  const enzymeWrapper = shallow(<WarningModal {...props} />);

  return { enzymeWrapper, props };
};

describe("WarningModal component", () => {
  it("Should call onRejectClick on reject btn click", () => {
    const { enzymeWrapper, props } = setup();
    const { onRejectClick } = props;

    enzymeWrapper
      .find({ "data-test-id": "warning-modal-reject-btn" })
      .prop("onClick")();

    expect(onRejectClick).toHaveBeenCalled();
  });

  it("Should call onAcceptClick on accept btn click", () => {
    const { enzymeWrapper, props } = setup();
    const { onAcceptClick } = props;

    enzymeWrapper
      .find({ "data-test-id": "warning-modal-accept-btn" })
      .prop("onClick")();

    expect(onAcceptClick).toHaveBeenCalled();
  });
});
