# Kubernetes (K8s, Hubernetes)
- it is an open-source platform started by google, designed to automate the deployment, scaling, and operation of containers
- the goal of the platform is to foster an ecosystem of components and tools that relieve the burden of running applications in public and private clouds
- in google
  - all infrastructure relies on containers and generates more than 2 billion container deployments a week
  - all powered by an internal platform called `Borg`
    - Borg was the predecessor to Kubernetes
- by using Kubernetes in your infrastructure
  - it gives you a platform to schedule and run containers on clusters of your machines
  - it runs on bare metal, virtual machines, private datacenter and public cloud
  - this means no more `golden handcuffs` and opens up opportunities to have hybrid cloud scenarios for those migrating towards the cloud
- since kubernetes is a container platform, you can use `Docker` containers or other container platforms (e.g.: rkt) to develop and build applications
  - then use Kubernetes to run these applications on your infrastructure
- other major player in container orchestration other than Kubernetes
  - e.g.: Docker Swarm, Rancher, Mesos
  - Cloud Specific technologies
    - e.g.: Amazon EC2 Container service, Google Anthos

![Orchestrator Guidelines](../../images/orchestratorGuidelines.png)

## Features
### Multi-host container scheduling
- handled by Kube-scheduler
- it assigns containers also known as `pods` to nodes at runtime
- it checks resources, quality of service, polices, and user specifications before scheduling
### Scalability and Availability
- the kubernetes master can be deployed in a highly available configuration
- multi-region deployments are also available
- e.g.: Kubernetes v1.17
  - architecture supports 5000 node clusters
  - run up to max 150000 total pods
    - max 100 pods per node
  - pods can be horizontally scaled via an API
#### Flexibility and Modularization
- has a plug and play architecture
  - it allows you to extend it when needed
- has add-ons: network drivers, service discovery, container runtime, visualization, and command
  - if there are tasks that you need to perform for a specific environment
    - can create an add-on to suit the need
#### Registration and Discovery
- they are the 2 features that allow Kubernetes clusters to scale
##### Registration
- new worker nodes can seamlessly register themselves with the Kubernetes master node
##### Service Discovery
- allows for automatic detection of new services and endpoints via DNS or environment variables
#### Persistent Storage
- a requested and important feature when working with containers
- `pods` can use persistent volumes to store data
  - data is retained across pod restarts and crashes
#### Application Upgrades and Downgrades
- upgrades and downgrades are supported out of the box
### Maintenance
- features are backward compatible for a few versions
- all APIs are versioned
- able to turn on/off host during maintenance
  - can unschedule the host so that no deployments can take place on it during upgrading or maintenance
  - then turn host back on and schedule deployments or jobs
### Logging and Monitoring
- application monitoring or health checks are built-in
  - e.g.: TCP, HTTP, container execution health checks are available out of the box
- have health checks to give status of the nodes
  - failures are monitored by node controller
- Kubernetes status can also be monitored via add-ons
  - e.g.: Metrics Server, cAdvisors and Prometheus, Heapster
- can use built-in logging frameworks or use your own
### Secrets Management
- sensitive data is first class citizen
- secrets are mounted as data volumes or environment variables
- it is specific to a single namespace
  - thus they aren't shared across all applications
## Kubernetes: basics
### Kubernetes cluster architecture

![Kubernetes Cluster Architecture](../../images/kubernetesClusterArchitecture.png)

#### master node
- responsible for overall management of the Kubernetes cluster
- has 3 components that takes care of communication, scheduling, and controllers
  1. API Server
      - allows you to interact with the Kubernetes PAI
      - its the front end of the Kubernetes control plane
  2. Scheduler
      - it watches created `Pods` who do not have a Node design yet
      - designs the `Pod` to run on a specific Node
  3. Controller Manager
      - it runs controllers
        - they are background threads that run tasks in a cluster
      - has a bunch of different roles compiled into a single binary
        - roles include
          - Node Controller: responsible for the worker states
          - Replication Controller: responsible for maintaining the correct number of Pods for the replicater controllers
          - End-Point Controller: joins services and Pods together
          - Service account and Token Controller: handle access management
