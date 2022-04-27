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
## Deployment patterns
### Application Configuration
- Applications always have associated configuration to make the application work as expected
### Application Configuration in Kubernetes
- 2 ways to store configs
  1. configMaps
      - for generic information (e.g.: metadata, version)
  2. secrets
      - for sensitive data (e.g.: passwords)
      - depending on the use case, might need something like `HashiCorp Vault`
- Loaded into the pod via
  - environment variables
  - files
### Build, Release, Run
- Tag containers at build time with explicit version
- don't use latest tag for production containers
### Running in Kubernetes
- high level constructs to run containers
- deployments, DaemonSets, ReplicaSets
- package management provided by Helm
- adds revision control
### Processes and Port Bindings
#### processes
- keep application stateless
- don't rely on sticky sessions
- goal: allow request to go to any container or server by default
- Word on StatefulSets
  - Typically used to create persistent storage systems like a MySQL shard
#### Port Binding
- Statelessness in Kubernetes
  - translated to deployments and pods
  - deployments comprised of ReplicaSets, which are a collection of one or more pods
- Containers are implemented in pods
- Communicate to each other via well-defined ports
## Runtime patterns
### Associating Resources in Kubernetes
- everything is treated as a service, and configurations are stored in a ConfigMap or Secret
### Scenario: Replace a link to a database
1. Create a new database
    - ensure it's online and ready to accept connections
2. Update configuration stored in the ConfigMaps or Secrets
3. Kill the pods that were communicating with the old database
### strengths
- when kubernetes starts up the new pods, the new pods automatically pick up the new configuration, and can use the new service
- if a pod is taking too much load or is receiving a lot of requests
  - it's easy to scale the number of pods in kubernetes by adding more to the replica set
- Scaling kubernetes to handle more traffic is one of the strengths of the platform
- disposability
  - the ability to maximize robustness with fast startup and graceful shutdown
 ### containers
 - start up fast and run efficiently
 - have all required tooling built inside of the container image
 ### Containers to Pods to Replicas
 - Kubernetes manages your containers in pods, which are managed with ReplicaSets
 - if one of the pods goes offline, the ReplicaSet will automatically start up a new pod to take its place
### Advantages to Users
- from a user perspective, the application will still function, and the user won't see any downtime
### Logging
- treat logs as streams
  - execution environment handles the logs
- common to use a log router (Beats, Fluentd) to save the logs to a service (Elasticsearch, Splunk)
- Kubernetes makes this process easy
