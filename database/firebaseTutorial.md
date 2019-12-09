# Firebase setup guide
## Create firebase project
1. login at firebase
```
https://firebase.google.com/
```
2. click "Go to console"
3. click "Add project"
4. Enter project name, then click "continue", then click "create project"
## Get Started
1. Click on "Functions" -> click "Get Started" button
2. Install firebase tools
```
npm install -g firebase-tools
```
3. Login to firebase
```
firebase login
```
4. Create new project folder
```
mkdir new_project_name
cd new_project_name
```
5. Initialize project
```
firebase init
```
* yes (to proceed)
* select Functions by pressing space
* select Use an existing project (created at firebase website)
4. Deploy project
```
firebase deploy
```
## Run server locally
```
firebase serve
```
## Create database
1. click on "Database" -> click on "Create database" button
2. select "Start in test mode" -> select region for cloud firebase locatoin -> click "Done"
## Create collection (similar to table)
1. At database, click on "Start collection"
2. Enter the name of the new collection
* objects are maps, nested maps and arrays are possible
## Create endpoints
```javascript
const admin = require("firebase-admin");
admin.initializeApp();

// Use express for the following instead

// Read
exports.getData = functions.https.onRequest((req, res) => {
  if (req.method !== "GET") {
    return res.status(400).json({error: "Invalid request method!"});
  }
  admin.firestore().collection("nameOfCollection").get()
    .then(datas => {
      // let dataArr = [];
      let dataObj;
      datas.forEach(eachData => {
        // dataArr.push(eachData.data());
        dataObj = eachData.data();
      });
      // return res.json(dataArr);
      return res.json(dataObj)
    })
    .catch(err => console.error(err));
});

// Create
exports.createData = functions.https.onRequest((req, res) => {
  if (req.method !== "POST") {
    return res.status(400).json({error: "Invalid request method!"});
  }
  const newData = req.body;
  admin.firestore()
    .collection("nameOfCollection")
    .add(newData)
    .then(data => {
      return res.json({message: `Document ${data.id} created successfully!`});
    })
    .catch(err => {
      res.status(500).json({error: "New project category creation failed!"});
      console.error(err);
    });
});
```
## Use express to manage routes
```javascript
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();

// Read
app.get("/data", (req, res) => {
  admin.firestore().collection("nameOfCollection").get()
    .then(datas => {
      // let dataArr = [];
      let dataObj;
      datas.forEach(eachData => {
        // dataArr.push(eachData.data());
        dataObj = eachData.data();
      });
      // return res.json(dataArr);
      return res.json(dataObj)
    })
    .catch(err => console.error(err));
});

// Create
app.post("/data", (req, res) => {
  const newData = req.body;
  admin.firestore()
    .collection("nameOfCollection")
    .add(newData)
    .then(data => {
      return res.json({message: `Document ${data.id} created successfully!`});
    })
    .catch(err => {
      res.status(500).json({error: "New document creation failed!"});
      console.error(err);
    });
});

// enable multiple routes at 1 end point
exports.api = functions.https.onRequest(app);
// change region with the following
// exports.api = functions.region("asia-east2").https.onRequest(app);
```
## Enable Authentication
1. click on "Authentication"
2. under "Users" tab, click on "Set up sign-in method" button
3. For default, enable the Email/Password, then click "Save" button
4. Go to project Overview -> click on "Project settings"
5. under "Your apps", click on "</>"
6. Create a new web app if none is available, enter app name -> click on "Register app"
7. Copy the config settings and save it in a .env file
```
api_key = "zfdbzdfbz"
auth_domain = "some-server-4q4t.firebaseapp.com"
database_url = "https=//some-server-4q4t.firebaseio.com"
project_id = "some-server-4q4t"
storage_bucket = "some-server-4q4t.appspot.com"
messaging_sender_id = "q4tq43t3543t"
app_id = "1=140213q43rq34r=web=8q4rq34rq34r43"
measurement_id = "G-6GVNEGSG43"
```
* retrieve env variables in config.js
```javascript
module.exports = {
  apiKey: process.env.api_key,
  authDomain: process.env.auth_domain,
  databaseURL: process.env.database_url,
  projectId: process.env.project_id,
  storageBucket: process.env.storage_bucket,
  messagingSenderId: process.env.messaging_sender_id,
  appId: process.env.app_id,
  measurementId: process.env.measurement_id
};
```
* import and initialize firebase app in index.js
```javascript
// use dotenv for localhost
// require('dotenv').config()
const firebase = require("firebase");
const config = require("./config");
firebase.initializeApp(config);
```
8. Install firebase (a client library) in functions folder to enable authentication
```
npm i firebase
```
9. Create signup route
```javascript
app.post("/signup", (req, res) => {
  const newUser = {
    email: req.body.email,
    password: req.body.password,
    confirmPassword: req.body.confirmPassword,
    username: req.body.username
  };
  firebase.auth().createUserWithEmailAndPassword(newUser.email, newUser.password)
    .then(data => {
      return res.status(201).json({
        message: `User ${data.user.uid} signed up successfully!`
      });
    })
    .catch(err => {
      console.error(err);
      return res.status(500).json({error: err.code});
    });
});
```