#### etcd
- a simple distributed key value store
- Kubernetes uses it as a database, and stores all cluster data here
  - store informatione examples
    - job scheduling info, pod details, stage information, etc.
#### kubectl
- interact with `master node` with `kubectl`
- it is the command line interface for kubernetes
- has a `kubeconfig` config file
  - has server information
  - has authentication information to access the API server
#### worker nodes
- are nodes where the applications operate
- `kubelet` process
  - it communicates with the master node
  - it is an agent that communicates with the API server to see if `Pods` have been designed to the Nodes
  - it executes `Pod` containers via the `container engine`
  - it mounts and runt `Pod` volume and secrets
  - it is aware of `Pod` of Node states and responds back to the `Master`
- kubernetes is a container orchestrator
  - expectation is that you have a container native platform running on the `worker nodes`
    - this is where `Docker` is used to work together with `Kubelet` to run containers on the Node
- `kube-proxy`
  - it is the network proxy and load balancer for the service on a single worker node
  - it handles the network routing for TCP and UDP Packlets, and performs connection forwarding
- `Docker` daemon
  - allows running of `containers`
    - containers of an application are tightly coupled together in a `Pod`
      - `Pod` is a the smallest unit that can be scheduled as a deployment in Kubernetes
      - this group of containers share storage, Linux name space, IP addresses
      - it is also co-located and share resources that are always scheduled together
      - once `Pods` have been deployed and running, the `kubelet` process communicates with the `pods` to check on state and health
        - `kube-proxy` will route any packets to the Pods from other resources that might want communication
- worker nodes can be exposed to the internvet via `load balancer`
- traffic coming into the Nodes are handled by `Kube-proxy`
  - this is how end-users talk to kubernetes application

### Nodes and Pods
#### Node
- it serves as a worker machine is a kubernetes cluster
- it can be a physical computer or a virtual machine
- requirements
  - each node must have a `kubelet` running
  - container tooling like Docker
  - a kube-proxy process running
  - a process like `Supervisord` so that it can restart components
- recommendation
  - if using Kubernetes in a production like setting, recommended to have at least a 3 Node cluster
#### Tool: Minikube
- a lightweight kubernetes implementation that creates a VM on local machine and deploys a simple cluser containing only 1 node
#### Pods
- it is a simplest unit that you can interact with
- can create, deploy, and delete pods
- it represents 1 running process in the cluster
- inside a Pod
  - docker application container
  - storage resources
  - a unique network IP
  - options that govern how the container should run
  - in some scenarios
    - can have multiple docker containers running in a Pod
      - but a Pod represents 1 single unit of deployment, which is a single instance of an application in Kubernetes that is tightly coupled and shared resources
- designed to be ephemeral, disposable entities
- don't need to create Pods just by themselves in a production application
  - only do that when need to test whether the underlying containers actually work
- Pods don't self-heal
  - it a Pod dies, it will not be reschedules
  - if a Pod is exited from a Node because of lack of resources, it will not be restarted on different healthier Nodes
- always use higher-level constructs
  - it manages and adds stability to Pods, called controllers
  - thus user a controller like a deployment and don't use a Pod directly
- Pod States
  - `Pending`
    - Pod has been accepted by the Kubernete system, but a container has not been created yet
  - `Running`
    - where a Pod has been scheduled on a Node, and all of its containers are created, and at least 1 container is in a running state
  - `Succeeded`
    - all containers in the Pod have exited with an exit status of 0, indicating successful execution and will not be restarted
  - `Failed`
    - all containers in the Pod have exited and at least 1 container has failed and returned a non 0 exit status
  - `CrashLoopBackOff`
    - where a container fails to start, and Kubernetes tries repeatedly to restart the Pod


