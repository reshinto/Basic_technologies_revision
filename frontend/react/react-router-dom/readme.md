# React Router Dom

## Use Params

- setting params in path with router

```javascript
import React from "react";
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Component from "./Component";

export default () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/:paramName" component={Component} />
      </Switch>
    </Router>
  );
};
```

- retrieve params with old method

```javascript
import React from "react";

export default (props) => {
  const {paramName} = props.match.params;
  return <></>;
};
```

- retrieve params with `useParams()`

```javascript
import React from "react";
import {useParams} from "react-router-dom";

export default () => {
  const {paramName} = useParams();
  return <></>;
};
```

## Use history

- go back 1 page

```javascript
import React from "react";
import {useHistory} from "react-router-dom";

export default () => {
  const history = useHistory();

  const handleGoBack = () => {
    history.goBack();
  };

  return <div onClick={handleGoBack}>go back</div>;
};
```

- redirect to a page

```javascript
import React from "react";
import {useHistory} from "react-router-dom";

export default () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/path");
  };

  return <div onClick={handleRedirect}>redirect</div>;
};
```

- add state when redirecting

```javascript
import React from "react";
import {useHistory} from "react-router-dom";

export default () => {
  const history = useHistory();

  const handleRedirect = () => {
    history.push("/path", state);
  };

  return <div onClick={handleRedirect}>redirect</div>;
};
```

- retrieve state after redirect

```javascript
import React from "react";

export default (props) => {
  const stateArr = props.history.location.state; // returns state in an array

  return <></>;
};
```

## Private route

- old method

```javascript
// creating a private route
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, redirectPath, loading, isAuthenticated, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (loading) return <div>loading...</div>
      else if (!isAuthenticated) return <Redirect to=`${redirectPath}` />;
      else return <Component {...props} />;
    }}
  />
);

const mapStateToProps = state => ({
  loading: state.reducer.loading,
  isAuthenticated: state.reducer.isAuthenticated,
});

export default connect(mapStateToProps)(PrivateRoute);
```

- using hooks method

```javascript
// creating a private route
import React from "react";
import {useSelector} from "react-redux";
import {Route, useHistory} from "react-router-dom";

export default ({component: Component, redirectPath, ...rest}) => {
  const {loading, isAuthenticated} = useSelector((state) => state.reducer);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        if (loading) return <div>loading...</div>;
        else if (!isAuthenticated) return history.push(`${redirectPath}`);
        else return <Component {...props} />;
      }}
    />
  );
};
```

```javascript
// using private route
import React from "react";
import {Route} from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import Component from "./Component";

export default () => (
  <div>
    <PrivateRoute
      exact
      path="/path"
      component={Component}
      redirectPath="/redirectpath"
    />
  </div>
);
```
