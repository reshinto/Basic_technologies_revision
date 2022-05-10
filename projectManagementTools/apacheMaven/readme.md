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
  - unique set of `coordinates`
    - highlighted by `*`
      - groupId
      - artifactId
      - version
  - project attributes
  - project's license
  - project version
  - program authors and contributors
  - dependencies
- POM file can be separated into multiple POM files

![POM structure](../../images/pomStructure.png)

#### POM Categories
- the POM contains all of the information about a project
- the file is stored with an XML extension
- minimum categories required
  ```xml
  <project>
    <groupId>com.projectname</groupId>
    <artifactId>appname</artifactId>
    <version>1.0</version>
  </project>
  ```
- common categories
  - project coordinates
  - project's license
  - list of developers and contributors to the project
  - list of project dependencies
  - name of project
  - url associated with project
  - packaging type
  - scope of element
  - information about inheritance
- `build` category
  - add build related plugins
  - `pluginManagement` tag is optional, also work without it
    - it is normally used in a `parent POM`
  ```xml
  <project>
    ...
    <dependencies></dependencies>
    <build>
      <pluginManagement>
        <plugins>
          <plugin>
            <groupId>org.apache.maven.plugins</groupId>
            <artifactId>maven-compiler-plugin</artifactId>
            <version>3.8.0</version>
            <configuration>
              <target>8</target>
              <source>8</source>
            </configuration>
          </plugin>
          ...
        </plugins>
      </pluginManagement>
    </build>
    ...
  </project>
  ```
- `reporting` category
  - add reporting related plugins
  ```xml
  <project>
    ...
    <dependencies></dependencies>
    <buid></build>
    <reporting>
      <plugins>
        <plugin>
          <groupId>org.apache.maven.plugins</groupId>
          <artifactId>maven-surefire-report-plugin</artifactId>
          <version>3.0.0</version>
        </plugin>
        ...
      </plugins>
    </reporting>
    ...
  </project>
  ```
- `distributionManagement` category is used for deploying
  ```xml
  <project>
    ...
    <distributionManagement>
      <repository>
        <id>internal.repo</id>
        <name>internal repository name</name>
        <url>hot to repository</url
      </repository>
    </distributionManagement>
    ...
  </project>
  ```
- `server` categpry is used to specify server definition
  - can also configure it in the `settings.xml` fiel
  ```xml
  <server>
    <id>internal repo</id>
    <username>someusername</username>
    <password>somepassword</password>
  </server>
  ```
#### POM syntax
- POM is documented in XML file
- file is stored in base directory
- syntax is similar to HTML file using `< >` tags
- every open XML tag must have a closing XML tag
- tags can be nested one inside the other
- XML declaration is optional
- all projects extend the super POM automatically
- sample
  ```xml
  <project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xsi:schemaLocation="http://maven.apache.org/POM/4.0.0http://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <groupId>com.projectname</groupId>
    <artifactId>appname</artifactId>
    <version>1.0</version>
  </project>
  ```
#### POM properties
```xml
<properties>
  <maven.compiler.source>11</maven.compiler.source>
  <maven.compiler.target>11</maven.compiler.target>
  <java.version>11</java.version>
  <junit.version>5.2.0</junit.version>
</properties>
<dependencies>
  <dependency>
    <groupId>junit</groupId>
    <artifactId>junit</artifactId>
    <version>${junit.version}</version>
    <scope>test</scope>
  </dependency>
</dependencies>
```
- purpose
  - reduces duplication
    - often times when configuration POM, tend to put the same value for an item and properties
      - properties help to reduce this
  - streamlines configuration
    - often used in conjunction with a `parent` POM
  - helps keep items in sync
    - such as versions of similar libraries
    - properties allow you to leverage a version and reference it
  - aids in upgrades
    - can upgrade the property and it upgrades the rest for you
#### Parent POM
- a POM file that is stand-alone (no code associated with it)
- creates a list of dependency versions and plugins versions that the subordinate projects can leverage
- provides a way to control versions in 1 place so the subordinate projects don't have to specify the version, only the dependency
- it can provide properties and repositories
  - a tool use to manage versions and licenses
    - because can provide a pre-approved list of dependencies and artifacts
- similar concept is a `Reactor`
  - it builds on the concept of a parent POM
  - used to build a group of related projects via the use of Parent POM
  - Maven commands are executed on the parent, and reactor executes the commands on each module or artifact in the reactor
    - the dependencies, if exists are handled in the correct order
  - building reactor although not hard, it is time consuming
  - structure example
    ```
    root - pom
         |_ module - POM
         |_ module - POM
         |_ module - POM
    ```
    - parent POM
      ```xml
      <project>
        ...
        <modules>
          <module>module-name</module>
        </modules>
        ...
      </project>
      ```
    - child POM
      ```xml
      <project>
        ...
        <parent>
          <groupId>com.projectname</groupId>
          <artifactId>appname</artifactId>
          <version>1.0.0-SNAPSHOT</version>
        </parent>
        ...
      </project>
      ```
