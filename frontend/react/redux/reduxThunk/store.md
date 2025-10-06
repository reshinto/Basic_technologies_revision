# Redux store

## Basic redux

### Installation

`npm i redux` or `yarn add redux`

### Store creation, subscription, utilization

#### Import required tools from `redux`, `actions`, and `reducers`

```javascript
import {createStore, combineReducers} from "redux"; // combineReducers only required if have multiple reducers
import {name1Action} from "./name1Action.js";
import {name2Action} from "./name2Action.js";

import {name1Reducer} from "./name1Reducer.js";
import {name2Reducer} from "./name2Reducer.js";
```

#### Create store

- 1 reducer

```javascript
const store = createStore(name1Reducer);
```

- multiple reducers

```javascript
const store = createStore(
  combineReducers({
    name1Reducer,
    name2Reducer,
  })
);
```

#### Subscribe store

- subscribe monitors changes of state to update the UI

```javascript
store.subscribe(() => {
  // can print state here if needed
  console.log(store.getState());
});
```

#### Utilize store through dispatching actions

```javascript
store.dispatch(name1Action(arg1)); // action must be called be (), add arg value if available
```

## React Redux

### Installation

- basic installation
  `npm i redux react-redux` or `yarn add redux react-redux`
- Install redux-thunk if needed to handle async actions
  `npm i redux react-redux redux-thunk` or `yarn add redux react-redux redux-thunk`
- Install redux devtools extension to enable devtools support without using the basic redux method (optional)
  `npm i redux react-redux redux-thunk redux-devtools-extension` or `yarn add redux react-redux redux-thunk redux-devtools-extension`

### Store creation and utilization

- create a `store.js` file anywhere in the `src` folder

#### Import `createStore from redux`, and `reducers`

```javascript
// combineReducers only required if have multiple reducers
// applyMiddleware only required if using redux-thunk middleware
// compose only required if using the method to enable redux devtools
import {createStore, combineReducers, applyMiddleware, compose} from "redux";
import thunk from "redux-thunk"; // import only if required
import {composeWithDevTools} from "redux-devtools-extension/developmentOnly"; // required if not using compose

import {name1Reducer} from "./name1Reducer.js";
import {name2Reducer} from "./name2Reducer.js";
```

#### Create store

- 1 reducer

```javascript
export default createStore(name1Reducer);
```

- multiple reducers

```javascript
export default createStore(
  combineReducers({
    name1Reducer,
    name2Reducer,
  })
);
```

- apply basic thunk middleware

```javascript
export default createStore(
  combineReducers({
    name1Reducer,
    name2Reducer,
  }),
  applyMiddleware(thunk)
);
```

- enable thunk with redux devtools using default method from redux library

```javascript
export default createStore(
  combineReducers({
    name1Reducer,
    name2Reducer,
  }),
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__
      ? window.__REDUX_DEVTOOLS_EXTENSION__()
      : (f) => f
  )
);
```

- enable thunk with redux devtools using external library

```javascript
// May optionally specify it to hydrate the state from the server in universal apps
// or to restore a previously serialized user session.
// If produced reducer with combineReducers, this must be a plain object with the same shape as the keys passed to it.
// Otherwise, free to pass anything that the reducer can understand.
const initialState = {};

// enable multiple middlewares
const middleware = [thunk];

// A reducing function that returns the next state tree, given the current state tree and an action to handle
const reducers = combineReducers({
  name1Reducer,
  name2Reducer,
});

// may optionally specify it to enhance the store with third-party capabilities
// such as middleware, time travel, persistence, etc.
const enhancer = composeWithDevTools(applyMiddleware(...middleware));

const store = createStore(reducers, initialState, enhancer);

export default store;
```

#### Utilize store at the root of the react app

```javascript
import React from "react";
import {Provider} from "react-redux";
import store from "./store";

function App() {
  return (
    <Provider store={store}>
      <div></div>
    </Provider>
  );
}

export default App;
```
