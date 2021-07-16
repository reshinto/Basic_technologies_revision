# GraphQL
- created at Facebook in 2012
- it is a declarative data fetching specification & query language
  - used to get data from server to client
- can use many languages to build a graph server
## Benefits of using GraphQL
- it defines the shape of the desired data and calls for it once
  - this helps to avoid multiple rest calls and the performance problems of over and under fetching
- it is backward compatible and version-free
  - means that one can add new fields to an existing GraphQL server without breaking the current clients
    - old fields can be deprecated and yet still can continue to function
- can be used to wrap around existing API
  - so that one don't have to set up everything from scratch & use it as part of the existing setup
- it is language agnostic
  - can implement GraphQL solutions in a range of different languages
## Syntax
### writing comments
```graphql
# comment
```
### Queries
#### Basic queries
```graphsql
{
  viewer {
    id
  }
}
```
```json
{
  "data": {
    "viewer": {
      "id": "efhyubVgvkywdUBUYGGB"
    }
  }
}
```
#### Multiple fields
```graphql
{
  viewer {
    id
    bio
    name
    company
  }
}
```
```json
{
  "data": {
    "viewer": {
      "id": "HJBHJssjkbdLJHBHJB",
      "bio": "some description about myself",
      "name": "Myname",
      "company": null
    }
  }
}
```
#### Parsing argument
- when parsing argument value, must use double quotes
- single argument
```graphql
{
  repositoryOwner(login: "myusername") {
    id
    url
  }
}
```
```json
{
  "data": {
    "repositoryOwner": {
      "id": "hlbBHKBbhbdhbBLHB",
      "url": "https://github.com/myusername"
    }
  }
}
```
- multiple arguments
```graphql
{
  repository(name: "graphql", owner: "facebook") {
    id
  }
}
```
```json
{
  "data": {
    "repository": {
      "id": "MDEwOlJlcG9zaXRvcnkzODM0MjIyMQ=="
    }
  }
}
```
#### Required argument
- if missing an error will be shown
```graphql
{
  repository(name: "graphql") {
    id
  }
}
```
```json
{
  "errors": [
    {
      "path": [
        "query",
        "repository"
      ],
      "extensions": {
        "code": "missingRequiredArguments",
        "className": "Field",
        "name": "repository",
        "arguments": "owner"
      },
      "locations": [
        {
          "line": 2,
          "column": 2
        }
      ],
      "message": "Field 'repository' is missing required arguments: owner"
    }
  ]
}
```
## Schemas
- the way the fields are setup in graphQL is determined by the schemas
- it provides sll the object types used in the data
  - it also specifies the types for all the values
### Input Types
- Integer
- Float
- String
- Boolean
- Null
- Enum
- List
- Object
### Query ```__schema```
```graphql
{
  __schema {
    queryType {
      name
      description
      fields {
        name
        description
      }
    }
  }
}
```
```json
{
  "data": {
    "__schema": {
      "queryType": {
        "name": "Query",
        "description": "The query root of GitHub's GraphQL interface.",
        "fields": [
          {
            "name": "codeOfConduct",
            "description": "Look up a code of conduct by its key"
          },
          {
            "name": "codesOfConduct",
            "description": "Look up a code of conduct by its key"
          },
          ...,
          {
            "name": "viewer",
            "description": "The currently authenticated user."
          }
        ]
      }
    }
  }
}
```
### Query ```__type```
```graphql
{
  __type(name: "Repository") {
    kind
    name
    description
  }
}
```
```json
{
  "data": {
    "__type": {
      "kind": "OBJECT",
      "name": "Repository",
      "description": "A repository contains the content for a project."
    }
  }
}
```
