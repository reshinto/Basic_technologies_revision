# Kubernetes in Microservices
## Microservices building blocks
### Codebase
- Code stored in source control
  - e.g.: Git, Perforce
- Container images stored in an image repository
  - e.g.: Docker Hub, Artifactory
### Codebase Worflow
1. Push code to your source control
2. Automated build is kicked off to build and run tests against code
3. Build container image, push to image repository
### Image Repository
- stores your code in an image
- need to decide early on
- follow company guidelines
### Application Dependencies
- Applications modeled in Kubernetes as Deployments and pods
- Single pod can have many containers inside
- Commonly seen in Kubernetes: sidecar pattern
### Dev versus Prod in Kubernetes
#### common kubernetes deployment patterns
- small footprint: different namespaces with different credentials for dev, staging, and production
- large footprint: unique kubernetes installation for dev, staging, and production
### Admin Processes
- admin process containers tagged in a similar way to the running application
- containers run as kubernetes jobs/chron job
- also run as a separate deployment