#### features enabled by POM
- includes
  - dependency management
  - access to remote repositories
  - universal reuse of build logic
  - tool portability and integration
    - allow IDEs to have a common place to find information about a project
  - easy searching and filtering of project artifacts

#### Maven Life Cycles
1. Default
2. Clean
3. Site
- each cycle has a few phases
- phases must be executed in order
- phrases are made up of goals
  - Goals
    - plugin goals are bound to phase of lifecycle
    - goals can be triggered individually
    - e.g.: `mvn dependency:analyze`
##### default life cycle phases
- main lifecycle
1. Validate
    - validate the project is correct
2. Initialize
3. Generate-sources
4. Process-sources
5. Generate-resources
6. Process-resources
7. Compile
    - compile the source of the project
8. Process-classes
9. Generate-test-sources
10. Process-test-sources
11. Generate-test-resources
12. Process-test-resources
13. Test-compile
14. Process-test-classes
15. Test
    - test the compiled source code using a unit testing framework
16. Prepare-package
17. Package
    - package the compiled code
18. Pre-integration-test
19. Integration-test
    - deploy the package into an environment where integration tests can be run
20. Post-integration-test
21. Verify
    - run any checks to verify the package is valid
22. Install
    - install the package into the local repository
23. Deploy
    - copies the final package to the remote repository
- plugin goals can be attached to each lifecycle phase
- maven executes the goals attached to each phase
- each phase has 0 or more goals bound to it
- when you run `mvn install`, multiple goals are executed
  - `target/` folder with all the compiled code and jar file
