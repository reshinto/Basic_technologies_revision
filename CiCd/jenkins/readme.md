# Jenkins
## Installation
### Mac
- ```brew install jenkins-lts```
### Docker
#### Install jenkins image
- ```docker pull jenkins/jenkins:lts```
## How to run
### Mac
#### Start Jenkins server
- ```brew services start jenkins-lts```
#### Stop Jenkins server
- ```brew services stop jenkins-lts```
#### View server
- ```http://localhost:8080/```
  - paste admin password that was auto generated if first time setting up
### Docker
#### Create new container
- ```docker run -d -p 8080:8080 -p 50000:50000 -v ~/jenkins_home:/var/jenkins_home --name jenkins jenkins/jenkins:lts```
#### Get default admin password
- ```docker exec -it jenkins bash```
  - ```docker exec jenkins cat adminPasswordFilePathProvided```
## First time setup
1. Click on ```Install suggested plugins```
2. Create admin account
## Jenkins Interface
### Create a job / project
1. Click on ```New Item``` or ```Create new jobs``` link
2. Select project type
3. Set the required settings
4. At the ```General``` tab
    - This project is parameterized option
      - String parameter
        - set variable name and default value
      - Choice parameter
        - set variable name
        - set choices: e.g.
          ```
          DEVELOPMENT
          STAGING
          PRODUCTION
          ```
      - Boolean parameter
        - set variable name
        - check default_value to set it as ```true```, uncheck as ```false```
5. At the ```Build Triggers``` tab
    - Build periodically option
      - Jenkins scheduler format
        - ```* * * * *``` is ```min(0 - 59) hour(0 - 23) dayOfMonth(1 - 31) month(1 - 12) dayOfWeek(0 - 7)(Sunday=0 or 7)```
          - use ```*``` for all range values e.g. all days of the week
      - Use ```H``` for hashed values to spread out jobs around the desired time
        - ```H 0 * * *```
      - Simple aliases for general times
        - ```@hourly```, ```@midnight```, ```@daily```, ```@monthly```, ```@weekly```, ```@annually```
6. At the ```Build``` tab
    - eg. select the ```Execute shell```, then input the desired commands
7. At the ```Post-build Actions``` tab
    - Can choose the file to archive for easy discovery and management
      - if unsure of file path use wild card ```**/artifactFile```
8. Click on ```Apply``` button to save changes and continue modifying the configurations
    - or click on the ```Save``` button to save configurations and exit
### Build the created job / project: this will run the job
- Click on the ```Build Now``` button
- A job build history will be generated
- To get the console output, click on the ```blue ball``` at the history row
### Create View
- Display jobs that meet a criteria
- Views are like a filter
- Deleting a view will only delete the view, however, jobs will not be deleted
- New folders will not be able to be create inside except for All view
### Create Folder
- Folders group things together
  - contain jobs, views, and other folders
- Provides a namespace that is separate from other folders in Jenkins
  - it is isolated and can contain items/jobs that have the same name as items/job in other folders
- Create a new folder
  - select ```New Item``` button then select ```Folder```
- Can contain jobs, views, and folders
- Deleting a folder will delete all jobs, views, and folders inside
