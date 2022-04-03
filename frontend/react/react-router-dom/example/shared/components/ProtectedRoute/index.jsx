import React from "react";
import { Route } from "react-router-dom";
import PropTypes from "prop-types";

const authenticated = true;

const ProtectedRoute = ({ component: Component, ...rest }) => {
  // implement check authenticated logic here
  // const { authenticatedStatus } = useAuthentication();
  // const { authenticated } = authenticatedStatus;

  return (
    <Route
      {...rest}
      render={(props) => {
        if (authenticated) {
          return <Component {...props} />;
        }
        return <LoginPage />;
      }}
    />
  );
};

const LoginPage = () => <>Login page</>;

ProtectedRoute.propTypes = {
  component: PropTypes.elementType
};

export default ProtectedRoute;
