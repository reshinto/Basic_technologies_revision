import React from "react";
import { Route, Switch } from "react-router-dom";

import { PUBLIC_ROUTES } from "../../../shared/constants/routes";

const isAppleDevice = () => navigator.userAgent.match(/(iPad|iPhone|iPod)/i);

const isAndroidDevice = () => navigator.userAgent.match(/Android/i);

const APPLE_STORE = window.APP_APPLE_STORE_LINK || "https://www.somelink.com";
const GOOGLE_PLAY = window.APP_GOOGLE_PLAY_LINK || "https://www.somelink.com";

const PublicApp = () => {
  return (
    <Switch>
      <Route
        exact
        path={PUBLIC_ROUTES.confirm}
        render={() => {
          if (isAppleDevice()) {
            window.location.href = APPLE_STORE;
          } else if (isAndroidDevice()) {
            window.location.href = GOOGLE_PLAY;
          }
        }}
      />
      <Route exact path={PUBLIC_ROUTES.health} render={() => <>health</>} />
      <Route
        exact
        path="/create-password"
        render={() => <>Create password</>}
      />
      <Route exact path="/guest" component={() => <>Guess</>} />
    </Switch>
  );
};

export default PublicApp;
