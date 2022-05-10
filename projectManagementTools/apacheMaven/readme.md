# Apache Maven
- standard definition
  - a software project management and comprehension tool
  - based on the concept of a Project Object Model (POM)
    - Maven can manage a project's build, reporting and documentation from a central piece of information
- simple definition
  - a project management tool with a POM
  - a set of standards
  - a project life cycle
  - a dependency management system
  - logic for executing plugin goals at lifecycle phases
  - projects follow a consistent structure
  - projects are IDE agnostic
  - Maven allows for easy modifications to the project
  - Maven simplifies the declaration of project dependencies
  - it uses a POM file
## Installation
- install with brew
  > brew install maven
- check maven version
  > mvn -version
## Project Object Model (POM)
- it has a set of standards, a project lifecycle, a dependency management system, and logic for executing plugin at defined phases in a lifecycle
- projects are set up with default behaviors
- source code must be in the `src/main/` folder
- resources necessary for the project are in another folder
- test cases are in a specifically name folder
- `target folder` is used for the final JAR file

![maven project structure](../../images/mavenProjectStructure.png)

### POM file
- must include
  - project description
  - unique set of "coordinates"
    - highlighted by `*`
      - groupId
      - artifactId
      - version
  - project attributes
  - project's license
  - project version
  - program authors and contributors
  - dependencies

![POM structure](../../images/pomStructure.png)

#### features enabled by POM
- includes
  - dependency management
  - access to remote repositories
  - universal reuse of build logic
  - tool portability and integration
    - allow IDEs to have a common place to find information about a project
  - easy searching and filtering of project artifacts

