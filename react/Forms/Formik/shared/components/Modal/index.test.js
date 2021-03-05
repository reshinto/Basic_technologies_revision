import React, { useRef } from "react";
import { mount, shallow } from "enzyme";

import { Modal } from "./index";

jest.mock("react", () => ({
  ...jest.requireActual("react"),
  useRef: jest.fn(() => ({ current: { scrollTo: jest.fn() } }))
}));

jest.mock("react-perfect-scrollbar", () => () => <div />);

const setup = (additionalProps) => {
  const props = { isOpen: false, ...additionalProps };
  const enzymeWrapper = shallow(
    <Modal {...props}>
      <div />
    </Modal>
  );

  return { enzymeWrapper, props };
};

describe("Modal component", () => {
  it("Should scroll to top when modal has been opened", () => {
    const scrollTo = jest.fn();
    const mRef = { current: { scrollTo } };
    useRef.mockReturnValueOnce(mRef);

    mount(
      <Modal isOpen>
        <div />
      </Modal>
    );

    expect(scrollTo).toHaveBeenCalledWith(0, 0);
  });

  it("Should render Loader if isLoading is true", () => {
    const { enzymeWrapper } = setup({ isLoading: true });

    expect(
      enzymeWrapper.find({ "data-test-id": "modal-loader" }).exists()
    ).toBeTruthy();
  });

  it("Should not render Loader if isLoading is false", () => {
    const { enzymeWrapper } = setup({ isLoading: false });

    expect(
      enzymeWrapper.find({ "data-test-id": "modal-loader" }).exists()
    ).toBeFalsy();
  });
});
