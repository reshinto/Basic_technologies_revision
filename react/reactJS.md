# React js
## setState
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    count: 0
  }
  
  handleClick = () => {
    // method 1
    const {count} = this.state;
    this.setState({count: count + 1});
    
    // method 2
    this.setState(prevState => ({count: prevState.count + 1}));
  }
  
  render() {
    const {count} = this.state;
    return (<div onClick={this.handleClick}>{count}</div>);
  }
}
```
```javascript
import React, {useState} from "react";
  
export default function App() {
  const [count, setCount] = useState(0);  // 0 = initial state
  handleClick = () => {
    setCount(count + 1);
  }
  return (<div onClick={handleClick}>{count}</div>);
}
```
#### handle multiple states
- example 1
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    name1: "",
    name2: ""
  }
  
  handleChange = e => {
    this.setState({ [e.target.name ]: e.target.value });  // requires the name attribute to be declared at the html tag
  }
  
  render() {
    const {name1} = this.state;
    return (<input onChange={this.handleChange} name={name1} value={name1} />);
  }
}
```
```javascript
import React, {useState} from "react";
  
export default function App() {
  const [state, setState] = useState({
    name1: "",
    name2: "",
  });
  
  handleChange = e => {
    setState({
      ...state,
      [e.target.name]: e.target.value
    });
  }
  
  return (<input onChange={handleChange} value={state.name1} name={state.name1} />);
}
```
- example 2
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    name1: "",
    name2: ""
  }
  
  handleChange = prop => e => this.setState({ [prop]: e.target.value });
  
  render() {
    const {name1} = this.state;
    return (<input onChange={this.handleChange("name1")} value={name1} />);
  }
}
```
```javascript
import React, {useState} from "react";
  
export default function App() {
  const [state, setState] = useState({
    name1: "",
    name2: "",
  });
  
  handleChange = prop => e => {
    setState({
      ...state,
      [prop]: e.target.value
    });
  }
  
  return (<input onChange={handleChange("name1")} value={state.name1} />);
}
```
## Lifecycle vs Hooks
### ComponentDidMount
```javascript
import React from "react";

export default class App extends React.Component {
  ComponentDidMount() {
    doSomething()
  }
  
  render() {
    return (<div></div>);
  }
}
```
```javascript
import React, {useEffect} from "react";

export default function App() {
  useEffect(() => {
    doSomething();
  }, []);
  
  return (<div></div>);
}
```
### ComponentDidUpdate
```javascript
import React from "react";

export default class App extends React.Component {
  ComponentDidUpdate(prevProps, prevStates) {
    if (prevProps.something !== this.props.something) {
      doSomething();
    }
  }
  
  render() {
    const {something} = this.props
    return (<div>{something}</div>);
  }
}
```
```javascript
import React, {useEffect} from "react";

export default function App(props) {
  const {something} = props;
  
  useEffect(() => {
    doSomething();
  }, [something]);
  
  return (<div>{something}</div>);
}
```
### ComponentWillUnmount
```javascript
import React from "react";

export default class App extends React.Component {
  ComponentWillUnmount() {
    doSomething();
  }
  
  render() {
    return (<div></div>);
  }
}
```
```javascript
import React, {useEffect} from "react";

export default function App(props) {
  useEffect(() => {
    return doSomething();  // must return the action for component when unmounted
  }, []);  // this does not matter
  
  return (<div></div>);
}
```
### ShouldComponentUpdate
#### Should be used if a function renders the same result given the same props and states (mainly for performance optimization)
- method 1: declaring in the shouldComponentUpdate method
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    name: "",
  }
  
  shouldComponentUpdate(nextProps, nextStates) {
    if (nextProps.something !== this.props.something) {
      return true;  // allow rerendering
    }
    if (nextStates.name !== this.state.name) {
      return true;
    }
    return false;  // do not allow rerendering
  }
  
  handleChange = e => {
    this.setState({name: e.target.value});
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.name);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.name} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
- method 2: use PureComponent (preferred method)
```javascript
import React from "react";

export default class App extends React.PureComponent {
  state = {
    name: "",
  }
  
  handleChange = e => {
    this.setState({name: e.target.value});
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.name);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.name} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
- method 3: use memo for functional components
```javascript
import React, {useState, memo} from "react";

function App() => {
  const [name, setName] = useState("");
  
  const handleChange = e => {
    setName(e.target.value);
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={name} />
      <input type="submit" value="Submit" />
    </form>
  );
}

// return value is the inverse of shouldComponentUpdate
function areEqual(prevProps, nextProps) {
  if (nextProps.name !== prevProps.name) {
    return false;  // allow rerendering
  }
  return true;  // do not allow rerendering
}

export default memo(App, areEqual);
```
### Custom Hooks
```javascript
import {useState, useEffect} from "react";

export default function UseCount() {
  const [count, setCount] = useState(0);
  
  useEffect(() => {
    doSomething();
    
    return doAnotherThing()
  }, [count]);
  
  const handleClick = () => {
    setCount(count + 1);
  }
  
  return {
    count,
    handleClick,
  };
}
```
```javascript
import React from "react";
import UseCount from "./UseCount";

export default function App() {
  const {count, handleClick} = useCount();
  
  return (<div onClick={handleClick}>{count}</div>);
};
```
## Forms
### Uncontrolled form
```javascript
import React from "react";

export default class App extends React.Component {
  constructor() {
    super();
    this.name = React.createRef();
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.name.current.value);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input ref={this.name} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
```javascript
import React, {useRef} from "react";

export default function App() => {
  const name = useRef();
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(name.current.value);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input ref={name} />
      <input type="submit" value="Submit" />
    </form>
  );
}
```
### Controlled form
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    name: "",
  }
  
  handleChange = e => {
    this.setState({name: e.target.value});
  }
  
  handleSubmit = e => {
    e.preventDefault();
    console.log(this.state.name);
  }
  
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <input onChange={this.handleChange} value={this.state.name} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}
```
```javascript
import React, {useState} from "react";

export default function App() => {
  const [name, setName] = useState("");
  
  const handleChange = e => {
    setName(e.target.value);
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(name);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input onChange={handleChange} value={name} />
      <input type="submit" value="Submit" />
    </form>
  );
}
```
## Containers
### Private route
```javascript
// creating a private route
import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const PrivateRoute = ({ component: Component, auth, ...rest }) => (
  <Route
    {...rest}
    render={props => {
      if (auth.loading) return <div>loading...</div>
      else if (!auth.isAuthenticated) return <Redirect to="/dashboard" />;
      else return <Component {...props} />;
    }}
  />
);

const mapStateToProps = state => ({
  auth: state.authReducer
});

export default connect(mapStateToProps)(PrivateRoute);
```
```javascript
// using

import React from "react";
import { Route } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";
import ComponentName from "../pages/ComponentName";

const BaseRouter = () => (
  <div>
    <PrivateRoute exact path="/profile" component={ComponentName} />
  </div>
);

export default BaseRouter;
```
