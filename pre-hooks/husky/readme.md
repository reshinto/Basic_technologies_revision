# Husky
## How to install
- method 1
  - ```npx husky-init && npm install```
- method 2
  - ```npx husky-init && yarn```
- method 3
  - ```yarn dlx husky-init --yarn2 && yarn```
  - Yarn 2 doesn't support prepare lifecycle script, so husky needs to be installed differently
- Prepare husky for installation
  - ```npm set-script prepare "husky install"```
  - should have
    ```
    // package.json
    {
      "scripts": {
        "prepare": "husky install"
      }
    }
    ```
- install husky ```npm run prepare```
## Create a pre-commit hook
- ```npx husky add .husky/pre-commit "npm test"```
- you should get
  ```
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm test
  ```
- change it to something like the following
- precommit and test:coverage are scripts written in the package.json
  ```
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  npm run precommit && npm run test:coverage
  ```
## Create a commit-msg hook
- ```npx husky add .husky/commit-msg 'npx --no-install commitlint --edit "$1"'```
- you should get
  ```
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"
  
  npx --no-install commitlint --edit ""
  ```
- change it to something like the following
  ```
  #!/bin/sh
  . "$(dirname "$0")/_/husky.sh"

  echo 'husky:hooks:commit-msg' && node ./commitLint.ts
  ```
## Create a commit lint to manage the commit message
- commitLint.js
```javascript
const fs = require("fs");
const path = require("path");

const ruleCommit = "\\[((FS)-(\\d)+)\\]:\\s\\w";

const regExpCommit = new RegExp(ruleCommit, "g");

const msg = `
  # Invalid commit message!
  #
  # Please use the following rules:
  # '[required key]: <required message>'
  #
  # - [required key]: '[FS-{key}]: ', when the {key} is a valid JIRA issue key
  # - <required message>: '{msg}', when the {msg} is a clear commit message
  #
  # For example:
  # '[FS-1234]: Commit message'
`;

const commitPath = path.resolve(
  process.env.HUSKY_GIT_PARAMS || ".git/COMMIT_EDITMSG",
);
const commitMsg = fs.readFileSync(commitPath, "utf8");

if (!regExpCommit.test(commitMsg)) {
  console.error(msg);
  process.exit(1);
}
```
