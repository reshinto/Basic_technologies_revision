import React from "react";
import { Redirect, Switch } from "react-router-dom";
import { createBrowserHistory } from "history";

import UsersPage from "./containers/Users";
import ProtectedRoute from "./shared/components/ProtectedRoute";
import { APP_ROUTES, ROOT_ROUTES } from "./shared/constants/routes";

export const history = createBrowserHistory({
  basename: "/web"
});

const routes = (
  <Switch>
    <Redirect exact from={ROOT_ROUTES.root} to={APP_ROUTES.usersPage} />
    <ProtectedRoute path={APP_ROUTES.usersPage} component={UsersPage} />
  </Switch>
);

export default routes;
