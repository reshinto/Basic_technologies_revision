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

- graphql query

```graphql
// method 1: similar to anonymous function
{
  viewer {
    id
  }
}

// method 2: makes it easier to find but does not have a unique name
query {
  viewer {
    id
  }
}

// method 3: Set operation names to all easy finding as names are unique
query SomeUniqueName {
  viewer {
    id
  }
}
```

- json result

```json
{
  "data": {
    "viewer": {
      "id": "efhyubVgvkywdUBUYGGB"
    }
  }
}
```

#### Variable definitions

```graphql
query SomeUniqueName($myVariable: String!) {
  organization(login: $myVariable) {
    id
  }
}
```

- query variables

```
{
  "myVariable": "facebook"
}
```

```json
{
  "data": {
    "organization": {
      "id": "MDEyOk9yZ2FuaXphdGlvbjY5NjMx"
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
      "path": ["query", "repository"],
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

#### Aliases

- not using aliases with conflicting arguments will result with an error

```graphql
{
  repository(name: "graphql", owner: "facebook") {
    id
    description
    homepageUrl
  }
  repository(name: "react", owner: "facebook") {
    id
    description
    homepageUrl
  }
}
```

```json
{
  "errors": [
    {
      "path": [],
      "extensions": {
        "code": "fieldConflict",
        "fieldName": "repository",
        "conflicts": "{name:\"\\\"graphql\\\"\",owner:\"\\\"facebook\\\"\"} or {name:\"\\\"react\\\"\",owner:\"\\\"facebook\\\"\"}"
      },
      "locations": [
        {
          "line": 2,
          "column": 3
        },
        {
          "line": 5,
          "column": 3
        }
      ],
      "message": "Field 'repository' has an argument conflict: {name:\"\\\"graphql\\\"\",owner:\"\\\"facebook\\\"\"} or {name:\"\\\"react\\\"\",owner:\"\\\"facebook\\\"\"}?"
    }
  ]
}
```

- Use Aliases to solve the error

```graphql
{
  graphqlProject: repository(name: "graphql", owner: "facebook") {
    id
    description
    homepageUrl
  }
  reactProject: repository(name: "react", owner: "facebook") {
    id
    description
    homepageUrl
  }
}
```

```json
{
  "data": {
    "graphqlProject": {
      "id": "MDEwOlJlcG9zaXRvcnkzODM0MjIyMQ==",
      "description": "GraphQL is a query language and execution engine tied to any backend service.",
      "homepageUrl": "https://spec.graphql.org"
    },
    "reactProject": {
      "id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
      "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      "homepageUrl": "https://reactjs.org"
    }
  }
}
```

#### Fragments

- they are reusable sets of fields that can be included in queries as needed to prevent repetition

```graphql
{
  graphqlProject: repository(name: "graphql", owner: "facebook") {
    ...repoFields
  }
  reactProject: repository(name: "react", owner: "facebook") {
    ...repoFields
  }
}

