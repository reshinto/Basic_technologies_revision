# Reducer in redux

## Set initial state

```javascript
const initialState = {
  state1: "",
  event: "",
};
```

## Create reducer

```javascript
export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_EVENT":
      return {
        ...state,
        event: action.payload,
      };
    default:
      return state;
  }
};
```

- using functions to clean reducer code

```javascript
import * as actionTypes from "./types"; // import types to prevent manual declaration

const getEvent = (state, action) => {
  return {
    ...state,
    event: action.payload,
  };
};

export default (state = initialState, action) => {
  switch (action.type) {
    case "GET_EVENT": // method 1: manual declaration of type
      return getEvent(state, action);
    case actionTypes.GET_EVENT: // method 2: import type
      return getEvent(state, action);
    default:
      return state;
  }
};
```
