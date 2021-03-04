# Simple cache example with mock database
- first install dependencies
> npm install
- run server
> node server.js
- in the url open
```http://localhost:3001/nocache/index.html```
  - this will take 3 seconds everytime the page is loaded as there is no cache involved
```http://localhost:3001/withcache/index.html```
  - this will take 3 seconds for the 1st time the page is loaded, and will be instant from the next load onwards
