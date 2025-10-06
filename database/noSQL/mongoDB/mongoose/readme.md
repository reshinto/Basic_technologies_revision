# Mongoose

- it is a mongodb object modeling for nodejs
- provides a straight-forward, schema-based solution to model your application data
- it includes built-in type casting, validation, query building, business logic hooks and etc.

## Getting started

- will be very hard to use this with typescript

```javascript
const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/test");

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", function () {
  // we're connected!
});
```

## Schema

```javascript
const kittySchema = mongoose.Schema({
  name: String,
});

// add methods, but must be added to the schema before compiling it with mongoose.model()
kittySchema.methods.speak = function () {
  const greeting = this.name
    ? "My name is " + this.name
    : "I don't have a name";
  console.log(greeting);
};
```

## Model

- it is a class where we construct documents

```javascript
const Kitten = mongoose.model("Kitten", kittySchema);

const silence = new Kitten({name: "Silence"});
console.log(silence.name); // Silence

silence.speak(); // My name is Silence
```

## Saving to database

- each document can be saved to the database by calling its save method
- the first argument to the callback will be an error if any occured

```javascript
silence.save((err, silence) => {
  if (err) return console.error(err);
  silence.speak();
});
```

## Access all specific documents through model

```javascript
Kitten.find((err, kittens) => {
  if (err) return console.error(err);
  console.log(kittens);
});

Kitten.find({name: /^Silence/}, callback);
```
