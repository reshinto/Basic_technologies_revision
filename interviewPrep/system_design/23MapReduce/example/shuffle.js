const fs = require("fs");

const HOSTS = process.env.HOSTS.split(",");

for (const host of HOSTS) {
  const fileNames = fs.readdirSync(`${host}/map_results`, "utf-8");
  for (const fileName of fileNames) {
    const key = fileName.split(".")[0];
    const contents = fs.readFileSync(
      `${host}/map_results/${fileName}`,
      "utf-8",
    );
    fs.appendFileSync(`map_results/${key}.txt`, contents);
  }
}
