const express = require("express");
const app = express();

app.listen(3001, () => console.log("Listening on port 3001"));

app.get("/hello", (req, res) => {
  console.log(req.headers);
  res.send("Hello.\n");
});
