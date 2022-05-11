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
## Installation
> brew install gradle
- check version
  > gradle -v
## Basic terminology
- Project: models a software component
- Build script: contains automation instructions for a project
- Task: defines executable automation instructions
## File format
- use the `.gradle` extension
  - e.g.: `build.gradle`
-  print Hello world
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
