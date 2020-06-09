* Make sure all required libraries are installed and saved
* Heruku will npm install the requirements from the package.json

* Install heroku
    * Mac
        * brew install heroku/brew/heroku

* Login to heroku
    * heroku login
        * key in registered email and password if prompted
        * or follow instructions

* Make sure start script is included in package.json file
    * "start": "node app.js"
"scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node app.js"
  }
  * if the start script is not included, heroku will not run, and return an application error

* if using Node js
    * make sure app.listen is properly configured
        * app.listen(process.env.PORT, process.env.IP);


* make sure git is used
    * git init
    * git add .
    * git commit -m "initial commit"

* create heroku, add project name for custom url (https://projectName.herokuapp.com)
    * heroku create projectName

* push to heroku server
    * git push heroku master

* read error report
    * heroku logs

* view all folders and files
    * heroku run ls

* view files inside a folder
    * heroku run ls folderName

* if using mongodb, need to create new cluster at mongodb atlas
    * then change app.js settings
        * old: mongoose.connect("mongodb://localhost:27017/yelp_camp", {useNewUrlParser: true});
        * new: copy link given when connected to new cluster
            * change <password> to registered password
            * mongoose.connect("mongodb+srv://reshinto:<password>@cluster0-lyejj.mongodb.net/test?retryWrites=true", {useNewUrlParser: true});

* Set environment variables at Heroku dashboard
    * go to apps and select the app to modify
        * click settings
            * at "Config Vars", click "Reveal Config Vars"
                * input the KeyVariable
                    * variable used to call databse url
                * input the Value
                    * database url
* another way to set environment variable at Heroku through terminal
    * heroku config:set myKey=myValue
* View all configs
  * heroku config
* Get environment variable value
    * heroku config:get myKey

* Run Bash in heroku
  * heroku run bash
