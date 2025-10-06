# c# summary notes

### C# vs .NET

- C# is a programming language
- .NET is a framework
  - It consists of a run-time environment (CLR) and a class library that we use for building applications

### Common Language Runtime (CLR)

- When you compile an application, C# compiler compiles your code to IL (Intermediate Language) code
- IL code is platform agnostics, which makes it possible to a take a C# program on a different computer with different hardware architecture and operating system and run it
  - For this to happen, we need CLR
- When you run a C# application, CLR compiles the IL code into the native machine code for the computer on which it is running
  - This process is called Just-in-time Compilation (JIT)

### Architecture of .NET Applications

- In terms of architecture, an application written with C# consists of building blocks called classes
  - A class is a container for data (attributes) and methods (functions)
    - Attributes represent the state of the application
    - Methods include code
      - they have logic
      - That's where we implement our algorithms and write code

### Namespace

- A namespace is a container for related classes
- So as your application grows in size, you may want to group the related classes into various namespaces for better maintainability
- As the number of classes and namespaces even grow further, you may want to physically separate related namespaces into separate assemblies
  - An assembly is a file (DLL or EXE) that contains one or more namespaces and classes
    - An EXE file represents a program that can be executed
    - A DLL is a file that includes code that can be re-used across different programs

### Classes vs Structures

- Use struct instead of class if instances of type are small & commonly short-lived / are commonly embedded in other objects
- Avoid defining a struct unless the type has all of the following characteristics
  1. it logically represents a single value, similar to primitive types (int, double, etc.)
  2. it has an instance size under 16 bytes
  3. it is immutable
  4. it will not have to be boxed frequently

1. type

   - Struct (structure) is a value type

     - All primitive types are structures (int, char, bool, etc.)

     ```c#
     // example 1
     // since a and b are value types, they are independent of each other
     int a = 10;
     int b = a;
     b++;
     System.Console.WriteLine($"{a}, {b}");  // 10, 11


     // example 2
     public class Program {
       public static void Main() {
         int number = 1;
         Increment(number);
         System.Console.WriteLine(number);  // value will still be 1
       }

       public static void increment(int number) {
         number += 10;
       }
     }
     ```

   - Class is a reference type

     - Non primitive types are classes (Arrays, Strings, etc.)

     ```c#
     // example 1
     // since array1 & array2 is a reference of the heap, when either 1 is modified, the rest will be affected
     int[] array1 = new int[3] {1, 2, 3};
     int[] array2 = array1;
     array2[0] = 0;
     System.Console.WriteLine($"{array1}, {array2}");  // [0, 2, 3], [0, 2, 3]


     // example 2
     public class Person {
       public int Age;
     }

     public class Program {
       public static void Main() {
         Person person = new Person() {Age=20};
         increment(person);
         System.Console.WriteLine(person.Age);  // 30
       }

       public static void increment(Person person) {
         person.Age += 10;
       }
     }
     ```

2. Storage
   - Memory of Structs are stored on stack
   - Memory of Classes are stored on heap
3. Memory
   - Value types hold their value in memory where they are declared
     - memory is allocated on stack and is done automatically
   - Reference types hold a reference to an object in memory
     - Need to allocate memory
4. Destroy
   - Value types are destroyed immediately after the scope is lost
     - Data will be immediately removed when out of scope
   - Only reference variables in reference types are destroyed after the scope is lost
     - data will remain in the memory temporary
     - the object is later destroyed by garbage collector
5. Copy
   - When a struct is copied into another struct, a new copy of that struct gets created & modifications on 1 struct will not affect the values contained by the other struct
   - When a class is copied into another class, only get a copy of the reference variable
     - both the reference variables point to the same object on the heap
     - operations on 1 variable will affect the values contained by the other reference variable
6. Destructors
   - Structs can't have destructors
   - Classes can have destructors
7. Explicit parameter
   - Structs cannot have explicit parameter & constructor
   - Classes can have explicit parameter & constructor
8. Inheritance
   - Structs can't inherit from another class
   - Class can inherit from another class
   - Both structs and classes can inherit from an interface
   - Both structs and classes cannot inherit from another struct (Struct are sealed types)

### Abstract classes vs Interfaces

- abstract classes can have implementations for some of its methods
  - interfaces cannot have any implementations for all of its methods
- abstract classes can have fields (variable declared outside of a method)
  - interfaces cannot have fields
- abstract classes can inherit from another abstract class or another interface
  - interface can only inherit from another interface
- abstract classes can only inherit from 1 class or multiple interfaces at the same time
  - interface can only inherit from 1 or multiple interfaces at the same time
- abstract class members can have access modifiers (public, private, protected, etc)
  - interface cannot have access modifiers
