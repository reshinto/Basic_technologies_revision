# Gradle
- a general purpose build automation tool
- flexible yet powerful for different use cases
  - building android apps
  - automating `Go` or `python` projects
  - generating documentations
- runs on Java Virtual Machine (JVM)
- build logic defined as instructions in a script
- plugins can provide predefined functionality
- tool can be executed from the terminal and IDE
- [Gradle url](https://docs.gradle.org/current/dsl/org.gradle.api.Project.html)
## Installation
> brew install gradle
- check version
  > gradle -v
## Basic terminology
- Project: models a software component
- Build script: contains automation instructions for a project
- Task: defines executable automation instructions
## Build logic
- gradle defines a Domain Specific Language (DSL)
  - 2 options
    1. Groovy DSL
    2. Kotlin DSL 
- can mix in imperative logic
## File format
- using `Groovy DSL`
  - use the `.gradle` extension
    - e.g.: `build.gradle`
  - print Hello world
    - `task` a method call on an API available to the Gradle build script
      - it is to express that we want to create a task for project
      - string parameter `helloWorld` is the name of the task
    - `doLast` defines the action executed at runtime
    - `println` is a method call provided by Groovy to print the message to standard output
    ```gradle
    task helloWorld {
      doLast {
        println "Hello World"
      }
    }
    ```
  - run file
    - call function not the filename
    > gradle helloWorld
    - output
      ```
      > Task :helloWorld
      Hello World

      BUILD SUCCESSFUL in 823ms
      1 actionable task: 1 executed
      ```
- using `Kotlin DSL`
  - use the `.gradle.kts` extension
    - e.g.: `build.gradle.kts`
  - print Hello world
    ```gradle
    tasks.create("helloWorld") {
      doLast {
        println("Hello World")
      }
    }
    ```
  - run file
    - call function not the filename
    > gradle helloWorld
    - output
      ```
      > Task :helloWorld
      Hello World

      BUILD SUCCESSFUL in 823ms
      1 actionable task: 1 executed
      ```
## Gradle wrapper
- it is a set of files checked into SCM alongside source code
- standardizes compatible gradle version for a project
- automatically downloads the gradle distribution with defined version
### disadvantages of not using gradle wrapper
- gradle API can include breaking changes in between major versions
- maintaining multiple gradle installations on a developer machine is not convenient
### benefits
- developers do not need to install gradle runtime
- developers can check out project source code and build right away
- wrapper works the same way on continuous integration servers
### terminal command
> gradle wrapper
- creates files and directories
  - gradle directory
  - gradlew
  - gradlew.bat
- view properties created
  > cat gradle/wrapper/gradle-wrapper.properties
  - output
    ```
    distributionBase=GRADLE_USER_HOME
    distributionPath=wrapper/dists
    distributionUrl=https\://services.gradle.org/distributions/gradle-7.4.2-bin.zip
    zipStoreBase=GRADLE_USER_HOME
    zipStorePath=wrapper/dists 
    ```
- run gradle wrapper instead of gradle on mac
  > ./gradlew helloWorld
## Build file and conventions
### Single project build
- `src -> build.gradle`
- characteristics
  - resides in root directory of project
  - contains all build logic
  - can become hard to maintain
### Multi module build
```
build.gradle -> module -> build.gradle
             -> module -> build.gradle
```
- maintainable, highly cohesive build logic
### Settings file in a build
```
build.gradle
settings.gradle -> module
                -> module
```
- characteristics
  - resides in root directory of project hierarchy
  - declares participating projects
  - can change defaults
    - e.g.: project name
- Gradle auto derives project name from directory
  > gradle projects
  - output
    ```
    > Task :projects

    ------------------------------------------------------------
    Root project 'hello-world'
    ------------------------------------------------------------

    Root project 'hello-world'
    No sub-projects

    To see a list of the tasks of a project, run gradle <project-path>:tasks
    For example, try running gradle :tasks

    BUILD SUCCESSFUL in 1s
    1 actionable task: 1 executed
    ```
  - modify project name
    - create `settings.gradle` file with the following contents
      ```gradle
      rootProject.name = "starter-example"
      ```
    > gradle projects
    - output
      ```
      > Task :projects

      ------------------------------------------------------------
      Root project 'starter-example'
      ------------------------------------------------------------

      Root project 'starter-example'
      No sub-projects

      To see a list of the tasks of a project, run gradle <project-path>:tasks
      For example, try running gradle :tasks

      BUILD SUCCESSFUL in 1s
      1 actionable task: 1 executed
      ```
### Properties file in a build
```
build.gradle
settings.gradle
gradle.properties
```
- characteristics
  - resides in root directory of project hierarchy or gradle user home directory
  - preconfigures runtime behavior
- create `gradle.properties` file with the following contents
  - changing log level for a console output to info
    ```gradle
    org.gradle.logging.level = info
    ```
  - declare custom version of project
    ```gradle
    version = 1.0.0
    ```
  - retrieve variable from property
    - in `build.gradle` file
      ```gradle
      task helloWorld {
        doLast {
          println "Hello World, version = " + version
        }
      }
      ```
  - `gradle helloWorld` or `./gradlew helloWorld`
## Defining and configuring a task
- view all available tasks
  > gradle tasks --all
### Task purpose
- defines executable unit of work
- actions contain logic to be executed runtime
- general categorization: ad hoc tasks and tasks explicitly declaring a type
### Ad Hoc Task
```
Default Task
    ^
    | extends
Ad hoc Task
```
- characteristics
  - implements one-off, simplistic action code by defining doFirst or doLast
  - automatically extend DefaultTask without having to declare it
- the `helloWorld` is an example of an `Ad Hock Task`
  - it also has no explicity declare type `task helloWorld {` 
### Task Declaring a type
```
Copy
  ^
  | extends
Typed Task
```
- characteristics
  - explicitly declares type
    - e.g.:
      ```gradle
      task copyFiles(type: Copy) {
        from "sourceFiles"
        into "target"
      }
      ```
  - does not necessarily need to define actions as they are already provided by type
- real copy example
  - in `build.gradle` file
    - check for all `.bat` files from current directory and into nested directories
    - then add them into test folder with their respective directories
    ```gradle
    task copyExample(type: Copy) {
      from "."
      into "test"
      include "**/*bat"
      includeEmptyDirs = false
    }
    ```
- real copy and zip example
  - in `build.gradle` file
    ```gradle
    task copyExample(type: Copy) {
      from "."
      into "test"
      include "**/*bat"
      includeEmptyDirs = false
    }
    
    task createZip(type: Zip) {
      from "test"
      archiveFileName = "docs.zip"
      destinationDirectory = file("test/dist")
    }
    ```
    - need to run each task individually
    - to enable it to run without running each task independently, use `dependsOn` key
      ```gradle
      task copyExample(type: Copy) {
        from "."
        into "test"
        include "**/*bat"
        includeEmptyDirs = false
      }

      task createZip(type: Zip) {
        from "test"
        archiveFileName = "docs.zip"
        destinationDirectory = file("test/dist")
        dependsOn copyExample
      }
      ```
### Task Execution Order
```
  dependsOn
A -> B
  -> C
  dependsOn
```
- ensures that B and C is executed before A
- does not explicitly define if B or C is executed first
### Fined-Gradle Dependency Control
```
  dependsOn
A -> B
     | mustRunAfter
     v
  -> C
  dependsOn
```
- use `mustRunAfter`, `shouldRunAfter`, or `finalizedBy`
### Directed Acyclic Graph (DAG)
```
node      node
 A    ->   B
  graph edge
```
- at runtime, the gradle buils a directed acyclic graph for tasks in memory
  - thus, runtime will know all the tasks participating in the build and their proper execution order
- task is represented as node
- task dependency is represented as graph edge
- Gradle does not provide a built-in feature for visualizing the task graph of a project
  - to emulate the task dependencies in action
    > gradle taskname --dry-run
  - can use the [gradle-task-tree](https://github.com/dorongold/gradle-task-tree) to render the tasks as a tree
#### Circular Dependencies (Not allowed)
- dependency cycles cannot be formed
- gradle will fail build if detected
- e.g.: task A cannot dependsOn task B, while task B cannot dependsOn task A at the same time
