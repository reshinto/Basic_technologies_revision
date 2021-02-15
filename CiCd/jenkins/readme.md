# Jenkins
## Installation
### Mac
- ```brew install jenkins-lts```
### Docker
#### Install jenkins image
- ```docker pull jenkins/jenkins:lts```
#### Create new container
- ```docker run -d -p 8080:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts```
#### Get default admin password
- ```docker exec -it jenkins bash```
  - ```docker exec jenkins cat adminPasswordFilePathProvided```
## How to run
### Mac
#### Start Jenkins server
- ```brew services start jenkins-lts```
#### Stop Jenkins server
- ```brew services stop jenkins-lts```
#### View server
- ```http://localhost:8080/```
  - paste admin password that was auto generated if first time setting up
## First time setup
1. Click on ```Install suggested plugins```
2. Create admin account
