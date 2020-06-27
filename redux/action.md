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
    doSomething(error);
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
    .catch(error => {
      doSomething(error);
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
      type: actionTypes.POST_DATA,
      payload: data,
    });
  } catch (error) {
    doSomething(error);
  }
};
```
- axios post
```javascript
import axios from "axios";
import * as actionTypes from "../types";

export const postAction = (value, token) => (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  const postData = {
    value,
  };
  const config = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": token,  // only required if need token for authentication
    },
  };
  axios
    .post(URL, postData, config))
    .then(res => {
      dispatch({
        type: actionTypes.POST_DATA,
        payload: res.data,
      });
    })
    .catch(error => {
      doSomething(error);
    });
};
```
- fetch put
```javascript
import * as actionTypes from "../types";

export const editData = (id, somethingToEdit) => async (dispatch) => {
  const URL = "http://www.someurl.com";
  const queryURL = `/${id}`;
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
      type: actionTypes.EDIT_DATA,
    });
  } catch (error) {
    doSomething(error);
  };
};
```
- axios put
```javascript
import axios from "axios";
import * as actionTypes from "../types";

export const editData = (id, somethingToEdit) => (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  const config = {
    method: "PUT",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  };
  const token = getState().reducer.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  axios
    .put(`${URL}/${id}`, {id, somethingToEdit}, config)
    .then(res => {
      dispatch({
        type: actionTypes.EDIT_DATA,
        payload: res.data
      });
    })
    .catch(error => {
      doSomething(error);
    });
};
```
- fetch delete
```javascript
import * as actionTypes from "../types";

export const deleteData = (data_id) => async (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  const queryURL = `/${data_id}`;
  const config = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json"
    }
  };
  const token = getState().reducer.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  try {
    await fetch(`${URL}${queryURL}`, config);
    dispatch({
      type: actionTypes.DELETE_DATA,
    });
  } catch (error) {
    doSomething(error);
  }
};
```
- axios delete
```javascript
import axios from "axios";
import * as actionTypes from "../types";

export const deleteData = (data_id) => (dispatch, getState) => {
  const URL = "http://www.someurl.com";
  const config = {
    headers: {
      "Content-Type": "application/json"
    }
  };
  const token = getState().reducer.token;
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  axios
    .delete(`${URL}/${data_id}`, config))
    .then(res => {
      dispatch({
        type: actionTypes.DELETE_DATA,
        payload: data_id
      });
    })
    .catch(error => {
      doSomething(error);
    });
};
```
## refactored actions
### reusable api call
- fetch
```javascript
// data is an object
const fetchCall = (url, method, data, actionType) => async (dispatch, getState) => {
  const getToken = getState().reducer.token;  // modify this to get stored token
  const config = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "Authorization": getToken ? `Bearer ${getToken}` : "",
    },
    body: JSON.stringify(data),
  };
  try {
    const res = await fetch(`${url}`, config);
    const _data = await res.json();
    dispatch({
      type: actionType,
      payload: _data,
    });
  } catch (error) {
    doSomething(error);
  };
};
```
- axios
```javascript
import axios from "axios";

// data is an object
const axiosCall = (url, method, data, actionType) => (dispatch, getState) => {
  const getToken = getState().reducer.token;  // modify this to get stored token
  axios({ 
    method, 
    url, 
    data,
    headers: { 
      "Content-Type": "application/json",
      "Authorization": getToken ? `Bearer ${getToken}` : "",
    }
  })
    .then(res => {
      if (res.status !== 200 && res.status !== 201 && res.status !== 204) {
        throw new Error(`Something went wrong with ${methodName}`);
      }
      dispatch({
        type: actionType,
        payload: res.data,
      });
    })
    .catch(error => {
      doSomething(error);
    });
};
```
- using refactored api calls
```javascript
import * as actionTypes from "./actionTypes";

const URL = "http://www.someurl.com";

export getData = () => {
  // method 1
  fetchCall(`${URL}`, "GET", null, actionTypes.GET_DATA);
  // method 2
  axiosCall(`${URL}`, "GET", null, actionTypes.GET_DATA);
};

export postData = (data) => {
  // method 1
  fetchCall(`${URL}`, "POST", {data}, actionTypes.GET_DATA);
  // method 2
  axiosCall(`${URL}`, "POST", {data}, actionTypes.GET_DATA);
};
```
