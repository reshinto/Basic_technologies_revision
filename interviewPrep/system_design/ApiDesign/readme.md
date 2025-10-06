# Application Programming Interface (API) Design
- it is a sibling of system design
## types of clarifying questions to ask during an API design interview
- what part of the app are we designing this API for
- are we just designing the API that supports the functionality on a certain page of the app
- is it for the trending tab
- is it for the settings tab
- who's gonna be consuming our API
## during the API design interview
- write an outline of sorts of the API
- write out the various entities or resources that this API is gonna rely on
  - write out what these entities or resources look like
  - what properties or attributes they have
- write out the outline various API endpoints that the API needs to have
- write out the various parameters that the API endpoints take, the various responses that the API end points return
## Access-Control List (ACL)
- used to refer to a permissioning model
  - which users in a system can perform which operations
  - APIs often come with ACLs defining which users can delete, edit or view certain entities
## Pagination
- when a network request potentially warrants a really large response
  - the relevant API might be designed to return only a single page of that response (a limited portion of the response)
    - accompanied by an identifier or token for the client to request the next page if desired
- pagination is often used when designing list endpoints
  - e.g.: an endpoint to list videos on youtube trending page could return a huge list of videos
    - this wouldn't perform well on mobile devices due to the lower network speeds, and is also not optimal
      - since most users will only scroll through the first 10 or 20 videos
    - therefore, API could be designed to respond with only the first few videos of that list
      - this is where API response is paginated
## Create, Read, Update, Delete (CRUD) Operations
- these 4 operations often serve as the bedrock of a functioning system
- therefore it is the core of many APIs
