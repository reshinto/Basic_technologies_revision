# React js
## using docker
- run using docker
> docker run -it --name appName -p 3000:3000 -d imageName
- open bash in docker
> docker exec -it appName bash
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
  const handleClick = () => {
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
  
  const handleChange = e => {
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
  
  const handleChange = prop => e => {
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
#### useEffect
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
#### useEffect
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
#### useEffect
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
- Should be used if a function renders the same result given the same props and states (mainly for performance optimization)
#### method 1: declaring in the shouldComponentUpdate method
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
#### method 2: use PureComponent (preferred method)
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
#### method 3: use memo for functional components
```javascript
import React, {useState, memo} from "react";

function App() {
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
### useMemo
- Memoization: cache result of function call
- Warning: do not prematurely optimize performance, use only as needed for expensive calculations
- gives you referential equality between renders for values
- will only recompute the memoized value when 1 of the dependencies has changed
- help to avoid expensive calculations on every render
- if no dependency array is provided, a new value will be computed on every render
- calls its function and returns the result value
```javascript
import React, {useState, useMemo } from "react";

const App = () => {
  const [count, setCount] = useState(0);
  
  const expensiveCount = useMemo(() => {
    return count ** 2;
  }, [count]);

  return (
    <>
      {count}
    </>
  );
};

export default App;
```
### useCallback for functional methods
- Memoization: cache result of function call
- Warning: do not prematurely optimize performance, use only as needed for expensive calculations
- gives you referential equality between renders for functions
- returns its memoized function when the dependencies change
- helps prevent uneccessary renders of the children because the children will always be using the same function object
  - e.g. shouldComponentUpdate
```javascript
import React, {useState, useCallback } from "react";
import DisplayCount from "./DisplayCount";

const App = () => {
  const [count, setCount] = useState(0);
  
  const showCount = useCallback(() => alert(`Count ${count}`)), [count]);

  return (
    <>
      <DisplayCount handleDisplay={showCount} />
    </>
  );
};

export default App;
```
### useContext
- allows us to work with react context api, which allows us to share data without passing props
- A component calling useContext will always re-render when the context value changes
  - optimize with memoization if component computation is expensive
#### set state
```javascript
import { createContext } from "react";

export default MoodContext = createContext(null);
```
#### share state
```javascript
import React, { useState } from "react";
import MoodContext from "./MoodContext";
import MoodEmoji from "./MoodEmoji";
  
export default function App() {
  const [moodState] = useState({
    happy: "happy",
    sad: "sad",
  });
  

  return (
    <MoodContext.Provider value={moodState}>
      <MoodEmoji />
    </MoodContext.Provider>
  );
}
```
#### use state
- using ```XxxContext.Consumer```
```javascript
import React from "react";
import MoodContext from "./MoodContext";
  
export default function MoodEmoji() {
  return (
    <MoodContext.Consumer>
      {mood => <p>{mood.happy}</p>}
    </MoodContext.Consumer>
  );
};
```
- using ```useContext```
```javascript
import React, { useContext } from "react";
import MoodContext from "./MoodContext";
  
export default function MoodEmoji() {
  const mood = useContext(MoodContext);
  
  return (
    <p>
      { mood.happy }
    </p>
  );
};
```
#### use generic context
- GenericContext file
```typescript
import React, { Dispatch, createContext, SetStateAction, useState, PropsWithChildren } from "react;

export default function createCtx<A>(defaultValue: A) {
  type UpdateType = Dispatch<
    SetStateAction<typeof defaultValue>
  >;
  
  const defaultUpdate: UpdateType = () => defaultValue;
  
  const ctx = createContext({
    state: defaultValue,
    update: defaultUpdate,
  });
  
  function Provider(props: PropsWithChildren<{}>) {
    const [state, update] = useState(defaultValue);
    return <ctx.Provider value={{ state, update }} {...props} />;
  }
  
  return [ctx, Provider] as const;
}
```
- set state with SampleContext file
```typescript
import createCtx from "./GenericContext";

export const [SampleContext, SampleProvider] = createCtx("default value");
```
- share state
```typescript
import React from "react";
import { SampleProvider } from "./SampleContext";
import SampleFeature from "./SampleFeature";
  
export default function App() {
  return (
    <SampleProvider>
      <SampleFeature />
    </SampleProvider>
  );
}
```
- use state with useContext
```typescript
import React, { useContext } from "react";
import SampleContext from "./SampleContext";
  
export default function SomeFeature() {
  const { state: myStateName, update: handleUpdate } = useContext(SampleContext);
  
  return (
    <p onClick={() => handleUpdate("test")}>
      { myStateName }
    </p>
  );
};
```
### useReducer
- an alternative to useState
  - returns an array of 2 values
    - first value is the state, second value is dispatch function
- it uses the redux pattern and has a different way to manage state
  - instead of updating the state directly, action is dispatched that goes to the reducer
  - the reducer determines how to compute the next state
- useReducer is usually preferable to useState when you have complex state logic that involves multiple sub-values
  - or when the next state depends on the previous one
- useReducer also lets you optimize performance for components that trigger deep updates
  - because you can pass dispatch down instead of callbacks
- React guarantees that dispatch function identity is stable and won’t change on re-renders
  - This is why it’s safe to omit from the useEffect or useCallback dependency list
#### Single state
```javascript
import React, { useReducer } from "react";

const initialState = 0;

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      throw new Error();
  };
};
  
