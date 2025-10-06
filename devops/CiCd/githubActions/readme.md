# Github Actions

## In Github Reposition

- Go to `Settings`
- Click on `Actions` on the left sidebar
  - click on `Runners`
- Click on `New self-hosted runner`
- Select the runner image and architecture

## In DigitalOcean

- follow details shown at Github
- example
  - Create a folder
    > mkdir actions-runner && cd actions-runner
  - Download the latest runner package
    > sudo curl -o actions-runner-osx-x64-2.294.0.tar.gz -L https://github.com/actions/runner/releases/download/v2.294.0/actions-runner-osx-x64-2.294.0.tar.gz
  - Optional: Validate the hash
    > echo "11041376754f6beaccb56101a3e79bf5fc5d6ff628460fa1ae419f9f439e24a2 actions-runner-osx-x64-2.294.0.tar.gz" | shasum -a 256 -c
  - Extract the installer
    > sudo tar xzf ./actions-runner-osx-x64-2.294.0.tar.gz
  - Give permissions
    > sudo chmod -R 777 ~/the/path/to/actions-runner
  - Create the runner and start the configuration experience
    > ./config.sh --url https://github.com/reshinto/myrepo --token sdgsdgbershteht
    - enter name of runner
    - enter labels, ignore if not required
    - enter work folder, ignore if using default
    - at `Github` the runner will be available but offline
  - start runner
    - install service
      > sudo ./svc.sh install
    - run service
      > sudo ./svc.sh start
    - at `Github` the runner will be available but idle

## In root directory of Project Repository

- create yml file of any name in the following path, create folders if it does not exist

  - `~/projectName/.github/workflows/projectname.yml`
  - contents

    ```yml
    name: portfolio CI

    on:
      push:
        branches: [dev]
      pull_request:
        branches: [dev]

    jobs:
      build:
        runs-on: self-hosted

        steps:
          - name: Checkout
            uses: actions/checkout@v3

          - name: Build
            uses: actions/setup-node@v3
            with:
              node-version: 16
          - run: |
              yarn
              yarn run build
              yarn run deploy-gh
    ```

- git add, commit and push, github actions should work

## How it works

- github data will be updated on `~/the/path/to/actions-runner/_work/myrepo/myrepo/`
  - whatever run commands declared will be run at this level
