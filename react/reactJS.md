# React js
## setState
```javascript
import React from "react";

export default class App extends React.Component {
  state = {
    count: 0
  }
  
  handleClick = () => {
    const {count} = this.state;
    this.setState({count: count + 1});
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
