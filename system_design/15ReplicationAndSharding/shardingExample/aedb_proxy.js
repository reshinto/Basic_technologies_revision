const axios = require("axios");
const express = require("express");

const SHARD_ADDRESSES = ["http://localhost:3000", "http://localhost:3001"];
const SHARD_COUNT = SHARD_ADDRESSES.length;

const app = express();
app.use(express.json());

// sharding strategy
function getShardEndpoint(key) {
  const shardNumber = key.charCodeAt(0) % SHARD_COUNT;
  const shardAddress = SHARD_ADDRESSES[shardNumber];
  return `${shardAddress}/${key}`;
}

app.post("/:key", (req, res) => {
  const shardEndpoint = getShardEndpoint(req.params.key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  axios.post(shardEndpoint, req.body)
    .then((innerRes) => {
      res.send();
    });
});

app.get("/:key", (req, res) => {
  const shardEndpoint = getShardEndpoint(req.params.key);
  console.log(`Forwarding to: ${shardEndpoint}`);
  axios.get(shardEndpoint)
    .then((innerRes) => {
      if (innerRes.data === null) {
        res.send("null");
        return;
      }
      res.send(innerRes.data);
    });
});

app.listen(8000, () => {
  console.log("Listening on port 8000!");
});
