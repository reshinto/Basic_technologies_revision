# HTTP (Hypertext Transfer Protocol)
## What is http
- a protocol used to transfer hypertext
  - protocol: a system of rules that allow communication of information between different entities
  - hypertext: an outdated word for text that displays on a computer screen
    - text contains hyperlinks to other text (web documents)
## What is http used for
- http protocol is used to send requests & receive responses between servers & browsers during interaction of web contents
- http protocol defines how the information is formatted & transmitted
- http facilitates every transaction made over the WWW (World Wide Web)
  - link: browser sends a request to get the data from the server when clicked
  - submit button: browser sends a request to post data to a database on the server when clicked
## Core principles of HTTP
### Plain language and human readable
- http request methods
  - uses simple human language verbs
    - GET: get specified resource if available
      - public resource
        - only needs the method and URL
      - secured resource
        - needs authorization header
          - contains encrypted username & password pair
          - may require cookie containing authentication token
    - POST: create a new resource and add it to a collection
      - needs authorization header as it is making changes to the server
        - contains only the contents of the request
    - PUT: update an existing singleton resource based on ID
      - use to update an existing resource by replacing some or all of its contents with the request contents
        - modified contents MUST be sent together with contents that were not modified, else will be removed
      - requires authorization header
        - contains ID of a resource and request contents to be added
      - contents will be added or replaced
    - PATCH: modify an existing singleton resource based on ID
      - carries instructions on how to modify the existing resource without necessarily replacing data
        - ONLY modified contents will be modified, contents that were not modified will remain
      - requires authorization header
    - DELETE: delete a singleton resource based on ID
      - must contain the ID for the resource and an authorization header
    - HEAD: get just the response headers from the resource
      - returns just the HEAD section of the response
    - OPTIONS: get the options available from this resource
      - returns a description of the communication options for the target resource
    - TRACE: create a loopback for the request message
      - creates a loopback of the request message effectively telling the client where the request ended up
### HTTP is a stateless protocol
- each individual request sent over the protocol is unique, no request is connected to another request
- statelessness ensures users do not get trapped in or placed in the middle of sequences of content
  - problem: means that it cannot walk their way through sequences because the requests are not connected
  - solution: enable sessions
    - store states shared between browser & server
    - browser & server can exchange information about where the visitor is in the sequence by passing information back & forth
      - in the form of cookies
#### HTTP extensibility
- the passing of cookies that allows HTTP to preserve sessions
- when requests & responses are sent back and forth over HTTP
  - can include HTTP headers with additional information
    - headers can carry information about everything
      - type of client that sent the request
      - server configuration
      - time & date of response
      - how & for how long the client should store the data
      - what format the data is in
### HTTP works based on request/response pairs
- every action performed over http
  - starts with a request using 1 of the HTTP methods
  - ends with a response containing a HTTP status code, headers, and content
## HTTP versions
### HTTP/1.1 (old)
- still being used mainly as a fallback protocol in case if HTTP/2 fails
### HTTP/2 (new)
- powers 70-80% of all transactions over the web
- it is faster and more secure than HTTP/1.1
- uses compression algorithms to speed up requests
  - allows for multi-plexing: multiple files can be sent over the same TCP connection at the same time & requires an encrytion
- this is used as a fallback protocol in case if HTTPS fails
### HTTPS (new)
- every HTTP transaction should idealy be done over an encrypted HTTPS connection using HTTP/2 protocol
## HTTP flow
1. browser opens a TCP connection to the server
    - ensures data can be sent back and forth over the network
    - ensures data sent from 1 end is put together the same way as the other end
    - if the connection happens over HTTPS
      - TLS certificates are exchanged to ensure only the computer and the server can encrypt and decrypt the transmitted data
        - prevents anyone from eavesdropping the conversation between the client and server, and steal the transmitting data
2. browser sends a HTTP message
    - message contains
      - a HTTP method (GET, PUT, etc.)
      - a URL pointing at the requested resource
      - headers
        - cookies
        - authentication data
        - data
