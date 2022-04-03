import produce from "immer";

import { Action, AsyncAction } from "../../shared/services/actionHelpers";
import { replaceObjectValues } from "../../shared/services/utils";

export const containerId = "UsersPage";
export const fetchUsers = new AsyncAction(`${containerId}/USERS_FETCH`);
export const fetchUser = new AsyncAction(`${containerId}/USER_FETCH`);
export const createUser = new AsyncAction(`${containerId}/USER_CREATE`);
export const updateUser = new AsyncAction(`${containerId}/USER_UPDATE`);
export const removeUser = new AsyncAction(`${containerId}/USER_REMOVE`);
export const updateUsersPagination = new Action(
  `${containerId}/USERS_PAGINATION_UPDATE`
);

export const selector = (state) => state[containerId];

export const DEFAULT_SORT_BY = [{ id: "username", desc: true }];

export const initialState = {
  usersData: [],
  userData: {},
  sortBy: DEFAULT_SORT_BY,
  itemCount: 0,

  isFetchUsersLoading: false,
  isFetchUserLoading: false,
  isCreateUserLoading: false,
  isUpdateUserLoading: false,
  isRemoveUserLoading: false,

  fetchUsersError: undefined,
  fetchUserError: undefined,
  createUserError: undefined,
  updateUserError: undefined,
  removeUserError: undefined
};

export default produce((draft, { type, payload }) => {
  switch (type) {
    case fetchUsers.REQUEST:
      draft.isFetchUsersLoading = true;
      draft.fetchUsersError = undefined;
      break;
    case fetchUsers.SUCCESS:
      draft.usersData = payload.data;
      draft.itemCount = payload.total;
      draft.isFetchUsersLoading = false;
      break;
    case fetchUsers.FAILURE:
      draft.isFetchUsersLoading = false;
      draft.fetchUsersError = payload;
      break;

    case fetchUser.REQUEST:
      draft.isFetchUserLoading = true;
      draft.fetchUserError = undefined;
      break;
    case fetchUser.SUCCESS:
      draft.userData = payload;
      draft.isFetchUserLoading = false;
      break;
    case fetchUser.FAILURE:
      draft.isFetchUserLoading = false;
      draft.fetchUserError = payload;
      break;

    case createUser.REQUEST:
      draft.isCreateUserLoading = true;
      draft.createUserError = undefined;
      break;
    case createUser.SUCCESS:
      draft.isCreateUserLoading = false;
      break;
    case createUser.FAILURE:
      draft.isCreateUserLoading = false;
      draft.createUserError = payload;
      break;

    case updateUser.REQUEST:
      draft.isUpdateUserLoading = true;
      draft.updateUserError = undefined;
      break;
    case updateUser.SUCCESS:
      draft.userData = payload;
      draft.isUpdateUserLoading = false;
      break;
    case updateUser.FAILURE:
      draft.isUpdateUserLoading = false;
      draft.updateUserError = payload;
      break;

    case removeUser.REQUEST:
      draft.isRemoveUserLoading = true;
      draft.removeUserError = undefined;
      break;
    case removeUser.SUCCESS:
      draft.isRemoveUserLoading = false;
      break;
    case removeUser.FAILURE:
      draft.isRemoveUserLoading = false;
      draft.removeUserError = payload;
      break;

    case updateUsersPagination.ACTION:
      replaceObjectValues({ obj: payload, targetObj: draft });
      break;

    default:
  }
}, initialState);
