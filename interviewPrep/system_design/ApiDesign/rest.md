# REpresentational State Transfer (REST)
- refers to a group of software architecture design constraints that bring about efficient, reliable, and scalable systems
## 6 constraints of REST
- if a web-based API meets these 6 constraints, it can be considered a RESTful API
1. Client-server architecture
    - the client manages user interface concerns while the server manages data storage concerns
      - this allows a highly portable system where 1 REST server can serve multiple clients
    - have a complete separation between the content and its presentation and interaction
2. Statelessness
    - no client context or information (state) can be stored on the server between requests
    - the client is responsible for keeping track of its own session state
    - all requests sent from a client must be self-contained and complete
    - if the client's session state is relevant, it must be sent along with a request
    - if the server needs to store the state, it must pass it on to a database or similar service for a specific time
3. Cacheability
    - all REST responses must be clearly marked as cacheable or not cacheable
4. Layered system
    - the client cannot know, and shouldn't care, whether it's connected directly to the server or to an intermediary like a CDN or mirror
      - ensures scalability and helps with security
5. Code on demand
    - servers are allowed to transfer executable code like JavaScript and compiled components to clients
    - less commonly used of REST
6. Uniform interface
    1. Resource identification in request
        - the URI request must specify what resource it is looking for and what format the response should use
    2. Resource manipulation through representations
        - once a client has a representation of a resource, it can modify or delate the resource
    3. Self-descriptive messages
        - a uniform interface must issue self-descriptive messages for both sending and receiving REST data
        - each representation must describe its own data format
    4. Hypermedia as the engine of application state
        - a uniform interface must use hypermedia as the engine of application state
        - once a client has access to a REST service, it should be able to discover all available resources and methods through the hyperlinks provided
 
