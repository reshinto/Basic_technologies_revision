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
