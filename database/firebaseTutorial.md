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
```
## Use express to manage routes
```javascript
const admin = require("firebase-admin");
admin.initializeApp();
const express = require("express");
const app = express();

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

// enable multiple routes at 1 end point
exports.api = functions.https.onRequest(app);
```
