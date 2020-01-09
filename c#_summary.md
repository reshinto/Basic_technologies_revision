# c# summary notes
### C# vs .NET
* C# is a programming language
* .NET is a framework
  * It consists of a run-time environment (CLR) and a class library that we use for building applications
### Common Language Runtime (CLR)
* When you compile an application, C# compiler compiles your code to IL (Intermediate Language) code
* IL code is platform agnostics, which makes it possible to a take a C# program on a different computer with different hardware architecture and operating system and run it
  * For this to happen, we need CLR
* When you run a C# application, CLR compiles the IL code into the native machine code for the computer on which it is running
  * This process is called Just-in-time Compilation (JIT)
### Architecture of .NET Applications
* In terms of architecture, an application written with C# consists of building blocks called classes
  * A class is a container for data (attributes) and methods (functions)
    * Attributes represent the state of the application
    * Methods include code
      * they have logic
      * That's where we implement our algorithms and write code
### Namespace
* A namespace is a container for related classes
* So as your application grows in size, you may want to group the related classes into various namespaces for better maintainability
* As the number of classes and namespaces even grow further, you may want to physically separate related namespaces into separate assemblies
  * An assembly is a file (DLL or EXE) that contains one or more namespaces and classes
    * An EXE file represents a program that can be executed
    * A DLL is a file that includes code that can be re-used across different programs
### Classes vs Structs
1. type
  * Struct (structure) is a value type
  * Class is a reference type
2. Storage
  * Struct are stored on stack
  * Classes are stored on heap
3. Memory
  * Value types hold their value in memory where they are declared
  * Reference types hold a reference to an object in memory
4. Destroy
  * Value types are destroyed immediately after the scope is lost
  * Only reference variables in reference types are destroyed after the scope is lost
    * the object is later destroyed by garbage collector
5. Copy
  * When a struct is copied into another struct, a new copy of that struct gets created & modifications on 1 struct will not affect the values contained by the other struct
  * When a class is copied into another class, only get a copy of the reference variable
    * both the reference variables point to the same object on the heap
    * operations on 1 variable will affect the values contained by the other reference variable
6. Destructors
  * Structs can't have destructors
  * Classes can have destructors
7. Explicit parameter
  * Structs cannot have explicit parameter & constructor
  * Classes can have explicit parameter & constructor
8. Inheritance
  * Structs can't inherit from another class
  * Class can inherit from another class
  * Both structs and classes can inherit from an interface
  * Both structs and classes cannot inherit from another struct (Struct are sealed types)
