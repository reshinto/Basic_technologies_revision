# Minikube
## Installation
- Install
  > brew install minikube
- verify
  > minikube version
## Commands
### Check status
> minikube status
### Start cluster
> minikube start
- on local, use virtual box instead of docker driver
  > minikube start --driver=virtualbox
- verify if cluster is up and running
  > kubectl get nodes
### Pause cluster
> minikube pause
### Unpause cluster
> minikube unpause
### Stop cluster
> minikube stop
### Increase the default memory limit (requires a restart)
> minikube config set memory 16384
### Browse the catalog of easily installed Kubernetes services
> minikube addons list
### Create a second cluster running an older Kubernetes release
> minikube start -p aged --kubernetes-version=v1.16.1
### Delete all of the minikube clusters
> minikube delete --all
### Deploy applications
- deploy app
  > kubectl create -f filename.yaml
- expose deployment as a service
  > kubectl expose deployment appname --type=NodePort
- access service
  > minikube service appname
### List all services
> minikube service list
