#!/bin/sh
# chmod a+x ./rebuild.sh
# remove sudo if not required

sudo docker stop portfolio
sudo docker rm portfolio
sudo docker rmi portfolio
sudo docker build -t portfolio .
sudo docker run -d -p 80:80 --name portfolio --restart unless-stopped portfolio
