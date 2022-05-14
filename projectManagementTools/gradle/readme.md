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
### Build Execution under the Hood
- evaluates instructions in build scripts
- creates and configures tasks
- executes tasks in correct order
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
#### Domain Objects in Memory
- each node represents the DAG in memory
- tasks are just 1 example of domain object of a build
- domain objects can be inspected and modified from the build script
##### import domain objects
- `Gradle`: `org.gradle.invocation.Gradle`
  - represents invocation of the build
  - every invocation of a greater build is represented by a domain object called `Gradle`
    - this domain object has knowledge about the project hierarchy in a single project
      - or multi project build provides pointers to the higher level properties of a build
    - e.g.: the gradle user home directory, the used Gradle version can register callback logic to react to certain events in the build
- `Gradle` - `Project`: `org.gradle.api.Project`
  - represents a software component and provides API access to object hierarchy
  - it serves as the main entry point of a build
  - provides methods for walking the whole hierarchy of domain objects
  - e.g.: can ask for the reference to the Gradle instance, register new tasks, or get a modified typical environmental properties like the build output directory
- `Gradle` - `Project` - `Task`: `org.gradle.api.Task`
  - represents unit of work with potential dependencies
  - performs the actual work at runtime
  - from the project, can register as many tasks as you like
  - every task can declare task dependencies
  - in most cases, tasks define at least 1 action
- `Gradle` - `Project` - `Task` - `Action`: `org.gradle.api.Action`
  - actual work performed during execution phase
  - gradle executes actions in order of declaration
  - can also define doFirst and doLast actions
- ```
  Gradle - Project - Task - Action
             |
             v
          Plugin   org.gradle.api.Plugin
  ```
  - provides reusable logic for a project
  - every plugin applied to a project is represented as a plugin domain object
  - a plugin has full access to the project it works on
    - thus can access other domain objects by name or by type and modify them as necessary
## Build lifecycle phases
- every build performs 3 lifecycle phases
1. Initialization Phase
    - evaluates settings file and sets up build
    - file contains the information about the projects that should participate in the build
    - settings file can exist for a single and multi project builds
2. Configuration Phase
    - evaluates build scripts and runs configuration logic
    - each project can define a distinct build script but doesn't have to
    - all code in build script will be exercised
    - during configuration phase, task actions are not executed
      - tasks are only configured
    - configuration counts as assigning values to properties or calling task methods exposed by its API
    - make sure that code defined does not necessarily execute expensive logic as it would affect the performance
    - example in `build.gradle` file
      - always outide of `doFirst` and `doLast` actions
      - executed during configuration phase
      ```gradle
      // configuration code
      
      task helloWorld {
        // configuration code
        
        doFirst {}
        doLast {}
      }
      ```
3. Execution Phase
    - executes task actions in correct order
      - it looks at the directed acyclic graph that was built in memory and executes every task action in the the correct order
    - example in `build.gradle` file
      - always inside of `doFirst` and `doLast` actions
      - executed during execution phase
      ```gradle
      task helloWorld {
        doFirst {
          // execution code
        }
        doLast {
          // execution code
        }
      }
      ```
## Plugins
- avoid repetitive code
- make build logic more maintainable
- provide reusable functionality across projects
### 2 types of plugins
1. Script Plugins
    ```
                 includes
    build.gradle -> publishing.gradle
                 -> deployment.gradle
                 includes
    ```
    - same syntax, just another build script that can be included in the main `build.gradle` file
    - primary reason for wanting to use it is to split up build logic and make it more maintainable
    - example
      - create a `archiving.gradle` file
        - add the usual code from `build.gradle`
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
      - create a `build.gradle` file
        - implement script plugin with the `apply` key word
        ```gradle
        apply from: "archiving.gradle"
        ```
      - run file as usual
        > gradle createZip
