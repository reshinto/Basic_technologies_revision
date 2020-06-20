# Docker
## Installation
### Windows
#### WSL Ubuntu
- refer to the following [website](https://nickjanetakis.com/blog/setting-up-docker-for-windows-and-wsl-to-work-flawlessly)
  - Docker desktop version must be [2.2.0.5](https://docs.docker.com/docker-for-windows/release-notes/#docker-desktop-community-2205)
  - there might be some issues while installing docker and docker compose within wsl
    - google it and solve the issue
      - might need to uninstall and upgrade certain softwares
## Definitions
### Images
- it is a package or a template similar to a Virtual Machine template used to create 1 or more containers
- images can be searched for, or created and pushed to docker hub repository (public)
  - a ```docker file``` is required with the developed app to create an image
### Containers
- it is a running instance of images that are isolated and have their own environments and set of processors
### Networking
- docker has 3 networks
  1. bridge
      > docker run ubuntu
      - a private internal network created by docker on the host
        - all containers attach to this network by default
        - will get an internal IP address ```172.17.0.0/16``` series
        - containers can access each other using the internal IP
        - to access containers from outside
          - map container ports to host ports
      - custom internal network can be created
        > docker network create --drive bridge --subnet 182.18.0.0/16 custom-isolated-network^name
  2. none
      > docker run ubuntu --network=none
      - containers are isolated and are not attached to any network
      - does not have any access to external network or other containers
  3. host
      > docker run ubuntu --network=host
      - this takes out any network isolation between the host and container
        - PORT conflicts will arise if PORT is already in use on the computer
## Commands
### Download and install image
- Pulls an image or a repository from the docker hub registry
  > docker pull [imageName]
- similar to using the ```run``` command, however, this will only download once
  > docker run [imageName]
### List all images installed
> docker images
### Remove images
- ensure that no containers are running before removing
  > docker rmi [imageNameOrImageID]
### List all running containers
> docker ps
- list all containers including those that are not running
  > docker ps -a
### Start and Stop container
- start
  > docker start [containerName or containerId]
- stop
  > docker stop [containerName or containerId]
### Remove a stopped container permanently
- this will delete all saved data in the container
  - use volume mapping to enable persistent data
> docker rm [containerName]
### Running a container
- Creates a random container name and run it, it will stop and exit after all tasks are completed
  > docker run [imageName]
- Specify a name of the container
  > docker run --name=someName [imageName]
#### Run a container with a specific version with ```tag```
- e.g.: running an image with version 4.0
  > docker run imageName:4.0
#### map host PORT with container PORT with -p
- By DEFAULT host PORT will use container PORT
- to change default, need to map desired host PORT to the container PORT
  - e.g.: mapping host PORT 80 with container PORT 5000
    > docker run -p 80:5000 [imageName]
#### Volume mapping to enable persistent data with the -v option
- all files located in the specified host directory will be accessible in the specified container directory
> docker run -v hostFilePath:containerFilePath [containerName]
  - e.g.:
    > docker run -v /c/Users/reshinto/shareFolder:/someFolder mysql-docker
#### Detach running container with the -d option
- container can be detached and be runned in the background
> docker run -d [imageName]
#### Set Environment variables in the container with -e option
> docker run -e VARIABLE_NAME=value [imageName]
#### Delete container when the container has stop running with --rm option
> docker run --rm [imageName]
### Execute a command externally
> docker exec [commands]
#### Use -i option to enable interactive mode
#### Use -t option to enable terminal (-i and -t is usally used together as -it)
> docker exec -it [containerName] [commands]
- e.g.: running mysql
  > docker exec -it mysql-docker mysql -u root -p
#### Use bash terminal
- -it option must be used together
  > docker exec -it [containerName] bash
### Copy files from host to container
> docker cp filename [containerName]:pathToCopyTo
- e.g.: saving a file to the root directory in the container
  > docker cp file.sql mysql-docker:/
### Inspect Container
- see aditional detials about a specific container
> docker inspect [containerName]
### View all Container logs
> docker logs [containerName]
### List all internal networks
> docker network ls
## Create my own image
1. create a ```Dockerfile``` with the same name
2. write a set of instructions in the Dockerfile
    - everything on the left in caps is an instruction, everything on the right is an argument
      - ```FROM [app]```
        - app can be the OS or other apps like node
        - e.g.: latest ubuntu image
          > FROM Ubuntu
        - e.g.: specific ubuntu version image
          > FROM ubuntu:14.04
      - ```RUN [command]```
        - use to install and update dependencies
        - e.g.
          > RUN apt update
      - ```VOLUME ["/path1", "/path2", ...]```
        - define mountable directories
      - ```ADD file toThisFileAtThisDirectory```
        - add files
          > ADD notes.txt /notes.txt
      - ```ENV VARIABLE_NAME value```
        - set environment variables
          > ENV HOME /root
      - ```WORKDIR /path```
        - define working directory
          > WORKDIR /root
      - ```COPY host/path to/path```
        > COPY . /opt/source-code
      - ```ENTRYPOINT VAR_NAME=/app/path/with/filename [command]```
        > ENTRYPOINT EXPRESS_APP=/opt/source-code/index.js node start
      - ```HEALTHCHECK```
      - ```EXPOSE```
        - normally use to expose PORT
      - ```CMD command param1``` or ```CMD ["command", "param1"]```
        - define default command
          - e.g.:
            > CMD ["sleep", "5"]
        - parameters are optional
          > CMD ["bash"]
        - when running docker, commands will be automatically be called
          > docker run imageName
          - to change param1 value
            > docker run imageName command newParam1Value
          - if command is declared in the ENTRYPOINT, calling command is not required
            > docker run imageName newParam1Value
    - basic architecture
      ```
      FROMT Ubuntu
      RUN apt-get update && apt-get -y install python
      RUN pip install flask flask-mysql
      COPY . /opt/source-code
      ENTRYPOINT FLASK_APP=/opt/source-code/app.py flask run
      ```
    - basic app architecture
      ```
      FROM node
      WORKDIR /usr/src/app
      COPY package*.json ./
      RUN npm install
      COPY . .
      EXPOSE 4000
      CMD ["npm", "start"]
      ```
3. create a .dockerignore file (ignore if not required)
    ```
    node_modules
    npm-debug.log
    ```
4. build image
    > docker build -t imageName/appName .
5. push to docker hub registry to make image public
    > docker push imageName/appName
