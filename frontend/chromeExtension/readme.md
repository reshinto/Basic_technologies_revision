# Chrome Extension

## Send a one time request from a content script or popup script to the background page

### can use response with callback or http request

```javascript
// Content Script or Popup
chrome.runtime.sendMessage({greeting: "hello"}, (response) => {
  console.log(response.farewell);
});

// Background Page
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.greeting === "hello") sendResponse({farewell: "goodbye"});
});
```

## Another way of doing is similar to the WebSocket architecture

- Long-Lived Connection
  - does not allow you to get statues on how your messages went, but are very efficient
  - thus can post messages back and forth between different components

```javascript
// Create a port
const port = chrome.runtime.connect({name: "knockknock"});

// Post a message to port
port.postMessage({joke: "Knock knock"});

// Listen for messages
port.onMessage.addListener((msg) => {
  if (msg.question === "Who's there?") port.postMessage({answer: "Madame"});
  else if (msg.question === "Madame who?")
    port.postMessage({answer: "Madame... Bovary"});
});
```

### Use background page as redux store

```javascript
import {wrapStore} from "react-chrome-redux";

// the redux store
import store from "./store";

// connect store with proxy stores in UI pages
wrapStore(store, {
  portName: "example-port",
});
```

### in Popup page, create a proxy store

```javascript
import {Store} from "react-chrome-redux";
import {Provider} from "react-redux";

// create proxy store (same API as redux store)
const proxyStore = new Store({
  portName: "example-port",
});

// use like normal redux store
render(<Provider store={proxyStore}></Provider>, appNode);
```
