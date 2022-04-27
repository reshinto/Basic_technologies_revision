# Microservices
- microservices can be broken up in a way to solve a specific business need or enable a business capability
- easier to justify technical work when it's related directly to a specific business need
- building microservices forces you to think about applications in a more modular way
## Introduction to Microservices
### Benefits of microservices
- Freedom to create, manage, and deploy individual components
- Reduced surface area allows easier to plug in continuous integration
- Enables fault tolerance and fault isolation
- language independence
- use the right language for the task at hand
- not pigeonholed to a single language just because the rest of the application uses it
### avoid bottlenecks with scaling
#### Example: authentication and token management
- build login/token management
- APIs as a separate service
- Scale out independently as an app
### Deployment Benefits
- Get your updates to production more quickly
- Risk of rolling out a smaller changeset is lesser
- Get to play with some new ideas like blue-green or A/B deployments
- Ability to replace components in a more efficient way
### Open up to New Opportunites
- Apply microservices approach to containers and serverless paradigms
- Serverless paradigms and containers introduce new tooling and technologies that benefit from a microservices approach
### Common microservices pattern
#### Twelve-Factor App
- [Source](https://12factor.net)
- Initially proposed to build SaaS (Software as a Service) apps for Heroku
- Principles translate well to cloud and container native applications
  1. Principle: Codebase
      - codebase must be tracked in version control and will have many deploys
  2. Principle: Dependencies
      - dependencies are explicitly declared and isolated
  3. Principle: Configuration
      - store configuration in the environment
  4. Principle: Backing Services
      - Treat backing services as an attached resource
        - e.g.: for internal database, or third party service
      - should be easy to deploy and change
  5. Principle: Build, Release, Run
      - build, deploy, run
        - always have a build and deploy strategy
        - build strategies for repeated builds, versioning of running system, and rollback
  6. Principle: Processes
      - Execute the application as a stateless process
        - sticky sessions need to be revisited and reimplemented
        - might be challenging in large enterprise with architecture already in place
  7. Principle: Port Binding
      - Expose services via port bindings
  8. Principle: Concurrency
      - Scale out with the process model
  9. Principle: Disposability
      - Quick application startup and shutdown times
  10. Dev/prod parity
      - Application is treated the same way in dev, staging, and production
  11. Log Management
      - Treated as an event stream
  12. Admin Tasks
      - Treated the same way like the rest of the application
      - Are allowed to run against a released version
