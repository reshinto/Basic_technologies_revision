# Java 9
- JPMS (Java Platform Module System) also known as Project Jigsaw
  - benefits
    - modularity as a first class citizen
    - designing for modularity early
    - new concepts, syntax, and tools
    - modular platform
    - smaller footprint
- 5 pillars of modularity
  - Encapulated
    - protection of a module's internals
  - Interoperable
    - working with other modules
  - Composable
    - modules can be combined with other modules
  - Expandable
    - modules can be scaled up
  - Autonomous
    - modules work independently of other modules
## Example
- require `module-info.java` file containing the module descriptor
```java
module module.name {                                   // 1
    exports package.name.a;                            // 2
    exports package.name.b to other.module.name.a;     // 3
    requires other.module.name.b;                      // 4
}
```
### Module name
- first line contains module keyword followed by module name
  - `module.name` in given example
- Module naming convention is similar to package convention
  - reversed domain notation, eg `com.organization.project`
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
