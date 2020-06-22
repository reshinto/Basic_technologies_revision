# Action in redux
## action without redux-thunk
### no arguments (synchronous)
```javascript
import * as actionTypes from "./types";  // import to prevent manual type declaration

export const resetAction = () => {
  return {
    type: actionTypes.RESET,
  };
};
```
### have argument to set value (synchronous)
```javascript
import * as actionTypes from "./types";

export const setAction = (value) => {
  return {
    type: actionTypes.SET,
    payload: value,
  };
};
```
## action with redux-thunk
### no arguments (asynchronous)
- fetch
```javascript
import * as actionTypes from "./types";

export const getAction = () => async (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  try {
    const res = await fetch(URL);
    const data = await res.json();
    dispatch({
      type: actionTypes.GET,
      payload: data,
    });
  } catch (error) {
    doSomething();
  }
};
```
- axios
```javascript
import axios from "axios";
import * as actionTypes from "../types";

export const getAction = () => (dispatch, state) => {
  const URL = "http://www.someurl.com";
  axios
    .get(URL)
    .then(res => {
      dispatch({
        type: actionTypes.GET,
        payload: res.data,
      });
    })
    .catch(err => {
      doSomething();
    }
};
```
### have argument to set value (asynchronous)
- fetch post
```javascript
import * as actionTypes from "./types";

export const postAction = (value, token) => async (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  
  const postData = {
    value,
  };
  
  const config = {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": token,  // only required if needs token for authentication
    },
    body: JSON.stringify(postData),
  };
  
  try {
    const res = await fetch(URL, config);
    const data = await res.JSON();
    dispatch({
      type: actionTypes.POST_SOMETHING,
      payload: data,
    });
  } catch (error) {
    doSomething();
  }
};
```
- axios post
```javascript
export const postAction = (value, token) => (dispatch, state) => {
  const URL = "http://www.someurl.com";
  
  const postData = {
    value,
  };
  
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,  // only required if needs token for authentication
    },
  };
  
  axios
    .post(URL, postData, config))
    .then(res => {
      dispatch({
        type: actionTypes.POST_SOMETHING,
        payload: res.data,
      });
    })
    .catch(err => {
      doSomething();
    });
};
```
- fetch put
```javascript
export const editData = (user, somethingToEdit) => async (dispatch) => {
  const URL = "http://www.someurl.com";
  const queryURL = `user/${user}`;
  const data = {
    somethingToEdit,
  };
  const config = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  try {
    await fetch(`${URL}${queryURL}`, config);
    dispatch({
      type: types.EDIT_DATA,
    });
  } catch (error) {
    dispatch(fail(error.message));
  }
};
```
- fetch delete
```javascript
export const deleteData = (data_id) => async (dispatch) => {
  const URL = "http://www.someurl.com";
  const queryURL = `todo/${todo_id}`;
  const config = {
    method: "DELETE",
  };
  try {
    await fetch(`${URL}${queryURL}`, config);
    dispatch({
      type: types.DELETE_DATA,
    });
  } catch (error) {
    dispatch(fail(error.message));
  }
};
```