2. Binary Plugins
    ```
                 includes
    build.gradle -> gradle core plugin
                 -> community plugin
                 includes
    ```
    - implemented as classes
    - bundled as JAR files
    - can reuse the functionality across multiple self-contained software projects
      - these software projects usually live in different version control repositories
    - example
      - create a `archiving.gradle` file
        - add the usual code from `build.gradle`
        - use the `apply` key word
        - delete the `archiveFileName` and `destionationDirectory` as they are provided by the `base` plugin, thus no longer required
        ```gradle
        // single plugin
        apply plugin: "base"
        
        // multi plugins
        plugins {
          id 'java'
        }

        
        task copyExample(type: Copy) {
          from "."
          into "test"
          include "**/*bat"
          includeEmptyDirs = false
        }

        task createZip(type: Zip) {
          from "test"
          dependsOn copyExample
        }
        ```
      - create a `build.gradle` file
        - implement script plugin with the `apply` key word
        ```gradle
        apply from: "archiving.gradle"
        ```
      - run file as usual
        > gradle createZip
## Build a java project
### Using Gradle Java Plugin
- standard source code directories
  ```
  src/main/java       -> contains the production source code
  src/main/resources  -> contains resource files needed at runtime
  src/test/java       -> contains test source code
  src/test/resources  -> contains resource files needed at test execution time
  build.gradle
  ```
- build output directories
  ```
  build/classes       -> contains compiles class files
  build/libs          -> contains generated JAR file
  ```
- `build.gradle`
  ```gradle
  // basic requirement
  plugins {
    id 'java'
    id 'application'
  }
  
  version = "1.0.0"

  java {
    sourceCompatibility = JavaVersion.VERSION_11
    targetCompatibility = JavaVersion.VERSION_11
  }

  tasks.withType(JavaCompile) {
    //enable compilation in a separate daemon process
    options.fork = true
  }
  
  jar {
    // use preset jar file name
    archiveBaseName = "newName"
  }
  
  application {
    mainClass = "com.domain.appname.Main"
  }
  
  javadoc {
    options.header = "appname"
    options.verbose()  // to print logs
  }
  ```
- run wrapper
  > gradle wrapper
- `src/main/java` can be compiled using the task `compileJava`
  > ./gradlew compileJava --console=verbose
- copies files from `src/main_resources` into `build` directory using task `processResources`
  > ./gradlew processResources --console=verbose
- combine both `compileJava` task and `processResources` with `classes`
  > ./gradlew classes --console=verbose
- package jar file
  > ./gradlew jar
- run application
  > ./gradlew run
  - run with args
    > ./gradlew run --args="add 1 2"
- install application to allow running without java
  > ./gradlew installDist
  - run application
    > ./build/install/appname/bin/appname
    - run with args
      > ./build/install/appname/bin/appname add 1 2
- zip application
  - single bundle
    > ./gradlew distZip
  - multi bundle
    > ./gradlew distZip distTar
- run `javadoc`
  > ./gradlew javadoc
    - output in `build/docs/` directory
  - open docs
    > open build/docs/javadoc/index.html
### Dependency Management
- within gradle project, can define a dependency on libraries in Maven Central or any other binary repository
- at build time, gradle's dependency management engine downloads its artifacts
  - stores them in the local cache for reuse
  - adds them to the class path of the project
- gradle calls the scope of a dependency a configuration
  - can be very specific about the scope of a dependency
    - e.g.: can express that the dependency is only needed at runtime, but not for compilation process
- another type of dependency is `project dependency`
  - when application logic becomes complex
    - will want to separate it based on functional boundaries, modules, or components
  - a module, all can use other modules
    - each of it are modeled as a gradle project
    - referred to as `multi-project build`
- when a project is ready to ship
  - will want to produce a library or distribution
  - common practice to publish those artifacts to a binary repository for consumption by other developers or end users
  - gradle supports publishing java libraries to Maven repositories
#### Dependency management in Java
- java ecosystem offers a mature set of reusable functionality
- the most popular libraries are available on Maven Central
  - it is a centrally hosted binary repository
