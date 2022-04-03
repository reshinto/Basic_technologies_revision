import usersPageReducer, {
  containerId,
  createUser,
  fetchUsers,
  fetchUser,
  initialState,
  removeUser,
  selector,
  updateUser,
  updateUsersPagination,
} from './reducer';

describe('UsersPage reducer', () => {
  it('Should return initial state by default', () => {
    expect(usersPageReducer(undefined, {})).toEqual(initialState);
  });

  it('Should set values for isFetchUsersLoading and error on fetchUsers.REQUEST', () => {
    const resultState = usersPageReducer(
      { isFetchUsersLoading: false, fetchUsersError: 'Error' },
      fetchUsers.request()
    );

    expect(resultState).toEqual({ isFetchUsersLoading: true, fetchUsersError: undefined });
  });

  it('Should set values for usersData and isFetchUsersLoading on fetchUsers.SUCCESS', () => {
    const payload = {};
    const resultState = usersPageReducer(
      { usersData: [], isFetchUsersLoading: true },
      fetchUsers.success(payload)
    );

    expect(resultState).toEqual({ usersData: payload, isFetchUsersLoading: false });
  });

  it('Should set values for isFetchUsersLoading and fetchUsersError on fetchUsers.FAILURE', () => {
    const payload = 'Error';
    const resultState = usersPageReducer(
      { isFetchUsersLoading: true, fetchUsersError: undefined },
      fetchUsers.failure(payload)
    );

    expect(resultState).toEqual({ isFetchUsersLoading: false, fetchUsersError: payload });
  });

  it('Should set values for isFetchUserLoading and fetchUserError on fetchUser.REQUEST', () => {
    const resultState = usersPageReducer(
      { isFetchUserLoading: false, fetchUserError: 'Error' },
      fetchUser.request()
    );

    expect(resultState).toEqual({ isFetchUserLoading: true, fetchUserError: undefined });
  });

  it('Should set values for userData and isFetchUserLoading on fetchUser.SUCCESS', () => {
    const payload = {};
    const resultState = usersPageReducer(
      { userData: {}, isFetchUserLoading: true },
      fetchUser.success(payload)
    );

    expect(resultState).toEqual({ userData: payload, isFetchUserLoading: false });
  });

  it('Should set values for isFetchUserLoading and fetchUserError on fetchUser.FAILURE', () => {
    const payload = 'Error';
    const resultState = usersPageReducer(
      { isFetchUserLoading: true, fetchUserError: undefined },
      fetchUser.failure(payload)
    );

    expect(resultState).toEqual({ isLoading: false, error: payload });
  });

  it('Should set values for isCreateUserLoading and createUserError on createUser.REQUEST', () => {
    const resultState = usersPageReducer(
      { isCreateUserLoading: false, createUserError: 'Error' },
      createUser.request()
    );

    expect(resultState).toEqual({ isCreateUserLoading: true, createUserError: undefined });
  });

  it('Should set value for isCreateUserLoading on createUser.SUCCESS', () => {
    const resultState = usersPageReducer(
      { isCreateUserLoading: true },
      createUser.success()
    );

    expect(resultState).toEqual({ isCreateUserLoading: false });
  });

  it('Should set values for isCreateUserLoading and createUserError on createUser.FAILURE', () => {
    const payload = 'Error';
    const resultState = usersPageReducer(
      { isCreateUserLoading: true, createUserError: undefined },
      createUser.failure(payload)
    );

    expect(resultState).toEqual({ isCreateUserLoading: false, createUserError: payload });
  });

  it('Should set values for isUpdateUserLoading and updateUserError on updateUser.REQUEST', () => {
    const resultState = usersPageReducer(
      { isUpdateUserLoading: false, updateUserError: 'Error' },
      updateUser.request()
    );

    expect(resultState).toEqual({ isUpdateUserLoading: true, updateUserError: undefined });
  });

  it('Should set value for isUpdateUserLoading on updateUser.SUCCESS', () => {
    const resultState = usersPageReducer(
      { isUpdateUserLoading: true },
      updateUser.success()
    );

    expect(resultState).toEqual({ isUpdateUserLoading: false });
  });

  it('Should set values for isUpdateUserLoading and updateUserError on updateUser.FAILURE', () => {
    const payload = 'Error';
    const resultState = usersPageReducer(
      { isUpdateUserLoading: true, updateUserError: undefined },
      updateUser.failure(payload)
    );

    expect(resultState).toEqual({ isUpdateUserLoading: false, updateUserError: payload });
  });

  it('Should set values for isRemoveUserLoading and removeUserError on removeUser.REQUEST', () => {
    const resultState = usersPageReducer(
      { isRemoveUserLoading: false, removeUserError: 'Error' },
      removeUser.request()
    );

    expect(resultState).toEqual({ isRemoveUserLoading: true, removeUserError: undefined });
  });

  it('Should set value for isRemoveUserLoading on removeUser.SUCCESS', () => {
    const resultState = usersPageReducer(
      { isRemoveUserLoading: true },
      removeUser.success()
    );

    expect(resultState).toEqual({ isRemoveUserLoading: false });
  });

  it('Should set values for isRemoveUserLoading and removeUserError on removeUser.FAILURE', () => {
    const payload = 'Error';
    const resultState = usersPageReducer(
      { isRemoveUserLoading: true, removeUserError: undefined },
      removeUser.failure(payload)
    );

    expect(resultState).toEqual({ isRemoveUserLoading: false, removeUserError: payload });
  });

  it('Should set values for state on updateUsersPagination.ACTION', () => {
    const sortBy = [{}];
    const resultState = usersPageReducer(
      { sortBy: [] },
      updateUsersPagination.action({ sortBy })
    );

    expect(resultState).toEqual({ sortBy });
  });

  it('Selector should return correct result', () => {
    const text = 'test';
    const selectedData = selector({ [containerId]: text });

    expect(selectedData).toEqual(text);
  });
});
