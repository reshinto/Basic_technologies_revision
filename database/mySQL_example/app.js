const faker = require("faker");
const mysql = require("mysql");
let q, d;

// connect to MySql database
const connection = mysql.createConnection({
  host: "localhost",
  user: "springfield",
  password: process.env.mysqlme_password,
  database: "join_us",
  // insecureAuth : true,
});

// SELECTING and INSERTING data
// Run queries
function getResult(query, data=undefined, keys=undefined, table=undefined) {
  if (data === undefined) {
    connection.query(query, function(error, results, fields) {
      if (error) throw error;
      // return results => returns an array of objects
      // return results[0] => returns an object
      // return results[0].answer => returns a value
      console.log(results);
    });
  } else if (keys === undefined) {
    // data is an object of 1 user
    connection.query(query, data, function(error, results, fields) {
      if (error) throw error;
      console.log(results);
    });
  } else {
    // data is an arrary of user arrays
    query = `INSERT INTO ${table} (${keys.join(", ")}) VALUES ?`;
    connection.query(query, [data], function(error, results, fields) {
      if (error) throw error;
      console.log(results);
    });
  }
}

q = "select curtime() as time, curdate() as date, now() as now";
// getResult(q);

q = "SELECT * FROM users";
// getResult(q);



// INSERTING data
q = "INSERT INTO users SET ?";
d = {
  email: faker.internet.email(),
  created_at: faker.date.past()
};
// getResult(q, d);


// INSERTING multiple users
d = [];
for (let i=0; i<500; i++) {
  d.push([faker.internet.email(), faker.date.past()])
}
k = ["email", "created_at"]
getResult(q, d, k, "users");


// Find total number of users, don't use js length method
q = "SELECT COUNT(*) AS total FROM users"
getResult(q);


// required to close MySql server
connection.end();
