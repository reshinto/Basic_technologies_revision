# Difference between REST and SOAP APIs
## API (Application Programming Interface)
* It makes it possible to transfer data from an application to other applications
* API receives requests and sends back responses through internet protocols such as HTTP, SMTP, etc.

## REST (Representational State Transfer)
* It is an architectural style of the web services (lightweight architecture)
  * work as a channel of communication between different computers or systems on the internet
* Created to address the problems of SOAP
  * has a more flexible architecture
  * consists of only loose guidelines and lets developers implement the recommendations in their own way
  * allows different messaging formats, such as HTML, JSON, XML, and plain text
### REST APIs
* It is the architectural style of REST architectural system that support the application programming interfaces
* Utilize stateless existence and the use of HTTP status codes
* To create a REST API, need to follow six architectural constraints:
    1. Uniform interface
        * Requests from different clients should look the same
           * e.g. the same resource shouldn’t have more than one URI
    2. Client-server separation
        * The client and the server should act independently
        * They should interact with each other only through requests and responses
    3. Statelessness
        * There shouldn’t be any server-side sessions
        * Each request should contain all the information the server needs to know
    4. Cacheable resources
        * Server responses should contain information about whether the data they send is cacheable or not
        * Cacheable resources should arrive with a version number so that the client can avoid requesting the same data more than once
    5. Layered system
        * here might be several layers of servers between the client and the server that returns the response
        * This shouldn’t affect either the request or the response
    6. Code on demand [optional]
        * When it’s necessary, the response can contain executable code (e.g., JavaScript within an HTML response) that the client can execute
* Advantage:
  * Redeploying manageable and updatable components won't cause an effect on the system
  * REST API systems deliver fast performance, reliability, and more progression

## SOAP (Simple Object Access Protocol)
* It is a standard communication protocol system
  * a messaging protocol for interchanging data in a decentralized and distributed environment
  * can work with any application layer protocol, such as HTTP, SMTP, TCP, or UDP
  * returns data to the receiver in XML format
  * Security, authorization, and error-handling are built into the protocol
  * unlike REST, it doesn’t assume direct point-to-point communication
  * therefore, performs well in a distributed enterprise environment
* As an official protocol, it comes with strict rules and advanced security features such as built-in ACID compliance and authorization
  * Higher complexity requires more bandwidth and resources, which can lead to slower page load times
  * A SOAP message is an ordinary XML file that consists of:
      1. Envelope (required)
          * This is the starting and ending tags of the message
      2. Header (optional)
          * It contains the optional attributes of the message
          * It allows you to extend a SOAP message in a modular and decentralized way
      3. Body (required)
          * It contains the XML data that the server transmits to the receiver
      4. Fault (optional)
          * It carries information about errors occurring during processing the message
      ```xml
      <env:Envelope xmlns:env="http://www.w3.org/2003/05/soap-envelope">
        <env:Header>
          <n:alertcontrol xmlns:n="http://example.org/alertcontrol">
            <n:priority>1</n:priority>
            <n:expires>2001-06-22T14:00:00-05:00</n:expires>
          </n:alertcontrol>
        </env:Header>
        <env:Body>
          <m:alert xmlns:m="http://example.org/alert">
            <m:msg>Pick up Mary at school at 2pm</m:msg>
          </m:alert>
        </env:Body>
      </env:Envelope>
      ```
* SOAP based APIs are designed to create, recover, update and delete records like accounts, passwords, leads, and custom objects
  * Offers over twenty different kinds of calls that make it easy for the API developers to maintain their accounts, perform accurate searches, etc.
  * Can be used with languages that support web services
* Advantage:
  * Easy to manipulate web services and get responses without caring about language and platforms
  * Good for enterprise-level web services that require high security and complex transactions
      * e.g.: financial services, payment gateways, CRM software, identity management, and telecommunication services
  * Available Legacy system support
  
  
## Major Differences
1. 
    * REST API: has no official standard as it is an architectural style
    * SOAP API: has an official standard because it is a protocol
2.
    * REST API: uses multiple standards like HTTP, JSON, URL, and XML
    * SOAP API: is largely based on HTTP and XML
3.
    * REST API: deploys multiple standards, so it takes fewer resources and bandwidth
    * SOAP API: uses XML for the creation of Payload and results in the large sized file
4.
    * REST API: takes advantage of URL exposure like @path("/WeatherService")
    * SOAP API: use of services interfaces like @WebService
5.
    * REST API: don't make emphasis on too many standards and results in corrupt API in the end
    * SOAP API: defines too many standards, and its implementer only implements the things in a standard way 
        * In the case of miscommunication from service, the result will be the error
6.
    * REST API: uses Web Application Description Language
    * SOAP API: uses Web Services Description language for describing the functionalities being offered by web services
7.
    * REST API: convenient with JavaScript and can be implemented easily
    * SOAP API: also convenient with JavaScript but don't support for greater implementation
    
|Type|SOAP |	REST|
|----|:---:|:------:|
|Meaning|Simple Object Access Protocol|Representational State Transfer|
|Design|Standardized protocol with pre-defined rules to follow|Architectural style with loose guidelines and recommendations|
|Approach|Function-driven (data available as services, e.g.: “getUser”)|Data-driven (data available as resources, e.g. “user”)|
|Statefulness|Stateless by default, but it’s possible to make a SOAP API stateful|Stateless (no server-side sessions)|
|Caching|API calls cannot be cached|API calls can be cached|
|Security|WS-Security with SSL support. Built-in ACID compliance|Supports HTTPS and SSL|
|Performance|Requires more bandwidth and computing power|Requires fewer resources|
|Message format|Only XML|Plain text, HTML, XML, JSON, YAML, and others|
|Transfer protocol(s)|HTTP, SMTP, UDP, and others|Only HTTP|
|Recommended for|Enterprise apps, high-security apps, distributed environment, financial services, payment gateways, telecommunication services|Public APIs for web services, mobile services, social networks|
|Advantages|High security, standardized, extensibility|Scalability, better performance, browser-friendliness, flexibility|
|Disadvantages|	Poorer performance, more complexity, less flexibility|Less security, not suitable for distributed environments|
