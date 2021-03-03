import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

import routes from "../../../routes";

//import { containerId as protectedAppId, fetchUserInfo } from "./reducer";

const isUserInfoLoading = false;

export const isAccessToPortalGranted = (permissions) =>
  permissions?.some((permission) => permission === "ACCESS_CODE");

const permissions = ["ACCESS_CODE"]; // for example only

const ProtectedApp = () => {
  const scrollRef = useRef();

  const { pathname } = useLocation();

  /*const dispatch = useDispatch();

  const { userInfo = {}, isUserInfoLoading } = useSelector((state) => state[protectedAppId]);
  const { permissions } = userInfo;*/

  useEffect(() => {
    if (scrollRef && scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [scrollRef, pathname]);

  /*useEffect(() => {
    dispatch(fetchUserInfo.request());
    dispatch(fetchTranslations.request());
  }, [dispatch]);*/

  const renderApp = () => {
    if (!isAccessToPortalGranted(permissions)) {
      return <>Unauthorized Page</>;
    }

    return <div>{routes}</div>;
  };

  if (isUserInfoLoading) {
    return <>Loading</>;
  }

  return <>{renderApp()}</>;
};

export default ProtectedApp;
