import React from "react";

import routes from "../../../routes";

//import { containerId as protectedAppId, fetchUserInfo } from "./reducer";

const isUserInfoLoading = false;

export const isAccessToPortalGranted = (permissions) =>
  permissions?.some((permission) => permission === "ACCESS_CODE");

const permissions = ["ACCESS_CODE"]; // for example only

const ProtectedApp = () => {
  /*const dispatch = useDispatch();

  const { userInfo = {}, isUserInfoLoading } = useSelector((state) => state[protectedAppId]);
  const { permissions } = userInfo;*/

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
