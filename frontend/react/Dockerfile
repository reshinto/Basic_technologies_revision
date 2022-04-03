FROM node

RUN apt-get update && apt-get install -y vim git

WORKDIR /usr/src

RUN npx create-react-app app

WORKDIR /usr/src/app

RUN yarn add redux react-redux redux-thunk react-router-dom redux-devtools-extension

EXPOSE 3000

CMD ["yarn", "start"]
