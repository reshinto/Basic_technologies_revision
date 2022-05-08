# Java 9
- JPMS (Java Platform Module System) also known as Project Jigsaw
  - benefits
    - modularity as a first class citizen
    - designing for modularity early
    - new concepts, syntax, and tools
    - modular platform
    - smaller footprint
- 5 pillars of modularity
  - Encapulated: stronger encapsulation
    - protection of a module's internals
  - Interoperable: reliable modularity
    - working with other modules
  - Composable: reliable modularity
    - modules can be combined with other modules
  - Expandable: reliable modularity
    - modules can be scaled up
  - Autonomous: decomposable
    - modules work independently of other modules
## What it is trying to solve
### Java 8
- limited in terms of expressing modularity beyond a single package
- once a class is public, there is no further way to control which classes in other packages can see it
  - its all or nothing
- path of the class that is stored on disk is intertwined with the package hierarchy
  - means that how you organize the package hierarchies must be aligned with the accessibility that you want to assign to your class
- example
  - 1 package example works fine
    - all packages are inside the movement package
    ![single package module](../../../images/singlePackageModule.png)
  - multiple packages example will not compile
    ![multiple package module](../../../images/multiPackagesModule.png)

### Java 9 improvements
- class ccessibility
  - JPMS offers better controls to expose classes
- classpath hell
  - JPMS maintains class integrity
  - can be verified by static analysis
  - support for versioning
  ![classpath hell](../../../images/classpathHell.png)
  
- controlling the system footprint
  - a large chunk of the JDK libraries were delivered as 1 big JAR file `rt.jar`
  - by java 8, it had grown to over 66 MB of line code
  - typical apps will not use all 66 MB, so why make all of it available at runtime
  - thus the `rt.jar` has been modularized
    - libraries that used to eist in `rt.jar` have now been segmented into smaller `JMOD` files
      - a new file format to package modules
## Module-info
- Regular java class
- Module-related syntax only
- module meta-data available at runtime
- providing fidelity across phrases
- 1 module-info per module
- declared at the root of module
- mandatory for JPMS
- creates a namespace for the module
- must be globally unique, like package names
- no duplication
- modules dictate how packages are stored on file system
- module hierarchies must match filesystem hierarchies
- segregated package hierarchies
- modules could each have their own codebase and lifecycles, but is not a must
- filename `module-info.java`
  ```java
  module module.name {                                 // 1
    exports package.name.a;                            // 2
    exports package.name.b to other.module.name.a;     // 3
    requires other.module.name.b;                      // 4
  }
  ```
### Module name
- first line contains module keyword followed by module name
  - `module.name` in given example
- Module naming convention is similar to package convention
  - reversed domain notation: domainName.module
    - domain name: organization.com
    - module: project
    - module name in module-info: `com.organization.project`
### Module API
- The second line declares that classes from a `package.name.a` may be accessible for other modules
- Module descriptor can export multiple packages, each on a separate line
### Restricted API
- Line #3 declares that package `package.name.b` is accessible only for `other.module.name.a`
- This functionality should be use carefully, it brakes the rule that module knows only depended modules
- It also increases coupling of modules
### Module dependency
- In the last line contains the information about the module dependencies
- In the provided example the `module module.name` depends on `other.module.name.b` module and has access to its exported packages
## Transitive dependencies
- a transfer of dependencies to dependent modules
  - in simpler terms
    - every package a given module requires gets automatically passed to dependent modules
- it keep dependency graphs coherent
- it is a clean way to transfer dependencies to dependent modules
  - but avoid having to repeat the dependency requirements
```java
module module.name {                                   
  requires transitive other.module.name.b;  // add transitive key word
}
```
- from
  ![without transition](../../../images/withoutTransition.png)
- to
  ![with transition](../../../images/withTransition.png)

## Qualified dependencies
- exporting of packages to chosen modules
  - similar to white listing approach to exporting
- allow the exporting module to choose which foreign modules are allowed to read it
- acts as a fine-grained filter, giving individual access at the package level
- drawbacks of using qualified dependencies
  - exporting modules should normally not know about which other modules are depending upon them
  - qualified exports break this rule
  - it should only be used in friend like contexts
  - it is used because the modules are working closely with other modules to provide a functionality
  - funcationalities are structured into independent modules
    - but federated to act as 1 in providing that functionality
