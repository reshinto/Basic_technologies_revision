# Polling and Streaming Example
## How to use
- Install all dependencies
> npm i
- open 4 terminals
- run server
> node server.js
- run client file with stream mode
> MODE=stream NAME=Clement node client.js
    - when you chat here, poll mode users will receive your messages at every interval
- run client file with poll mode
> MODE=poll NAME=Antoine node client.js
    - when you chat here, stream mode users will receive your messages instantly
- test streaming and polling with a script
> (for i in `seq 1 10000`; do sleep 1; echo $i; done) | NAME=Bot node client.js
