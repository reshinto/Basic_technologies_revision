# Rate Limiting Example
## How to use
- install all dependencies
> npm i
- open 3 terminals
- run server
> node server.js
- run 1st curl request
> curl -H 'user: clement' http://localhost:3000/index.html
    - if to many requests are made within 5 seconds, an error will appear
- run 2nd curl request
> curl -H 'user: antoine' http://localhost:3000/index.html
    - even if other users are getting error of too many request, you will still be able to make your request
