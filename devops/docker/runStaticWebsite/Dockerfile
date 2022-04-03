FROM ubuntu

RUN apt-get update
RUN apt-get install nginx -y
RUN apt-get install git -y

RUN rm -rf /var/www/html

RUN cd /var/www && git clone --single-branch --branch master https://github.com/reshinto/reshinto.github.io.git
RUN cd /var/www && mv reshinto.github.io html

EXPOSE 80

CMD ["nginx","-g","daemon off;"]
