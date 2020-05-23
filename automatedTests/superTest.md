# SuperTest for testing the server
## Installation
- Install and setup [mocha & chai, and babel](https://github.com/reshinto/Basic_technologies_revision/blob/master/automatedTests/mochaAndChai.md)
- Install the server framework such as [Express](https://expressjs.com/)
> npm i express
- Install [supertest](https://github.com/visionmedia/supertest#readme)
> npm i --save-dev supertest
- Enable Async/Await support, Mocha does not support this by default
  - Install [regenerator-runtime](https://github.com/facebook/regenerator/tree/master/packages/regenerator-runtime) library
  > npm i --save-dev regenerator-runtime
## Setup
- Create a ```mocha-setup.js``` file
  - need to import regenerator-runtime library before running any test with the following content
  ```javascript
  import "regenerator-runtime/runtime";
  ```
  - add the file to the scripts in the ```package.json``` file
  ```
  "scripts": {
    "test": "npx mocha 'test/**/*.test.js' --recursive --require @babel/register --file mocha-setup.js"
  }
  ```
### run test automatically
- add ```-watch``` into the script in the package.json file
```
"scripts": {
  "test": "npx mocha 'test/**/*.test.js' --recursive --require @babel/register --file mocha-setup.js -watch"
},
```
