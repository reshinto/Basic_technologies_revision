# Forward Proxy example
## how to setup
1. install dependecies
> npm install
2. install nginx if it has not been installed
> brew install nginx
3. modify nginx.conf file
    - backup file before making changes
    - location of nginx.conf file for mac is at
    - ```/usr/local/etc/nginx```
4. run nginx
> brew services start nginx
5. run server
> node server.js
6. send request ```curl localhost:3001/hello``` for client to server
7. send request ```curl localhost:8081/hello``` for client to proxy to server
