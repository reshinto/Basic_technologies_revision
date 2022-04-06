# Proxies
* It is an intermediate server between the client and the back-end server
* Clients connect to proxy servers to request for a service like a web page, file, connection, etc.
* In short, a proxy server is a piece of software or hardware
  * that acts as an intermediary for requests from clients seeking resources from other servers.
* Typically, proxies are used to filter requests, log requests, or sometimes transform requests
  * e.g. (by adding/removing headers, encrypting/decrypting, or compressing a resource)
* Another advantage of proxy server
  * its cache can serve a lot of requests
* If multiple clients access a particular resource
  * the proxy server can cache it and serve it to all the clients without going to the remote server.
![alt text](https://github.com/reshinto/Basic_technologies_revision/raw/master/interviewPrep/system_design/images/proxies.png "Proxies")
## Proxy Server Types
* Proxies can reside on the client’s local server or anywhere between the client and the remote servers
* A few types of proxy servers:
### Open Proxy
* It is a proxy server that is accessible by any Internet user
* Generally, a proxy server only allows users within a network group (i.e. a closed proxy)
  * to store and forward Internet services such as DNS or web pages
    * to reduce and control the bandwidth used by the group
* With an open proxy, however, any user on the Internet is able to use this forwarding service
* 2 famous open proxy types:
  1. Anonymous Proxy
      * reveаls іts іdentіty аs а server but does not dіsclose the іnіtіаl IP аddress
      * Though thіs proxy server cаn be dіscovered eаsіly
        * іt cаn be benefіcіаl for some users аs іt hіdes their IP аddress
  2. Trаnspаrent Proxy
      * Thіs proxy server аgаіn іdentіfіes іtself, аnd wіth the support of HTTP heаders, the fіrst IP аddress cаn be vіewed
        * The mаіn benefіt of usіng thіs sort of server іs іts аbіlіty to cаche the websіtes
### Reverse Proxy
* It retrieves resources on behalf of a client from one or more servers
  * These resources are then returned to the client, appearing as if they originated from the proxy server itself
