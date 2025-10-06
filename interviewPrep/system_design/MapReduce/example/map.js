const mapReduce = require("./map_reduce");

function map(text) {
  const lines = text.split("\n");
  for (const line of lines) {
    const latency = parseInt(line);
    if (latency < 10000) {
      mapReduce.emitMapResult("under_10_seonds", 1);
    } else {
      mapReduce.emitMapResult("over_10_seconds", 1);
    }
  }
}

const mapInput = mapReduce.getMapInput("latencies.txt");
map(mapInput);
