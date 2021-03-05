import React from "react";
//import { useDispatch, useSelector } from 'react-redux';
import { shallow } from "enzyme";

//import { containerId, createUser } from '../reducer';

import AddUserModal from "./index";

/*jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => dispatch),
  };
});*/

jest.mock("../../shared/components/Modals/FormModal", () => () => <div />);

const setup = () => {
  const props = { isOpen: true, onClose: jest.fn() };
  const enzymeWrapper = shallow(<AddUserModal {...props} />);

  return { enzymeWrapper, props };
};

describe("AddUserModal component", () => {
  //const selector = (values) => (state) => state({ [containerId]: values });

  beforeEach(() => {
    //useSelector.mockImplementation(selector({ isRemovePinCodeLoading: false }));
  });

  it("Should call createUser", () => {
    //const dispatch = useDispatch();

    const { enzymeWrapper } = setup();

    const values = {};
    const helpers = {
      setSubmitting: jest.fn(),
      setFieldError: jest.fn(),
      resetForm: jest.fn()
    };

    enzymeWrapper.find({ "data-test-id": "form-modal" }).prop("onSubmit")(
      values,
      helpers
    );

    /*expect(dispatch).toHaveBeenCalledWith(
      createUser.request({ values, ...helpers, onClose: expect.any(Function) })
    );*/
  });
});
