# Configuration
- the config file is like the genome of a computer app
  - it stores parameters that define the system's critical settings
- config file is easily editable
- it is a set of parameters or constants that are critical to a system
- configuration is typically written in JSON or YAML
  - can be either static (hard-coded) and shipped with the system's application code (like frontend code)
    - code review and tests can be conducted before merging the changes to the source code
    - this is safer but also makes it slower to see changes related to the configuration
      - because we would have to wait for the entire app to be redeployed
  - or dynamic, living outside of the system's application code
    - this means that the configuration can be changed and the effect will take effect and have ramifications on the system
    - it has to be backed by some sort of database, as the app or system is gonna be querying to see what the current configuration is
    - however, dynamic configuration also gives you a lot of power and flexibility
      - because you can build a UI on top of the configuration
        - which allows the team, engineers, system admins to make changes to the configuration with the click of a button
        - however, no reviews or tests can be run after changes are made
    - in large tech companies
      - tools are built around the dynamic configuration to make the changes safe
        - e.g.: you might build a review system on top of the configuration user interface
        - you might implement access controls to only allow certain people in your organization to make configuration changes
        - you might build deployment systems around configuration
        - can also build complex systems such that when a configuration changes, it only gets deployed to maybe 1% or 10% of users
          - by doing so, even if the configuration change has impact on the app very quickly, it only affects a few users, thus allowing you to safely roll out changes externally
- most large scale distributed systems are gonna rely a lot on configuration
## Terms Used
### JSON (JavaScript Object Notation)
- a file format heavily used in API's and configuration
    ```
    {
      "version": 1.0,
      "name": "configuration"
    }
    ```
### YAML
- a file format mostly used in configuration
    ```
    version: 1.0
    name: configuration
    ```
