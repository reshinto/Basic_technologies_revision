# Using redux in components
## Old method (works for class or functional components)
- everything in 1 file
```javascript
import React from 'react';
import { connect } from 'react-redux';
import { name1Action } from './nameAction';

function App({ count }) {
  return (
    <>
      <button onClick={doAction}>DoSomething</button>
      <span>{count}</span>
    </>
  )
};

function mapStateToProps(state) {
  return {
    count: state.nameReducer.count,  // nameReducer required if using combineReducers
  };
}

// method 1, Manually Injecting dispatch
function mapDispatchToProps(dispatch, ownProps) {
  return {
    doAction: () => {
      dispatch(name1Action());
    },
  }
}

// method 2, using object shorthand, Each field of the mapDispatchToProps object is assumed to be an action creator
// component will no longer receive dispatch as a prop
const mapDispatchToProps = {
  doAction: () => name1Action(),
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
```
- using containers
  - component
  ```javascript
  import React from 'react';

  export default function App({ count }) {
    return (
      <>
        <button onClick={doAction}>DoSomething</button>
        <span>{count}</span>
      </>
    );
  };
  ```
  - container
  ```javascript
  import { connect } from 'react-redux';
  import App from './App';
  import { name1Action } from './nameAction';

  function mapStateToProps(state) {
    return {
      count: state.nameReducer.count,  // nameReducer required if using combineReducers
    };
  }

  // method 1, Manually Injecting dispatch
  function mapDispatchToProps(dispatch, ownProps) {
    return {
      doAction: () => {
        dispatch(name1Action());
      },
    }
  }

  // method 2, using object shorthand, Each field of the mapDispatchToProps object is assumed to be an action creator
  // component will no longer receive dispatch as a prop
  const mapDispatchToProps = {
    doAction: () => name1Action(),
  }

  export default connect(mapStateToProps, mapDispatchToProps)(App);
  ```
## New method, using hooks from react-redux library
```javascript
import React from "react";
import {useSelector, useDispatch} from "react-redux";
import { name1Action } from './nameAction';

export default () => {
  const count = useSelector((state) => state.counterReducer.count);  // get props from reducer
  const dispatch = useDispatch();  // enable dispatch for actions
  );
  
  return (
    <>
      <button onClick={() => dispatch(name1Action())}>DoSomething</button>
      <span>{count}</span>
    </>
  )
};
```