- in the package phase, it executes the JAR goal
##### clean life cycle phases
- cleans project
1. Pre-clean
2. Clean
3. Post-clean
##### site life cycle phases
- generates project documentation
1. Pre-site
2. site
3. post-site
4. site-deploy
### Maven Repository
- central repository that contains open-source components
- Maven creates a local repository at `~/.m2` location
  - foreign dependencies are installed here
  - it also includes your JAR file and `pom.xml` file for each install project
  - [Maven repo search url address](https://search.maven.org/)
### Maven Dependency Management
- check dependencies
  - dependencies could be used but not declared
  - unused dependencies will be found
  > mvn dependency:analyze
- check dependencies tree
  > mvn dependency:tree
- allows for code reuse
- similar to using Java APIs
- most programmers have used the Math API
- dependencies are defined in the `pom.xml` file
  - `<scope></scope>` tag identifies what part of the life cycle the dependency is going to be used in
    - if scope tag is not included, it defaults to compile phase
    - tests related must have the `<scope>test</scope>
    - other scopes include
      - `compile`
        - the default scope
      - `provided`
        - used when JDK is expected to provide them
      - `runtime`
        - required for executing and testing, not compiling
      - `test`
        - not required during the normal operation of an app
      - `system`
        - similar to `provided`
        - but must specify the explicit path to the JAR on the locals file system
#### project dependencies
- Maven supports internal and external dependencies
- a common dependencies in Maven is `junit`, `log4j`, `jaxen`
- sample
  ```xml
  <project ...>
    ...
    <dependencies>
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>1.2.14</version>
      </dependency>
      <dependency>
        <groupId>jaxen</groupId>
        <artifactId>jaxen</artifactId>
        <version>1.1.1</version>
      </dependency>
    </dependencies>
  </project>
  ```
- using properties in parent POM example
  ```xml
  <properties>
    <log4j.version>1.2.14</log4j.version>
    <junit.version>3.8.1</junit.version>
  </properties>
  <dependencyManagement>
    <dependencies>
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
        <version>${log4j.version}</version>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
        <version>${jaxen.version}</version>
        <scope>test</scope>
      </dependency>
    </dependencies>
  </dependencyManagement>
  ```
  - in child pom file example
    - works fine if `enforcer` plugin is not added
    ```xml
    <dependencies>
      <dependency>
        <groupId>log4j</groupId>
        <artifactId>log4j</artifactId>
      </dependency>
      <dependency>
        <groupId>junit</groupId>
        <artifactId>junit</artifactId>
      </dependency>
    </dependencies>
    ```
    - verify with
      > mvn clean verify
#### project relationships
- Maven makes it easy to track down dependencies
- example of external relationships are `Log4j` and `JUnit`
- Internal is where project-a depends on project-b
- they are established using the Maven coordinates
- relationships are decribed as dependencies
- projects can inherit project relationships
### Best Practices
- grouping common dependencies
- can be done using multiple POM files
  - allows other projects to reuse POM file
- choosing inheritance vs multi-module relationship
  - multi-module: used when components are unrelated
  - inheritance: used when projects share dependencies
- proper indentation for `pom.xml` file
- follow a standard layout where coordinates are listed first
## Maven Plugins
- a plugin is a collection of 1 or more goals
- a goal is a unit of work in Maven
  - can view goals of a plugin in the maven plugin website
### Core plugins
- list of core plugins
  - Compiler plugin
    - contains goals for compiling source code and unit tests
  - Surefire plugin
    - used for executing unit tests and generating reports
  - others
    - clean, deploy, failsafe, install, resources, site, verifier
- Maven also allows creating of custom plugins
  - it can be written in multiple languages
    - java, Groovy, Ruby, ...
- [list of maven plugins url](http://maven.apache.org/plugins/index.html)
- example of using a plugin and goal in the terminal
  - plugin: compiler, goal: compile
  > mvn compiler:compile
### Packaging tools plugin
- list of packaging tools plugins
  - JAR plugin
    - creates JAR or Jave Archive files
  - others
    - ear, ejb, rar, war, app-client/acr, shade, source, jlink, jmod
- example of using a plugin and goal in the terminal
  - plugin: jar, goal: jar
  > mvn jar:jar
### Reporting plugins
- list of reporting plugins
  - changelog plugin
  - changes plugin
  - checkstyle plugin
  - doap plugin
  - docck plugin
  - javadoc plugin
  - jdeps plugin
  - jxr plugin
  - linkcheck plugin
  - pmd plugin
  - project-info-reports plugin
  - surefire-report plugin
- example of using a plugin and goal in the terminal
  - plugin: javadoc, goal: javadoc
    - javadoc auto saves report in `target/site/apidocs/` directory
    - launch the `index.html` file to view generated report
  > mvn javadoc:javadoc
### Tools plugins
- list of tools plugins
  - antrun, artifact, archetype, assembly, dependency, enforcer, gpg, help, invoker, jarsigner, jdeprscan, patch, pdf, plugin, release, remote-resources, scm, scm-publish, scripting, stage, toolchains, wrapper
- use help to find out more about a plugin
  - example: archetype
    > mvn help:describe -DgroupId=org.apache.maven.plugins -DartifactId=maven-archetype-plugin
## Create a project with Maven
### Sample program
> mvn archetype:generate -DgroupId=com.projectname -DartifactId=appname -DarchetypeArtifactId=maven-archetype-quickstart -DInteractiveMode=false
- View the full pom file contents
  - in the same directory where the `pom.xml` file is located at
    > mvn help:effective-pom
- install the all dependencies and plugins
  > mvn install
  - if a compilation error were to occur due to old version issue, add the following into the `pom.xml` file, just above the `dependencies` tag
    ```xml
    <properties>
      <maven.compiler.source>18</maven.compiler.source>
      <maven.compiler.target>18</maven.compiler.target>
    </properties>
    ```
- run the app
  - `-cp` flag is used for class search path
    - it will search directories and look for `zip/jar` files
  - `appname-1.0-SNAPSHOT` is correct if default version is used
    > java -cp target/appname-1.0-SNAPSHOT.jar com.projectname.App
  - `appname-0.0.1` is correct if `0.0.1` version is set
  > java -cp target/appname-0.0.1.jar com.projectname.App
### Web app
> mvn archetype:generate -DgroupId=com.projectname -DartifactId=webappname -DarchetypeArtifactId=maven-archetype-webapp -DInteractiveMode=false
## Unit testing with Maven
- Maven provides built-in support for unit testing
- JUnit is used to test app
- `Test/` directory is automatically created with a test app
- run test
  > mvn test
## Add resources folder
- add resources folder to add files for inputs
  - can be `txt` files
  - use `Scanner` library to read file in `resources` folder
- for `main` folder
  - create `resources` folder in `main` folder
- for `test` folder
  - create `resources` folder in `test`folder
## Packaging App
- packaging information is stored in `pom.xml` file
  ```xml
  <packaging>jar</packaging>
  ```
- default is `jar` if the type is omitted
- run package
  - also works with `mvn install`, `mvn test`
  > mvn package
  - add `clean` optional command to remove issues with other Maven operations
    > mvn clean package
  - add `site` optional command to generate `surefire` documentation for us
    > `mvn clean package site`
