#!/bin/sh
# chmod a+x ./build.sh
# remove sudo if not required

sudo docker build -t portfolio .
sudo docker run -d -p 80:80 --name portfolio --restart unless-stopped portfolio
