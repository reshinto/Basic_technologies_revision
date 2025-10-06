# Static Configuration Example
## How to use
- install all dependencies
> npm i
- open 2 terminals
- run server
> node server.js
- run client by curling
> curl localhost:3000/static/new_feature.html
    - you will get a ```unauthorized``` message
- modify the feature to true in the static_config file
```
{
  "newFeatureLaunched": true
}
```
- then relaunch the server and curl again
  - hello world html contents will be returned
