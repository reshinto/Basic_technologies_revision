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

## mongo uses the language called BSON (Binary JavaScript Object Notation)

### help
* display a list of basic features

### show dbs
* display all databases that was created

### use databaseName
* e.g.: use demo
* all "db" called will be refered to demo database
* use the database
* database not created will be added into collections
* but will not be display in "show dbs" until some data is added


## CRUD

## CREATE
Add 1 Collection
### db.dataName.insertOne({key: "value"})
* e.g.: db.dogs.insertOne({name: "Rusty", breed: "Mutt"})
* dataName is a collection
* add data into database
* "db" is the database declared with use databaseName

## Add multiple Collections
### db.dataName.insertMany([{key1: "value1"}, {key2: "value2"}])
* e.g.: db.dogs.insertMany([{name: "Rusty", breed: "Mutt"}, {name: "Bob", breed: "dog"}])
* add data into database

## Add 1 or multiple collections
### db.dataName.insert({key: "value"})
* e.g.: db.dogs.insert({name: "Rusty", breed: "Mutt"})
### db.dataName.insert([{key1: "value1"}, {key2: "value2"}])
* e.g.: db.dogs.insert([{name: "Rusty", breed: "Mutt"}, {name: "Bob", breed: "dog"}])

### db.createCollection("dataName")
* e.g.: db.createCollection("dogs")
* similar to insert but does not require data

### show collections
* display data added


## READ
### db.dataName.find()
### db.dataName.find({})
* find all data keys and values under dataName

### db.dataName.find({key: "value"})
* e.g.: db.dogs.find({name: "Rusty"})
* find a specific data key and value under dataName
### db.dataName.find({key1: "value1", key2: "value2"})
* retrieve data that has all of the searched values
### db.dataName.find({$ord: [{key1, "value1"}, {key2: "value2"}]})
* retrieve data that has either "value1" or "value2"
### db.dataName.find({key: {$gt: n}})
* display values in comparison to n
* gt = greater than n
* lt = less than n
* eq = equal to n
* gte = greate than or equal to n
* lte = less than or equal to n
### db.dataName.find({key: {$in: ["value1", "value2"]}})
* display all data(s) that consist of the value in the array["value1", "value2"]
* nin == not in (inverse of in)
### db.dataName.find({key: {$exists: n}})
* if n == true, show all data that has the key field
* if n == false, show all data that does not have the key field

### db.dataName.find({}, {_id: n})
* if n == 0, display everything except id
* if n == 1, display only id

### db.dataName.find().limit(n)
* e.g.: db.dogs.find().limit(2)
* limit search results by n

### db.dataName.find().sort({key: n})
* if n == 1, sort by ascending order
* if n == -1, sort by descending order
### db.dataName.find().sort({key1: n1, key2: n2})
* sort by multiple fields
* sort by key1 then by key2


## UPDATE
### db.dataName.updateOne({key: "value"}, {changeKey: "changeValue"})
### db.dataName.replaceOne({key: "value"}, {changeKey: "changeValue"})
* e.g.: db.dogs.updateOne({name: "Rusty"}, {breed: "Labradoodle"})
* key and value required to find the position to change
* this will rewrite everything to just {breed: "Labradoodle"} without the name object
### db.dataName.updateOne({key, "value"}, {$set: {changeKey: "changeValue", addKey: addValue}})
### db.dataName.update({key, "value"}, {$set: {changeKey: "changeValue", addKey: addValue}})
* e.g.: db.dogs.updateOne({name: "Rusty"}, {$set: {breed: "Labradoodle", isCute: true}})
* use $set: {} to ensure data that aren't called will not be deleted
* this can be used to update and add new key value pair
* this will only update ONE data object in collection
    * need to run multiple times to update all
### db.dataName.updateMany({key, "value"}, {$set: {changeKey: "changeValue", addKey: addValue}})
* this will update ALL data objects in collection
### db.dataName.update({key, "value"}, {$set: {changeKey: "changeValue", addKey: addValue}, {multi: true}})
* need to add {multi: true} to enable multiple updates


## REMOVE (Delete value(s))
### db.dataName.remove({key: "value"}, true)
* justOne parameter need to set as true to delete only 1 value
### db.dataName.deleteOne({key: "value"})
* delete 1 value
### db.dataName.remove({key: "value"})
### db.dataName.deleteMany({key: "value"})
* e.g.: db.dogs.remove({breed: "Labradoodle"})
* this will remove all dogs that has the same breed value

### db.dataName.remove({key: "value"}).limit(n)
* e.g.: db.dogs.remove(breed: "Labradoodle").limit(1)
* limit n number of data to remove

## Delete collection
### db.dataName.drop()
* e.g.: db.dogs.drop()

## Delete database
### db.dropDatabase()
* thi will delete the currently used database


## BULKWRITE
### db.dataName.bulkWrite(
      [
          {insertOne:
              {"document": {key1: "value1", key2: "value2"}}
          },
          {updateOne:
              {
                  filter: {key: "value"},
                  update: {$set: {changekey: "changeValue"}}
              }
          },
          {deleteOne:
              {filter: {key: "value"}}
          }
      ])
* enables multiple requests in ONE request


## SEARCH
### db.dataName.createIndex({key1: "text", key2: "text"})
* provide text indexes to enable text search queries on string content

### db.dataName.find({$text: {$search: "searchText1 searchText2"}})
* $text query operator is required
* $search operator required to start searching
* key in the search contents
* add - in front of searchText to exclude from search e.g.: -searchText1
### db.dataName.find({$text: {$search: "\"search phrase\""}})
* use \" to enable search by phrase

## Get search scores
### db.dataName.find({$text: {$search: "searchText"}, {score: {$meta: "textScore"}}})
* need to add 1 score object to enable search rankings
* search rankings enable sorting if required
* $meta projection operator returns for each matching document the metadata


## AGGREGATION

## Count
### db.dataName.count({key: "value"})
* this will count the total number of values that is in the data collection

## List all values
### db.dataName.distinct("key")
* display a list of values under key

## Find the sum of values under key for each id key
### db.dataName.aggregate([
      {$match: {key: "value"}},
      {$group: {_id: "$idKey1", total: {$sum: "$idKey2"}}}
  ])
* $match operator is used to filter data in collection
    * use {} to search all
* $group is used to group similar idKey1 together
    * $ is added in front of idKey1 to group them as a single unit
    * idKey1 refers to the key in the data to group similar values together
* $sum gives the total sum of all the values given from idKey2
    * idKey2 refers to the key in the data to get all the different values
# db.dataName.aggregate([
      {$match: {key: "value"}},
      {$group: {_id: "$idKey1", total: {$sum: "$idKey2"}}},
      {$sort: {total: n}}
  ])
* return value can be sorted by adding {$sort: {total: n}}
    * if n == 1, sort in ascending order
    * if n == -1, sort in descending order


DATA TYPES
{
    string: "string",
    int: 123,
    double: 1.23,
    boolean: true,
    array: [1, 2, 3],
    object: {key1: "value1", key2: "value2"},
    date: new Date("<YYYY-mm-dd>"),
    object_id: <ObjectId>,
    no_value: null
}

## ADDITIONAL DATA TYPES
---------------------
Timestamp, Binary data, Regular expressions, javascript code
