# SuperTest for testing the server (incomplete)

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

- Create a `mocha-setup.js` file
  - need to import regenerator-runtime library before running any test with the following content
  ```javascript
  import "regenerator-runtime/runtime";
  ```
  - add the file to the scripts in the `package.json` file
  ```
  "scripts": {
    "test": "npx mocha 'test/**/*.test.js' --recursive --require @babel/register --file mocha-setup.js"
  }
  ```

### run test automatically

- add `-watch` into the script in the package.json file

```
"scripts": {
  "test": "npx mocha 'test/**/*.test.js' --recursive --require @babel/register --file mocha-setup.js -watch"
},
```

## Test example

### database

- create a `db.js` and a `db.test.js` file
- in the `db.test.js` file fill in the default template

```javascript
import {expect} from "chai";
import {getUserByUsername} from "../src/db.js";

describe("getUserByUsername", () => {
  it("get the correct user from the database given a username", async () => {});
});
```

#### mongodb

> npm i mongodb

- ensure mongodb is running before testing
  > mongod --dbpath ./TEST_DB

```javascript
import {MongoClient} from "mongodb";
import {expect} from "chai";
import {getUserByUsername} from "../src/db.js";

describe("getUserByUsername", () => {
  it("get the correct user from the database given a username", async () => {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/TEST_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db("TEST_DB");

    // write tests here

    client.close();
  });
});
```

- add fake data (1 data that we want, and 1 data that we do not want)

```javascript
import {MongoClient} from "mongodb";
import {expect} from "chai";
import {getUserByUsername} from "../src/db.js";

describe("getUserByUsername", () => {
  it("get the correct user from the database given a username", async () => {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/TEST_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db("TEST_DB");

    // add fake data
    const fakeData = [
      {
        // data that we want
        id: "123",
        username: "abc",
        email: "abc@gmail.com",
      },
      {
        // data that we do not want
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
    ];

    // write tests here

    client.close();
  });
});
```

- insert fake data to the database

```javascript
import {MongoClient} from "mongodb";
import {expect} from "chai";
import {getUserByUsername} from "../src/db.js";

describe("getUserByUsername", () => {
  it("get the correct user from the database given a username", async () => {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/TEST_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db("TEST_DB");

    // add fake data
    const fakeData = [
      {
        // data that we want
        id: "123",
        username: "abc",
        email: "abc@gmail.com",
      },
      {
        // data that we do not want
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
    ];

    // insert fake data
    await db.collection("users").insertMany(fakeData);

    // write tests here

    client.close();
  });
});
```

- write test

```javascript
import {MongoClient} from "mongodb";
import {expect} from "chai";
import {getUserByUsername} from "../src/db.js";

describe("getUserByUsername", () => {
  it("get the correct user from the database given a username", async () => {
    const client = await MongoClient.connect(
      "mongodb://localhost:27017/TEST_DB",
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );

    const db = client.db("TEST_DB");

    // add fake data
    const fakeData = [
      {
        // data that we want
        id: "123",
        username: "abc",
        email: "abc@gmail.com",
      },
      {
        // data that we do not want
        id: "124",
        username: "wrong",
        email: "wrong@wrong.com",
      },
    ];

    // insert fake data
    await db.collection("users").insertMany(fakeData);

    // write tests here
    const actual = await getUserByUsername("abc");
    const finalDBState = await db.collection("users").find().toArray();
    // need to drop database to prevent it from affecting other tests
    await db.dropDatabase(); // need to call this here instead of after the assertion is because if any of the assertions fail, the drop database function after it would not be executed
    client.close();

    const expected = {
      id: "123",
      username: "abc",
      email: "abc@gmail.com",
    };

    expect(actual).to.deep.equal(expected);
    expect(finalDBState).to.deep.equal(fakeData); // check to make sure final db state = to the initial db state, & make sure the function that we are testing did not harm the db in anyway
  });
});
```
