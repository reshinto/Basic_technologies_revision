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