fragment repoFields on Repository {
  id
  description
  homepageUrl
}
```

```json
{
  "data": {
    "graphqlProject": {
      "id": "MDEwOlJlcG9zaXRvcnkzODM0MjIyMQ==",
      "description": "GraphQL is a query language and execution engine tied to any backend service.",
      "homepageUrl": "https://spec.graphql.org"
    },
    "reactProject": {
      "id": "MDEwOlJlcG9zaXRvcnkxMDI3MDI1MA==",
      "description": "A declarative, efficient, and flexible JavaScript library for building user interfaces.",
      "homepageUrl": "https://reactjs.org"
    }
  }
}
```

#### Nested fields

```graphql
{
  viewer {
    id
    name
    isEmployee
    location
    databaseId
    repositories(first: 3) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "viewer": {
      "id": "MDQ6VXNlcjM1MDQyMjEz",
      "name": "Terence",
      "isEmployee": false,
      "location": null,
      "databaseId": 35042213,
      "repositories": {
        "edges": [
          {
            "node": {
              "id": "MDEwOlJlcG9zaXRvcnkxMjExNDE5MzY=",
              "name": "alarm-volume-control"
            }
          },
          {
            "node": {
              "id": "MDEwOlJlcG9zaXRvcnkxMjgyMDY0ODM=",
              "name": "Rock-Paper-Scissors"
            }
          },
          {
            "node": {
              "id": "MDEwOlJlcG9zaXRvcnkxMjgzOTQzNjc=",
              "name": "Hackerrank-Solutions"
            }
          }
        ]
      }
    }
  }
}
```

#### Multiple nested fields

```graphql
{
  repository(owner: "github", name: "opensource.guide") {
    id
    name
    description
    watchers(first: 3) {
      edges {
        node {
          id
          name
          company
        }
      }
    }
    pullRequests(last: 2) {
      edges {
        node {
          id
          author {
            avatarUrl
            login
            resourcePath
          }
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "repository": {
      "id": "MDEwOlJlcG9zaXRvcnk2MTIwNDgxOA==",
      "name": "opensource.guide",
      "description": "📚 Community guides for open source creators",
      "watchers": {
        "edges": [
          {
            "node": {
              "id": "MDQ6VXNlcjEwODcy",
              "name": "TAKAGI Masahiro",
              "company": null
            }
          },
          {
            "node": {
              "id": "MDQ6VXNlcjMwNDA4",
              "name": "Dirk Brünsicke",
              "company": "bruensicke.com"
            }
          },
          {
            "node": {
              "id": "MDQ6VXNlcjQwNDE1",
              "name": "Mike Linksvayer",
              "company": "☃"
            }
          }
        ]
      },
      "pullRequests": {
        "edges": [
          {
            "node": {
              "id": "MDExOlB1bGxSZXF1ZXN0Njg4NjMzNTE2",
              "author": {
                "avatarUrl": "https://avatars.githubusercontent.com/u/86223196?v=4",
                "login": "maxius122-bit",
                "resourcePath": "/maxius122-bit"
              }
            }
          },
          {
            "node": {
              "id": "MDExOlB1bGxSZXF1ZXN0Njg4NjM0OTQ1",
              "author": {
                "avatarUrl": "https://avatars.githubusercontent.com/u/86223196?v=4",
                "login": "maxius122-bit",
                "resourcePath": "/maxius122-bit"
              }
            }
          }
        ]
      }
    }
  }
}
```

#### Pagination

- first, last, states can be used to filter the data

```graphql
# (first: 5)
# (last: 3)

{
  repository(name: "graphql", owner: "facebook") {
    id
    issues(last: 5, states: OPEN) {
      edges {
        node {
          id
          number
          title
        }
      }
    }
  }
}
```

```json
{
  "data": {
    "repository": {
      "id": "MDEwOlJlcG9zaXRvcnkzODM0MjIyMQ==",
      "issues": {
        "edges": [
          {
            "node": {
              "id": "MDU6SXNzdWU4NzMxNzU4MTI=",
              "number": 862,
              "title": "Meta-Fields Defined by Schema Authors"
            }
          },
          {
            "node": {
              "id": "MDU6SXNzdWU4NzYwNzYyODQ=",
              "number": 864,
              "title": "Explicitly state in spec that full introspection output is equivalent to full SDL document"
            }
          },
          {
            "node": {
              "id": "MDU6SXNzdWU4Nzc3NjEzNTQ=",
              "number": 866,
              "title": "Execute fragments directly"
            }
          },
          {
            "node": {
              "id": "MDU6SXNzdWU4ODAyNjEzNTE=",
              "number": 867,
              "title": "[Strawman] Provide a non-null designator in GraphQL operations"
            }
          },
          {
            "node": {
              "id": "MDU6SXNzdWU4OTg4OTY4NzQ=",
              "number": 872,
              "title": "Optional v. Nullable input redux"
            }
          }
        ]
      }
    }
  }
}
```

### Mutations

- Data modifications are made with mutations
- Similar to PUT or DELETE in REST
- data is sent as a payload
- GraphQL changes the dataset behind the schema
- API defines which mutations are allowed

#### Create mutations

```graphql
mutation NewComment($input: AddCommentInput!) {
  addComment(input: $input) {
    clientMutationId
    subject {
      id
    }
  }
}
```

- query variables

```
{
  "input": {
    "clientMutationId": "123456",
    "subjectId": "NININIWDNEUBNFIUuinife",
    "body": "mutation has occured"
  }
}
```

- json result (shows that a new comment has been added to the issue of the repository)

```json
{
  "data": {
    "addComment": {
      "clientMutationId": "123456",
      "subject": {
        "id": "MDU6SXNzdWU5NDY1MjM3MTM="
      }
    }
  }
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

### Query `__schema`

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

- sample schema in the docs

```
marketplaceCategories(
excludeEmpty: Boolean
excludeSubcategories: Boolean
includeCategories: [String!]  # ! means value is required
): [MarketplaceCategory!]!
Get alphabetically sorted list of Marketplace categories

marketplaceCategory(slug: String!useTopicAliases: Boolean): MarketplaceCategory
Look up a Marketplace category by its slug.

marketplaceListing(slug: String!): MarketplaceListing
Look up a single Marketplace listing

marketplaceListings(
adminId: ID
after: String
allStates: Boolean
before: String
categorySlug: String
first: Int
last: Int
organizationId: ID
primaryCategoryOnly: Boolean = false
slugs: [String]
useTopicAliases: Boolean
viewerCanAdmin: Boolean
withFreeTrialsOnly: Boolean = false
): MarketplaceListingConnection!
Look up Marketplace listings
```

### Query `__type`

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
