/*
import React from "react";
import { useDispatch, useSelector } from 'react-redux';
import { mount, shallow } from "enzyme";

import { UsersPage } from "./index";
import { containerId, fetchUsers, updateUsersPagination } from './reducer';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => dispatch),
  };
});

jest.mock("./AddUserModal", () => () => <div />);

const setup = () => {
  const enzymeWrapper = shallow(<UsersPage />);

  return { enzymeWrapper };
};

describe("UsersPage component", () => {
  const selector = (values) => (state) => state({ [containerId]: values });

  beforeEach(() => {
    useSelector.mockImplementation(selector({ data: [], sortBy: [], isLoading: false }));
  });

  it('Should call fetchUsers on mount', () => {
    const dispatch = useDispatch();

    mount(<UsersPage />);

    expect(dispatch).toHaveBeenCalledWith(fetchUsers.request());
  });

  it('Should call updateUsersPagination and fetchUsers on pagination data change', () => {
    const dispatch = useDispatch();

    const { enzymeWrapper } = setup();

    const values = { sortBy: [] };
    enzymeWrapper.find({ 'data-test-id': 'data-grid' }).prop('onPaginationDataChange')(values);

    expect(dispatch).toHaveBeenCalledWith(updateUsersPagination.action(values));
    expect(dispatch).toHaveBeenCalledWith(fetchUsers.request());
  });
});
*/
