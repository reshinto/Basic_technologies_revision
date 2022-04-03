import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { mount, shallow } from 'enzyme';

import { UsersPage } from './index';
import { containerId, fetchUsers, fetchUser } from './reducer';

jest.mock('react-redux', () => {
  const dispatch = jest.fn();

  return {
    useSelector: jest.fn(),
    useDispatch: jest.fn(() => dispatch),
  };
});

const setup = () => {
  const enzymeWrapper = shallow(<UsersPage />);

  return { enzymeWrapper };
};

describe('UsersPage component', () => {
  const userId = 1;

  const selector = (values) => (state) => state({ [containerId]: values });

  beforeEach(() => {
    useSelector.mockImplementation(selector({ usersData: [], isFetchUsersLoading: false }));
  });

  it('Should call fetchUsers on mount', () => {
    const dispatch = useDispatch();

    mount(<UsersPage />);

    expect(dispatch).toHaveBeenCalledWith(fetchUsers.request());
    expect(dispatch).toHaveBeenCalledWith(fetchUser.request(userId));
  });
});
