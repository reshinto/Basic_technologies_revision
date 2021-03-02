import React from 'react';
import { expectSaga } from 'redux-saga-test-plan';
import { call, select } from 'redux-saga-test-plan/matchers';
import { throwError } from 'redux-saga-test-plan/providers';

import * as api from '../../shared/services/api';
import { getColumnOrder } from '../../shared/services/utils';

import { createUser, fetchUsers, fetchUser, removeUser, selector, updateUser } from './reducer';
import usersSagas from './sagas';

export const DEFAULT_PAGINATION_PARAMS = {
  offset: -1,
  limit: -1,
  orderDir: "desc"
};

describe('UsersPage sagas', () => {
  const userId = 1;

  it('Should put success with response on successful fetchUsers', () => {
    const res = [];

    const sortBy = [];
    const { orderBy, orderDir } = getColumnOrder(sortBy);

    return expectSaga(usersSagas)
      .provide([
        [select(selector), { sortBy }],
        [call(api.users.get, { ...DEFAULT_PAGINATION_PARAMS, orderBy, orderDir }), res],
      ])
      .put(fetchUsers.success(res))
      .dispatch(fetchUsers.request())
      .silentRun();
  });

  it('Should put failure with error on unsuccessful fetchUsers', () => {
    const error = new Error('error text');

    const sortBy = [];
    const { orderBy, orderDir } = getColumnOrder(sortBy);

    return expectSaga(usersSagas)
      .provide([
        [select(selector), { sortBy }],
        [
          call(api.users.get, { ...DEFAULT_PAGINATION_PARAMS, orderBy, orderDir }),
          throwError(error),
        ],
      ])
      .put(fetchUsers.failure(error))
      .dispatch(fetchUsers.request())
      .silentRun();
  });

  it('Should put success with response on successful fetchUser', () => {
    const res = {};

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [call(api.user.get, userId), res],
      ])
      .put(fetchUser.success(res))
      .dispatch(fetchUser.request(userId))
      .silentRun();
  });

  it('Should put failure with error on unsuccessful fetchUser', () => {
    const error = new Error('error text');

    const sortBy = [];
    const { orderBy, orderDir } = getColumnOrder(sortBy);

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [
          call(api.user.get, userId),
          throwError(error),
        ],
      ])
      .put(fetchUser.failure(error))
      .dispatch(fetchUser.request(userId))
      .silentRun();
  });

  it('Should put success with response on successful createUser', () => {
    const payload = {
      values: {},
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
      onClose: jest.fn(),
    };

    return expectSaga(usersSagas)
      .provide([[select(selector)], [call(api.user.post, payload.values)]])
      .put(createUser.success())
      .put(fetchUsers.request())
      .dispatch(createUser.request(payload))
      .silentRun();
  });

  it('Should put failure with response on unsuccessful createUser', () => {
    const error = new Error('error text');

    const payload = {
      values: {},
      setSubmitting: jest.fn(),
      setFieldError: jest.fn(),
      resetForm: jest.fn(),
      onClose: jest.fn(),
    };

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [call(api.user.post, payload.values), throwError(error)],
      ])
      .put(createUser.failure(error))
      .call(
        payload.setFieldError,
        'username',
        'username needs to be unique'
      )
      .dispatch(createUser.request(payload))
      .silentRun();
  });

  it('Should put success with response on successful updateUser', () => {
    const payload = {
      values: { userId },
      setSubmitting: jest.fn(),
      resetForm: jest.fn(),
      onClose: jest.fn(),
    };

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [call(api.user.put, payload.values.userId, payload.values)],
      ])
      .put(updateUser.success())
      .put(fetchUsers.request())
      .dispatch(updateUser.request(payload))
      .silentRun();
  });

  it('Should put failure with response on unsuccessful updateUser', () => {
    const error = new Error('error text');

    const sortBy = [];
    const payload = {
      values: { userId },
      setSubmitting: jest.fn(),
      setFieldError: jest.fn(),
      resetForm: jest.fn(),
      onClose: jest.fn(),
    };

    return expectSaga(usersSagas)
      .provide([
        [select(selector), { sortBy }],
        [call(api.user.put, payload.values.userId, payload.values), throwError(error)],
      ])
      .put(updateUser.failure(error))
      .call(
        payload.setFieldError,
        'username',
        'username needs to be unique'
      )
      .dispatch(updateUser.request(payload))
      .silentRun();
  });

  it('Should put success with response on successful removeUser', () => {
    const data = { userId };
    const payload = { data, callback: jest.fn() };

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [call(api.user.delete, payload.data.userId)],
      ])
      .put(removeUser.success())
      .put(fetchUsers.request())
      .dispatch(removeUser.request(payload))
      .silentRun();
  });

  it('Should put failure with response on unsuccessful removeUser', () => {
    const error = new Error('error text');

    const data = { userId: 1 };
    const payload = { data, callback: jest.fn() };

    return expectSaga(usersSagas)
      .provide([
        [select(selector)],
        [call(api.user.delete, payload.data.userId), throwError(error)],
      ])
      .put(removeUser.failure(error))
      .dispatch(removeUser.request(payload))
      .silentRun();
  });
});