export default function App() {
  const [count, dispatch] = useReducer(reducer, initialState);
  
  const handleDecrement = () => dispatch({ type: "decrement" });
  
  return (
    <>
      Count: { count }
      <button onClick={handleDecrement}>-</button>
    </>
  );
};
```
#### Multiple states
```javascript
import React, { useReducer } from "react";

const initialState = { count: 0 };

function reducer(state, action) {
  switch (action.type) {
    case "increment":
      return state + 1;
    case "decrement":
      return state - 1;
    default:
      throw new Error();
  };
};
  
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  
  const handleDecrement = () => dispatch({ type: "decrement" });
  
  return (
    <>
      Count: { state.count }
      <button onClick={handleDecrement}>-</button>
    </>
  );
};
```
#### Lazy initialization
```javascript
import React, { useReducer } from "react";

function init(initialCount) {
  return {count: initialCount};
}

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return {count: state.count + 1};
    case 'decrement':
      return {count: state.count - 1};
    case 'reset':
      return init(action.payload);
    default:
      throw new Error();
  }
}
  
export default function App() {
  const [state, dispatch] = useReducer(reducer, initialCount, init);
  
  return (
    <>
      Count: { state.count }
      <button
        onClick={() => dispatch({type: 'reset', payload: initialCount})}>
        Reset
      </button>
      <button onClick={() => dispatch({type: 'decrement'})}>-</button>
      <button onClick={() => dispatch({type: 'increment'})}>+</button>
    </>
  );
};
```
### useImperativeHandle
- customizes the instance value that is exposed to the parent components when using ref
  - imperative code using refs should be avoided in most cases
- ```useImperativeHandle``` should be used with forwardRef
- it is mainly used to change the behavior of the exposed ref, which is a rare use case
- use cases
  - if you build a reusable component library, you may need to get access to the underlying DOM element
    - and then forward it so that it can be accessed by the consumers of the component library
```javascript
import React, { forwardRef, useRef } from "react";

const FancyInput = forwardRef((props, ref) => {
  const inputRef = useRef();
  
  const activateFocus = () => {
    console.log("focused")
    inputRef.current.focus()
  };
  
  React.useImperativeHandle(ref, () => ({
    activateFocus,
  }));

  return (
    <div>
      <input ref={inputRef} />
      <button onClick={activateFocus}>
        Focus from children
      </button>
    </div>
  );
});

export default FancyInput;
```
```javascript
import React, { useRef } from "react";
import FancyInput from "./FancyInput";


function App() {
  const inputRef = useRef();
  
  return (
    <div className="App">
      <FancyInput ref={inputRef} />
      <button onClick={() => inputRef.current.activateFocus()}>
        Focus from parent
      </button>
    </div>
  );
}

export default App;
```
### useLayoutEffect
- identical to useEffect, but it fires synchronously after all DOM mutations
  - difference is that the callback will run after render but before the actual updates have been displayed to the screen
- it will block visual UI updates until callback is completed
- use cases
  - situations when you need to calculate something in the UI before the DOM is visually updated
- If you’re migrating code from a class component
  - useLayoutEffect fires in the same phase as componentDidMount and componentDidUpdate
- If you use server rendering
  - neither useLayoutEffect nor useEffect can run until the JavaScript is downloaded
    - To fix this, either move that logic to useEffect (if it isn’t necessary for the first render)
    - or delay showing that component until after the client renders (if the HTML looks broken until useLayoutEffect runs)
```javascript
import React, { useRef, useLayoutEffect } from "react";

function App() {
  const myBtn = useRef(null);

  useLayoutEffect(() => {
    const rect = myBtn.current.getBoundingClientRect();
    console.log(rect.height);
  })
  
  return (
    <button ref={myBtn}>button</button>
  );
}

export default App;
```
### Custom Hooks
#### useDebugValue
- used to display a label for custom hooks in React DevTools
```javascript
import { useState, useEffect, useDebugValue } from "react";

export default function useCount() {
  const [count, setCount] = useState();
  
  useEffect(() => {
    doSomething();
    
    return doAnotherThing()
  }, [count]);
  
  const handleClick = () => {
    if (count === undefined) {
      setCount(0);
    } else {
      setCount(count + 1);
    }
  }
  
  useDebugValue(count ?? "haven't started counting");
  
  return {
    count,
    handleClick,
  };
}
```
```javascript
import React from "react";
import useCount from "./useCount";

export default function App() {
  const {count, handleClick} = useCount();
  
  return (<div onClick={handleClick}>count {count}</div>);
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
#### using ```useRef```
- allows you to create a mutable plain javascript object that keeps the same reference between renders
- can be used when there is a value that changes similar to setState
  - however, it does not trigger a re-render if the value changes
- common use is to grab native HTML elements from the DOM
- this hook should be used when you need to grab an element from the DOM 
```javascript
import React, { useRef } from "react";

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
import React, { useState } from "react";

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
