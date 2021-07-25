#!/bin/sh
# chmod a+x ./rebuild.sh

sudo docker stop jenkins
sudo docker rm jenkins
sudo docker rmi jenkins/jenkins
sudo rm -rf ~/jenkins_home
sudo docker pull jenkins/jenkins:lts-jdk11
sudo docker run -d -u 0 -p 8080:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home --name jenkins --restart unless-stopped jenkins/jenkins:lts-jdk11
sudo docker exec jenkins cat var/jenkins_home/secrets/initialAdminPassword
