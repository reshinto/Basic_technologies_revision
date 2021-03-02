import { all, call, put, select, takeLatest } from "redux-saga/effects";

import * as api from "../../shared/services/api";
import { errorHandler } from "../../shared/services/errorHandler";
import { getColumnOrder } from "../../shared/services/utils";

import {
  createUser,
  fetchUser,
  fetchUsers,
  removeUser,
  selector,
  updateUser
} from "./reducer";

export const DEFAULT_PAGINATION_PARAMS = {
  offset: -1,
  limit: -1,
  orderDir: "desc"
};

export function* fetchUsersSaga() {
  errorHandler.closeAllErrors(); // if using toast
  
  // if requires sort
  const { sortBy } = yield select(selector);
  const { orderBy, orderDir } = getColumnOrder(sortBy);

  try {
    const res = yield call(api.users.get, {
      ...DEFAULT_PAGINATION_PARAMS,
      orderBy,
      orderDir
    });

    yield put(fetchUsers.success(res));
  } catch (err) {
    errorHandler.showError(err?.errorCode);
    yield put(fetchUsers.failure(err));
  }
}

export function* fetchUserSaga(userId) {
  errorHandler.closeAllErrors(); // if using toast

  try {
    const res = yield call(api.user.get, userId);

    yield put(fetchUser.success(res));
  } catch (err) {
    errorHandler.showError(err?.errorCode);
    yield put(fetchUser.failure(err));
  }
}

export function* createUserSaga({ payload }) {
  errorHandler.closeAllErrors(); // if using toast
  // if using formik
  const { values, setSubmitting, resetForm, setFieldError, onClose } = payload;

  try {
    yield call(api.user.post, values);

    setSubmitting(false);
    resetForm();
    onClose();

    yield put(createUser.success());
    yield put(fetchUsers.request());
  } catch (err) {
    errorHandler.showError(err?.errorCode);
    yield put(createUser.failure(err));

    setSubmitting(false);

    yield call(setFieldError, "username", "username needs to be unique");
  }
}

export function* updateUserSaga({ payload }) {
  errorHandler.closeAllErrors(); // if using toast
  // if using formik
  const { values, setSubmitting, resetForm, setFieldError, onClose } = payload;
  const { userId } = values;

  try {
    const res = yield call(api.user.put, userId, values);

    setSubmitting(false);
    resetForm();
    onClose();

    yield put(updateUser.success(res));
    yield put(fetchUsers.request());
  } catch (err) {
    errorHandler.showError(err?.errorCode);
    yield put(updateUser.failure(err));

    setSubmitting(false);

    yield call(setFieldError, "username", "username needs to be unique");
  }
}

export function* removeUserSaga({ payload }) {
  errorHandler.closeAllErrors(); // if using toast
  const { data, callback } = payload;

  try {
    yield call(api.user.delete, data.id);

    yield put(removeUser.success());
    yield put(fetchUsers.request());

    callback();
  } catch (err) {
    errorHandler.showError(err?.errorCode);
    yield put(removeUser.failure(err));
  }
}

export default function* usersSagas() {
  yield all([
    takeLatest(fetchUsers.REQUEST, fetchUsersSaga),
    takeLatest(fetchUser.REQUEST, fetchUserSaga),
    takeLatest(createUser.REQUEST, createUserSaga),
    takeLatest(updateUser.REQUEST, updateUserSaga),
    takeLatest(removeUser.REQUEST, removeUserSaga)
  ]);
}
