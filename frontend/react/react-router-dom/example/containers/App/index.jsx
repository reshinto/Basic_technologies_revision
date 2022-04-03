import React from "react";
import { Route, Router, Switch } from "react-router-dom";

import { history } from "../../routes";
import ProtectedRoute from "../../shared/components/ProtectedRoute";
import { PUBLIC_ROUTES } from "../../shared/constants/routes";

import ProtectedApp from "./ProtectedApp";
import PublicApp from "./PublicApp";

const isLoading = false;

export const App = () => {
  if (isLoading) {
    return <>loading</>;
  }

  return (
    <Router history={history}>
      <Switch>
        <Route path={Object.values(PUBLIC_ROUTES)} component={PublicApp} />
        <ProtectedRoute component={ProtectedApp} />
      </Switch>
    </Router>
  );
};

export default App;
