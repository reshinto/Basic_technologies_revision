# Sharding example

## How to use

- Install all dependencies
  > `npm i`
- open 4 terminals

## Create and run Shard 0 database

> `DATA_DIR=aedb_data_0 PORT=3000 node aedb.js`

## Create and run Shard 1 database

> `DATA_DIR=aedb_data_1 PORT=3001 node aedb.js`

## Run reverse proxy

> `node aedb_proxy.js`

## add data to database

> `curl --header 'Content-Type: application/json' --data '{"data": "This is some data."}' localhost:8000/a`

    - ```a``` is the key parameter
    - due to the hashing function logic, data will be stored in shard 1

> `curl --header 'Content-Type: application/json' --data '{"data": "This is some data."}' localhost:8000/b`

    - due to the hashing function logic, data will be stored in shard 0

## Retrieve data from database

- retrieve from shard 0
  > `curl -w "\n" localhost:8000/a`
- retrieve from shard 1
  > `curl -w "\n" localhost:8000/b`