- limitations to qualified dependencies
  - it can't be used to grant readability to all forieng modules because they would all need to be known
  - foreign modules must already exist, if not compilation will fail
- qualified exporting should not be used as the default exporting tool
  - but should be instead be used in special circumstances
  - best used to give fine-grained access to known modules working together
- problem
  ![without qualified dependency](../../../images/withoutQualifiedDependency.png)

- solution 1: changing accessibility from public to package private
  - works if dependency does not require access from anywhere else
  ![limited qualified solution](../../../images/limitedQualifiedSolution.png)

- solution 2: refactor code
  - is a hacky solution
  ![hacky qualified solution](../../../images/hackyQualifiedSolution.png)

- Proper solution:
  - change accessibility from public to package private
  - use the `to` key word in `module-info.java` file
  ![qualified solution](../../../images/qualifiedSolution.png)

```java
module module.name {                                 
  exports package.name.b to other.module.name.a, other.module.name.c, ...;  // use the to key, can export to multiple packages
}
```
## Service dependencies
![service dependencies](../../../images/serviceDependencies.png)

- service provider
  - has an interface where multiple types implements it
  - in the `module-info.java` file
    ```java
    module module.name {
      exports package.name.a;;
      provides package.name.a.InterfaceName with  // interface
               package.name.a.type.One;           // class that implements interface
               package.name.a.type.Two;           // can provide multiple classes that implements the interface
               ...
    }
    ```
- service consumer
  ```java
  module module.name.b {
    requires package.name.a;
    uses package.name.a.InterfaceName;  // only interface is specified
  }
  ```
  - service loader
    - pluggable services framework
    - binds service providers to consumers
    - not new, but enhanced for JPMS
    - does not replace dependency injection frameworks
      - but can be used in apps that need to deliver functionality in a modular and interoperable way without using third party frameworks
      - ideal for stand-alone jave SE apps
    - example: a class that uses the service loader to obtain an instance to one of the interface implementations
    ```java
    import java.util.ServiceLoader;
    import java.util.Optional;
    import com.red30tech.chassis.api.InterfaceName;
    ```
    ```java
    ServiceLoader<InterfaceName> serviceLoader = ServiceLoader.load(InterfaceName.class);

    System.out.println("Found " + serviceLoader.stream().count() + " interface name configured");  // count depends on number of classes implemented with interface that are provided in the modular-info.java file

    Optional<InterfaceName> optional = serviceLoader.findFirst();
    optional.orElseThrow(() -> new RuntimeException("No service providers found"));
    InterfaceName interfaceName = optional.get();
    ```
## Rules of modularization
- Firstly
  - cycles between modules (on compilation level) are prohibited
  - It’s a limitation but no one should cry because of that
  - Cycles in general are sign of a bad design
- Secondly, even if module encapsulation is controlled on compile and runtime level
  - you can brake it using reflection API and freely use debug tools
- Thirdly, all modules have an implicit dependency to `java.base` module and it doesn’t have to be specified in module descriptor
  - The implicit dependency on `java.base` is similar to implicit import of `java.lang.String` class
- Fourthly, due to backward compatibility, every class not placed in the modules goes to unnamed module
  - That module has dependency to all other modules and has access to the packages which they exported
  - It’s important that not exported packages are not accessible
  - Since Java 9 some APIs are marked as internal and are unavailable from regular packages
  - If you compile code using such packages in Java 8 and try to use it with Java 9, you’ll get runtime error
## Modular structure design
- small apps may have just 1 module
### JPMS introduces the module path
- it tells the compiler and runtime where to find the modules
- directory hierarchy must match module/package hierarchy
  - each module is a separate hierarchy
- the module path supersedes the class path
  - the class path is for backward compatibility
- the module path can aggregate many modules
  - each module can be its own island of code
- 1 modular structure
  ![modular structure](../../../images/modularStructure.png)

- multi modular structure
  ![multi modular structure](../../../images/multiModularStructure.png)