3. server performs the requested actions and sends a response back to the browser
    - response will contain
      - a HTTP status message indicating what happened
      - headers
        - information about the response
        - data that was requested
          - can be in HTML document, stylesheet, javscript, image, etc.
4. Once response is fully received, TCP connection is closed
## Terms used
### Browser
- an app used to access & navigate between HTML documents
- comes in many varieties
  - regular visual browsers on phone, tablet, computer
  - text-to-speech audio browsers, text-only browsers
  - VR (virtual reality), AR (augmented reality), MR (mixed reality), XR (extended reality) browsers
### User agent
- an app that is acting on behalf of the user (commonly referred to as a client app)
- in http terms, user agent is whatever app that is transporting information from the user to a server and back
  - this jobs is normally the browser's job but not limited to the browser
  - it can also be a middleware or service
    - e.g.: google, or server
### TCP (Transmission Control Protocol)
- one of the main internet protocols used by WWW, email, FTPs (file transfer protocol), remote administration
- TCP connection is probably being used if you connect a service over the internet
### IP (Internet Protocol)
- used to transfer data between computers over a network
- each computer connected to the internet has a dedicated IP address, which is used to connect to it
### URL (Universal Resource Locator)
- a universally understood address pointing at a resource somewhere on the web
- URLs are human-readable addresses stored in DNS (Domain Name Servers) and configured to point to the IP addresses of web servers
- web address typed in the address bar of the browser is automatically prefixed with either HTTP or HTTPS
  - this means that you are using HTTP to access the resource at the other end of the universal locator
#### has 2 main pieces
1. a protocol declaration
    - e.g.: http://
    - states how we are accessing that resource using the HTTP methods and transport layer
2. a URN (Universal Resource Name)
    - e.g.: example.com/page1/page2?somequery=somevalue
    - provides the location of the resource
    - made up of several pieces
      1. host
          - e.g.: example.com
          - a domain which is registered at a DNS (domain name service)
            - points to a dedicated server IP address
      2. port
          - e.g.: 80 from example.com:80
          - usually invisible, and states which port we want to access on the server
          - server usually uses default ports, thus does not need to be declared
            - http default is ```80```
            - https default is ```443```
      3. resource path
          - e.g.: /page1/page2
          - the file location within the server
            - default web documents such as ```index.html``` or ```default.htm``` will be automatically loaded
            - any other named web documents such as ```about.html``` needs to be listed in the URN
              - e.g.: /page1/page2/about.html
      4. URL query
          - e.g.: ?somequery=somevalue
          - 1 or more queries added to the end of the resource path
            - can perform further actions on the server
            - can be used to track user's ID or filter content, etc.
          - multiple queries can be made via connecting them with a ```&```
            - e.g.: ?somequery1=somevalue1&somequery2=somevalue2
### Server
- it is a computer on the internet running some form of data storage and sharing application
  - most commonly a web server app
    - allowing users to access its data through the HTTP protocol
- can cache, clear cache, and update specific cache files
  - literally store data for a specified length of time to speed up transfers and performance
### Client (website)
- an app that talks to a server
  - does so by sending an HTTP request, which contains
    - a request method describing what action is requested
    - an address pointing to a resource
    - other information about the client
  - if client is sending information to the server
    - information is packaged in the request as a payload
    - the response is the literal response to the request, which contains
      - a status response code explaining what happend
      - information about how the responses was handled
      - data requested (if responses was successful)
- can cache, clear cache, and update specific cache files
  - literally store data for a specified length of time to speed up transfers and performance
### Proxy
- a service, either software or hardware
  - acting as a middle person between clients and servers
- often used when IP address of a server needs to be hidden
  - or when a server or client sits behind some sort of network barrier like a firewall
- it is literally a proxy handling data back and forth
### Header
- contains metadata about the request facilitating communication between clients and servers
- header of HTTP request always contain a request method, or verb
- header of HTTP response always contain a status response code
  - these are numerical codes from 100 to 500 describing what type of response the client is receiving
    - 200s for successful responses
    - 300s for redirection messages
    - 400s for client errors
    - 500s for server errors