#### Declaring a dependency on an external library
- need to know 3 aspects
  1. dependency coordinates which is the Group, Artifact, Version (GAV) you want to consume
      ```
      Group:Artifact:Version
      ```
      - e.g.:
        ```
        commons-cli:commons-cli:1.4
        ```
  2. to consume the dependency, need to declare the repository using the `repositories` method in `build.gradle` file
      ```gradle
      plugins {
        id 'java'
        id 'application'
      }

      java {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
      }

      jar {
        archiveBaseName = "newName"
      }

      application {
        mainClass = "com.domain.appname.Main"
      }
      
      // allows gradle to know where to resolve the dependency from
      repositories {
        mavenCentral()
      }
      ```
  3. define the GAV of the dependency by using the `dependencies` method with `implementation` scope
      - after adding the dependencies, you can import it in the java code 
      ```gradle
      plugins {
        id 'java'
        id 'application'
      }

      java {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
      }

      jar {
        archiveBaseName = "newName"
      }

      application {
        mainClass = "com.domain.appname.Main"
      }
      
      repositories {
        mavenCentral()
      }
      
      dependencies {
        implementation "commons-cli:commons-cli:1.4"
      }
      ```
      - to test if dependencies are working, install and run them
        - installation
          > ./gradlew installDist
        - run
          > ./build/install/appname/bin/appname
          - run with args
            > ./build/install/appname/bin/appname --operation functionname --value value1 --value2 value2
#### Dependency tree
- over time, the number of dependencies will grow
- declared dependencies oftentimes pull in transitive dependencies
- result in a large tree of dependencies to manage
- check dependency tree
  > ./gradlew dependencies
- use `dependencyInsight` task to find out why the dependency is needed and where it is coming from
  > ./gradlew -q dependencyInsight --dependency commons-cli
#### Multi-project builds
- projects with a lot of code easily become hard to maintain
- breaking up a project into components increases cohesion and makes it more manageable
- gradle can model each of the components with a project instance, `multi-project build`
- sample multi-project structure
  ```
  api/src/main/java/com/domainname/appname/Appname.java
  app/src/main/java/com/domainname/appname/Main.java
  app/build.gradle
  build.gradle
  settings.gradle
  ```
  - `app/build.gradle`
    ```gradle
    plugins {
      id 'application'
    }

    application {
      mainClass = 'com.domainname.appname.Main'
    }

    repositories {
      mavenCentral()
    }

    dependencies {
      implementation project(':api')
      implementation 'commons-cli:commons-cli:1.4'
    }
    ```
  - `settings.gradle`
    ```gradle
    rootProject.name = 'appname'

    include ':api', ':app'
    ```
  - `build.gradle`
    ```gradle
    allprojects {
      version = '1.0.0'
    }

    subprojects {
      apply plugin: 'java'

      java {
        sourceCompatibility = JavaVersion.VERSION_11
        targetCompatibility = JavaVersion.VERSION_11
      }
    }
    ```
  - check projects taking part of the build using the `projects` task
    > ./gradlew projects
  - compile and copy resources, this will check if build works
    > ./gradlew classes
#### Publishing libraries
- library needs to be published to a binary repository
- a published library can be identified by its coordinates (GAV)
- the Maven Publish plugin automates the publishing process
- `api/build.gradle`
  - publish to a local folder
    ```gradle
    plugins {
      id 'maven-publish'
    }

    publishing {
      publications {
        maven(MavenPublication) {
          groupId = 'org.domainname'
          artifactId = 'appname'
          from components.java
        }
      }
      repositories {
        maven {
          url = "$rootProject.buildDir/m2repo"
        }
      }
    }
    ```
  - publish to a cloud binary repository
    ```gradle
    plugins {
      id 'maven-publish'
    }

    publishing {
      publications {
        maven(MavenPublication) {
          groupId = 'org.domainname'
          artifactId = 'appname'
          from components.java
        }
      }
      repositories {
        maven {
          url = 'http://localhost:8082/artifactory/libs-release-local/'
          credentials {
            username = 'admin'
            password = 'admin_123'
          }
        }
      }
    }
    ```
  - run `publish` task in the root directory
    - works for multi-project builds
    > ./gradlew publish
