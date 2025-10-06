# Groovy

- it allows optionally-typed dynamic capabilities

  - meaning you do not need to spell out the type of a field

- [Groovy Development Kit (GDK) Documentation](https://groovy-lang.org/gdk.html)

## Both Interpreted And Compiled Language

- it is a Java-syntax-compatible object-oriented programming language for the Java platform
- is both a static and dynamic language with features similar to those of Python
- can be used as both a programming language and a scripting language for the Java Platform
  - it is compiled to Java byte code that can run on the Java virtual machine (JVM)
  - interoperates seamlessly with other Java code and libraries
- allows optionally-typed dynamic capabilities
  - do not need to spell out the type of field
- allows advance programming
  - meta-programming, functional programming, closures
- supports authoring of domain-specific languages
  - jenkins file: to create a built pipeline with jenkins
  - gradle build script
- requires installation of `Java Development Kit` (JDK) to work
- allows duck typing: provides the option to use the `def` keyword to determine the type at runtime
- can also have a variable assign a concrete type
  - can tell groovy compiler to enforce static typing if needed
- auto generates getter and setter methods at runtime for class members
- contains Abstract Syntax Tree (AST) transformations: provides annotations for generating methods at runtime
  - such as defining constructors, equals, hashCode, toString methods
- automatically imports commonly-used packages
  - like `java.util.*` and `java.io.*`
- makes the default modifier as public, leading to less verbose code
- semicolons are optional, only required if want to define more than 1 statement on a single line

## GroovyShell and Console

- they are tools for running Groovy without a compiler
- GroovyShell is a `read-eval-print loop` (REPL) interpreter
- Groovy Console is a UI for executing a single-line Groovy statements

## Hello World

- using dynamic type method

```groovy
println "Hello World"
```

- using static type method

```groovy
class HelloWorld {
  static void main(String[] args) {
    // semicolons are optional
    // only needed if defining more than 1 statement on a single line
    println("Hello World");
  }
}
```

## Variable declaration

- follows java syntax

```groovy
int age = 40

// print variable type
println(age.getClass())
```

### Duck typing

- having the option to use a particular keyword for this case `def` to determine the type at runtime

```groovy
def msg = "string"
```

## Strings

```groovy
String test = "test"

println test  // test
println test.dropRight(1)  // tes
println test  // test
```

## Imports

- automatically imports commonly used packages like `java.util.*` and `java.io.*`

```groovy
import com.example.SomePackage
```

## Conditional Statements

```groovy
int age = 40

if (age == 40) {
  println "You are 40"
} else if (age > 40) {
  println "You are older than 40"
} else {
  println "You are younger than 40"
}
```

## Loops

```groovy
def strArr = ["a", "b", "c"];

for (String s : strArr) {
  println(s)
}
```

## Class

- Getter and Setter method are auto generated at runtime for class members

```groovy
class Person {
  String firstName
  String lastName
  int age

  String getFullName() {
    firstName + " " + lastName  // method 1
    // return firstName + " " + lastName  // method 2
  }
}

// method 1
Person person = new Person()
person.setFirstName("John");  // auto generated and not required to define
person.setLastName("Doe");
person.setAge(48);

println(person.getFullName())  // auto generated and not required to define
println(person.getAge())

// method 2: auto set via constructor
Person person2 = new Person("firstName": "Mary", "lastName": "Hill", "age": 40)

println(person2.getFullName())
println(person2.getAge())
```

### Access modifier

- default modifier is `public`

```groovy
class Operator {}
```

### Annotations

- it provides annotations for generating methods at runtime

```groovy
// method 1: without annotations
class Person {
  String firstName
  String lastName
  int age

  Person() {}

  Person(String firstName, String lastName, int age) {
    this.firstName = firstName
    this.lastName = lastName
    this.age = age
  }

  String getFullName() {
    return firstName + " " + lastName
  }

  @Override
  boolean equals(o) {
    if (this.is(o)) {
      return true
    }

    if (!(o instanceof Person)) {
      return false
    }

    Person person = (Person) o

    if (age != person.age) {
      return false
    }

    if (firstName != person.firstName) {
      return false
    }

    if (lastName != person.lastName) {
      return false
    }

    return true
  }

  @Override
  int hashCode() {
    int result
    result = (firstName != null ? firstName.hashCode() : 0)
    result = 31 * result + (lastName != null ? lastName.hashCode() : 0)
    result = 31 * result + age
    return result
  }

  @Override
  String toString() {
    return "Person(" + firstName + ", " + lastName + ", " + age + ", " + getFullName() + ")";
  }
}

Person person = new Person("firstName": "Mary", "lastName": "Hill", "age": 40)

assert person.toString() == "Person(Mary, Hill, 40, Mary Hill)"
assert person.equals(person2)
assert !person.equals(new Person("firstName": "John", "lastName": "Doe", "age": 30))
assert new Person("firstName": "Mary", "lastName": "Hill", "age": 40).toString() == "Person(Mary, Hill, 40, Mary Hill)"
```

```groovy
// method 2: using annotation
import groovy.transform.ToString
import groovy.transform.EqualsAndHashCode
import groovy.transform.TupleConstructor

@ToString
@EqualsAndHashCode
@TupleConstructor
class Person {
  String firstName
  String lastName
  int age

  String getFullName() {
    return firstName + " " + lastName
  }
}

Person person = new Person("firstName": "Mary", "lastName": "Hill", "age": 40)

assert person.toString() == "Person(Mary, Hill, 40, Mary Hill)"
assert person.equals(person2)
assert !person.equals(new Person("firstName": "John", "lastName": "Doe", "age": 30))
assert new Person("firstName": "Mary", "lastName": "Hill", "age": 40).toString() == "Person(Mary, Hill, 40, Mary Hill)"
```

```groovy
// method 3: using Canonical
import groovy.transform.Canonical

@Canonical
class Person {
  String firstName
  String lastName
  int age

  String getFullName() {
    return firstName + " " + lastName
  }
}

Person person = new Person("firstName": "Mary", "lastName": "Hill", "age": 40)

assert person.toString() == "Person(Mary, Hill, 40, Mary Hill)"
assert person.equals(person2)
assert !person.equals(new Person("firstName": "John", "lastName": "Doe", "age": 30))
assert new Person("firstName": "Mary", "lastName": "Hill", "age": 40).toString() == "Person(Mary, Hill, 40, Mary Hill)"
```

## Error handling

```groovy
String test = "test"

try {
  test.toLong()
} catch (NumberFormatException e) {
  assert e instanceof NumberFormatException
  println "Cannot convert a String into a Long"
}
```

## Closures

- it is an anonymous block of code defined within curly braces
- it is essential to writing and using domain-specific languages
- executed on demand
- used heavily across the Groovy API

```groovy
import groovy.transform.Canonical

@Canonical
class Person {
  String firstName
  String lastName
  int age
}

Person person = new Person()
person.setFirstName("John");
person.setLastName("Doe");
person.setAge(48);
```

```groovy
// method 1
Closure personToString = { println person.toString() }
personToString()  // Person(John, Doe, 48)

// method 2
Closure personToString2 = { Person _person -> println _person.toString() }
personToString2(person)  // Person(John, Doe, 48)

// method 3: pass Closure to a method and execute it
def handlePerson(Closure c, Person p) {
  if (p == null) {
    throw new RuntimeException("Person is null")
  }
  c(p)
}

handlePerson(personToString2, person)  // Person(John, Doe, 48)


// prints full name of a person
Closure personFullName = { Person _person ->
  println _person.firstName + " " + person.lastName
}

handlePerson(personFullName, person)  // John Doe
```

## Collections

- Groovy simplifies collection handling
- provides methods for manipulation, filtering, sorting, and querying entries
- closures are central element in collection usage

```groovy
import groovy.transform.Canonical

@Canonical
class Person {
  String firstName
  String lastName
  int age
}

Person johnDoe = new Person("firstName": "John", "lastName": "Doe", "age": 40)
Person maryHill = new Person("firstName": "Mary", "lastName": "Hill", "age": 30)
Person thomasMarks = new Person("firstName": "Thomas", "lastName": "Marks", "age": 21)
```

```groovy
// create a list
def persons = [johnDoe, maryHill, thomasMarks]

// querying collections
assert persons instanceof List
assert persons.size() == 3
assert persons[2] == thomasMarks


// iterate over elements
persons.each {
  println it
}
// Person(John, Doe, 40)
// Person(Mary, Hill, 30)
// Person(Thomas, Marks, 21)

// iterate over elements and using an index
persons.eachWithIndex { Person entry, int i ->
  println i + ": " + entry
}
// 0: Person(John, Doe, 40)
// 1: Person(Mary, Hill, 30)
// 2: Person(Thomas, Marks, 21)

// filtering a specific element
persons.find { it.lastName == "Hill" } == maryHill  // true

// transforming elements into something else
persons.collect { it.age <= 30 } == [false, true, true]  // true

// sorting elements based on a criterion
persons.sort { it.age } == [thomasMarks, maryHill, johnDoe]  // true
```

## File System

### Reading Files

- manages underlying file handle
- automatically closes file resources even in error conditions

```groovy
import groovy.transform.Canonical

@Canonical
class Person {
  String firstName
  String lastName
  int age
}

Person johnDoe = new Person()
```

```groovy
// read full contents of file
File file = new File("./john-doe.txt")
println file.getText("UTF-8")

// iterate over each line of file
file.eachLine { line, no ->
  if (no == 1) {
    johnDoe.setFirstName(line)
  } else if (no == 2) {
    johnDoe.setLastName(line)
  } else if (no == 3) {
    johnDoe.setAge(line.toInteger())
  } else {
    throw new RuntimeException("A person text file should only have 3 lines")
  }
}

println johnDoe
```

```groovy
def readAllNumbers() {
  File resourcesDir = new File("resources")  // folder name at current location
  List<Integer> allNumbers = []

  resourcesDir.eachFile { file ->
    file.eachLine { line ->
      if (line.isNumber()) {
        allNumbers << line.toInteger()
      }
    }
  }

  return allNumbers
}

// read numbers from files and store them in List
List<Integer> allNumbers = readAllNumbers()
println allNumbers  // [30, 12, 40]

// find the highest number
Integer maxNumber = allNumbers.max()
assert maxNumber == 40

// create the sum of all numbers
Integer sum = allNumbers.sum()
assert sum == 82
```

### Writing files

- able to populate a file with plain-text content
- provides shortcuts for appending to file content
- serializing objects with a single method call

```groovy
import groovy.transform.Canonical

@Canonical
class Person implements Serializable {  // only required for serializing
  String firstName
  String lastName
  int age
}

Person johnDoe = new Person()
```

```groovy
// create a file and populate contents
File textFile = new File("./mary-hill.txt")
textFile.withWriter("UTF-8") { writer ->
  writer.writeLine("Mary")
  writer.writeLine("Hill")
  writer.writeLine("30")
}

// appending contents to a file
textFile.append("1")  // method 1: adds to a new line
textFile << "2"  // method 2: adds to the end of the file

// serializing an object to a file
Person thomasMarks = new Person("Thomas", "Marks", 21)
File binFile = new File("./thomas-marks.bin")
binFile.withObjectOutputStream { out ->
  out.writeObject(thomasMarks)
}
```
