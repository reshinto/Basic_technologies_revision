# Getting started guide to setting up mongodb
* go to root folder in app
1. mkdir data
2. mkdir data/db
3. run: mongod --dbpath /myapp/data/db
* leave it running when working with database

# for debugging
* open a new terminal and open a mongo shell
* run: mongo
* or run : mongo --host localhost:27017
    * 27017 is the default port mongodb uses

# for graphical interface
* open MongoDB Compass Community
* ensure server is already run with mongod (refer to the above)
* no settings is required, just click the connect button
