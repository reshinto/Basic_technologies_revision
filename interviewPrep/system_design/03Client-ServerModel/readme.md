# Client-Server Model
- A client is a thing, a machine, that speaks (sends data to a server or request data from a server) to servers.
- A server is a thing, a machine, that listens to clients, or listens for clients to speak with, and then it speaks (returns some form of data to the client) back to those clients.
- The client—server model is a thing made up of a bunch of clients and servers talking to one another.
## Question: what happens when you go to a website in your browser?
- Your browser (google chrome) is a client, the website is the server (not the actual server)
- the browser does not actually know what the website is
  - all that it knows is that it can communicate with it (speak to it, request stuff from it)
  - but doesn't actually know what the server represents
  - it will request information from the server
    - and then base on that information (based on the response from the server), it will be able to do stuff
- when typing the URL bar, at first the browser doesn't even know how to talk to the website (or the server)
  - what it does behind the scenes, actually, is it makes a DNS query to find out what the IP address of the website is
    - only then can the browser really speak directly to the website (the server)
- once browser knows where the website is with the IP address
  - it sends a HTTP request to the IP address and specify what port to communicate with
    - it basically sends a bunch of bytes or characters that are going to get packed into what we call packets in some special format to the website (servers)
    - the request will also contain the IP address of the browser, or computer
      - this is the called the source address of the request
    - after receiving the IP address information, the server will then know where to send the response to
- A server usually listens for requests on specific ports
  - any machine that has a distinct IP address has 16,000 ports that programs on the machine can listen to
  - therefore, when communication with another machine, you need to specify what port you want to communicate on
- most clients actually know the port that they should use, depending on the protocol that they're trying to speak to the server with
  - eg.
    - if the client is trying to speak to a server using the HTTP protocol
      - it is always going to use port 80, which was decided a long time ago
    - if the client is trying to speak to a server using HTTPS
      - it will use port 443
- after the server receives the request from the browser, the server understands that you are trying to view the HTML of the website
  - so the server will return the HTML of the website in its response to the client
  - the client will receive the response and then renders the HTML on the page for you
## DNS query: it is a special request, that goes to a predetermined set of servers to request for the ip address of the URL
## IP address: it is a unique identifier for a machine
- all computers connected to the internet, have ways to find public IP addresses, or at least, they have ways to discover routes to those addresses
  - this means that the computers can send data to IP addresses
    - they can send packets of information in the form of bytes, to IP addresses
- therefore, a website that was granted an IP address could be a cloud provider (such as google cloud platform)
  - so what the website creator did was to go to the cloud platform after creating the website, and requested to be given and to reserve an IP address
## HTTP: it is a way to send information, that the server is able to understand
## Terms used
### Client
- a machine or process that requests data or service from a server
- note that a single machine or piece of software can be both a client and a server at the same time
  - for instance, a single machine could act as a server for end users and as a client for a database
### Server
- a machine or process that provides data or service for a client
  - usually by listening for incoming network calls
- note that a single machine or piece of software can be both a client and a server at the same time
  - for instance, a single machine could act as a server for end users and as a client for a database
### Client-Server Model
- the paradigm by which modern systems are designed, which consists of clients requesting data or service from servers and servers providing data or service to clients
### IP Address
- an address given to each machine connected to the public internet
- IPv4 addresses consist of 4 numbers separated by dots: a.b.c.d where all 4 numbers are between 0 and 255
  - Special values
    - 127.0.0.1: your own local machine, also referred to as localhost
    - 192.168.x.y: your private network
      - for instance, your machine and all machines on your private wifi network will usually have the 192.168 prefix
### Port
- in order for multiple programs to listen for new network connections on the same machine without colliding, they pick a port to listen on
- a port is an integer between 0 and 65, 532 (2^16 ports total)
- typically, ports 0 - 1023 are reserved for system ports (also well-known ports) and shouldn't be used by user-level processes
  - certain ports have pre-defined uses, and although you usually won't be required to have them memorized, they can sometimes come in handy
    - 22: secure shell
    - 53: DNS lookup
    - 80: HTTP
    - 443: HTTPS
### DNS
- short for Domain Name System
- it describes the entities and protocols involved in the translation from domain names to IP addresses
- typically, machines makes a DNS query to a well known entity which is responsible for returning the IP address (or multiple ones) of the requested domain name in the response
