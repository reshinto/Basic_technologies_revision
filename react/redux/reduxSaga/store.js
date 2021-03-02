import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import usersReducer, {
  containerId as usersId
} from "./containers/Users/reducer";
import usersSagas from "./containers/Users/sagas";

const rootReducer = combineReducers({
  [usersId]: usersReducer
});

const sagas = [usersSagas];

const composeEnhancers =
  (process.env.NODE_ENV !== "production" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);

sagas.forEach((saga) => sagaMiddleware.run(saga));

export default store;
