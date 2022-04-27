# Microservices
- microservices can be broken up in a way to solve a specific business need or enable a business capability
- easier to justify technical work when it's related directly to a specific business need
- building microservices forces you to think about applications in a more modular way
## Benefits of microservices
- Freedom to create, manage, and deploy individual components
- Reduced surface area allows easier to plug in continuous integration
- Enables fault tolerance and fault isolation
- language independence
- use the right language for the task at hand
- not pigeonholed to a single language just because the rest of the application uses it
## avoid bottlenecks with scaling
### Example: authentication and token management
- build login/token management
- APIs as a separate service
- Scale out independently as an app
## Deployment Benefits
- Get your updates to production more quickly
- Risk of rolling out a smaller changeset is lesser
- Get to play with some new ideas like blue-green or A/B deployments
- Ability to replace components in a more efficient way
## Open up to New Opportunites
- Apply microservices approach to containers and serverless paradigms
- Serverless paradigms and containers introduce new tooling and technologies that benefit from a microservices approach
