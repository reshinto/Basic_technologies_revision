import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  fetchUsers,
  fetchUser,
  selector,
} from "./reducer";

const userId = 1; // for illustration purpose

export const UsersPage = () => {
  const dispatch = useDispatch();

  const {
    usersData,
    isFetchUsersLoading,
  } = useSelector(selector);

  useEffect(() => {
    dispatch(fetchUsers.request());
    dispatch(fetchUser.request(userId));  // for illustration purpose, don't do it here
  }, [userId, dispatch]);

  return (
    <>
      {isFetchUsersLoading
        ? "Loading"
        : usersData.map((user) => <p>user.username</p>)}
    </>
  );
};

export default memo(UsersPage);
