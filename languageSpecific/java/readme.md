# Java
- what is java
  - concurrent
  - class-based
  - object-oriented
  - platform-independent
  - generates bytecode
  - runs on Java Virtual Machine (JVM)
    - each java app executes within its own instance of the JVM
    - the operating system treats that JVM instance as a separate, independent process
    - thus if multiple java apps were run at the same time, they will each execute in a separate JVM process with their own independent memory space
  - incorporates a garbage collector
  - derives its syntax from C++
## Table of Contents
- [Compiled Language](#compiled-language)
- [Accessibility](#accessibility)
- [Hello World](#hello-world)
- [Comments](#comments)
- [Print](#print)
- [Data types](#data-types)
- [Variable declaration](#variable-declaration)
- [Variable declaration int](#variable-declaration-int)
- [Variable declaration float](#variable-declaration-float)
- [Variable declaration None](#variable-declaration-none)
- [Strings](#strings)
- [Boolean](#boolean)
- [Arithmetic Operators](#arithmetic-operators)
- [Comparison Operators](#comparison-operators)
- [Logical Operators](#logical-operators)
- [Getting Input](#getting-input)
- [Bitwise Operators](#bitwise-operators)
- [Increment](#increment)
- [Arrays and Lists](#arrays-and-lists)
- [Conditional Statement](#conditional-statement)
- [Loops](#loops)
- [Instantiation](#instantiation)
- [Functions](#functions)
- [Higher order functions](#higher-order-functions)
- [Hash Tables](#hash-tables)
- [Collections](#collections)
- [Destructuring](#destructuring)
- [Spread Operator](#spread-operator)
- [Rest parameters](#rest-parameters)
- [Class](#class)
- [Importing Libraries](#importing-libraries)
- [Type Conversions](#type-conversions)
- [Find Data Type](#find-data-type)
- [String Concatenation](#string-concatenation)
- [JSON](#json)
- [Program Entry Point](#program-entry-point)
- [Swapping values](#swapping-values)
- [Error Handling](#error-handling)
- [Custom Error](#custom-error)
- [Asynchronous](#asynchronous)
- [Math](#math)
- [Date and Time](#date-and-time)
- [Access modifier](#access-modifier)
- [File System](#file-system)
- [Iterators](#iterators)
- [Generators](#generators)
- [Fetching Web Data](#fetching-web-data)
- [Enum](#enum)
- [Language Specific](#language-specific)

## Compiled Language  
### Statically-typed Language: resolution of types, members, properties, methods are done at compile-time
#### trying to access a method that is not defined in an object when compiling the app will get an immediate error feedback
* Java: compiled to bytecode then interpreted by Java virtual machine into machine code
  - Features
    - not compatible with other languages
    - calls to native functions go through Java Native Interface (JNI)
    - write once, run anywhere
    - runs in a protected Java Virtual Machine (JVM)
    - managed memory access
    - limited to single inheritance
    - class-based inheritance
  - Types
    - Java Platform, Standard Edition (SE)
      - Core language and Java Runtime Environment (JRE)
    - Java Platform, Enterprise Edition (EE)
      - Recommendation for industrial-strength web applications
    - Java Platform, Micro Edition (ME)
      - Microcontrollers, sensors, mobile devices, telephone sim cards
      - A subset of Java SE
    - Java FX
      - Desktop appication framework (windows, mac, linux)
  - Automatic memory management
    - memory for objects are allocated automatically
    - local variables & function calls are stored in stack
    - objects & member variables are stored in heap
    - objects are retained in memory until dereferenced
    - object is eligible for collection when all references expire
      - when do references expire
        - variables local to methods or code blocks expire with scope
        ```java
        void changeString() {
          String localVar = "Won't be around for long!";
          System.out.println("In function: " + localVar);
        }
        ```
        - explicitly dereference variables with null keyword
        ```java
        void changeString() {
          String localVar = "Won't be around for long!";
          tempVar = null;
        }
        ```
    - when Java Virtual Machine runs out of memory for a newly requested object
      - the system throws ```OutOfMemoryError```
      - Tips for managing memory
        - minimize the number of objects created
        - find out how much memory is available & is currently in used in the virtual machine
          - ```Runtime.maxMemory()``` & ```Runtime.totalMemory()```
        - setting available memory
          - use command line options to manage amount of available heap memory
            - set inital heap size ```java -Xms256s HelloWord```
            - set max heap size ```java -Xmx256m HelloWord```
            - set heap size for new objects ```java -Xmn256n HelloWord```
  - Java Garbage Collector
    - runs in its own thread
    - allocates & deallocates memory
    - can destroy dereferenced objects, but not required
    - garbage collection is managed by the Virtual Machine
    - cannot force garbage collection as it is an automatic process
      - Can run System methods to call garbage collection
        - Methods ```System.gc()``` & ```Runtime.gc()``` can request garbage collection
          - but there is no guarantee it will happen
  - Identifiers and Keywords
    - Keywords can't be used as class or other identifiers
    - class, method, field, and other names are identifiers
    - identifiers must start with alpha character or underscore
  - Identifier conventions
   - classes are always Pascal case ```class MyClass {}```
   - methods and variables are Camel case ```void doSomething(String withThis) {}```
   - constants are all uppercase ```public static final String FIRSTNAME="Myname";```
     - ```final``` means once it has been set, it can't be changed

[back to top](#table-of-contents)

## Accessibility
|modifier|same class|same package|subclass|everywhere else|
|-|-|-|-|-|
|public|Y|Y|Y|Y|
|protected|Y|Y|Y|N|
|no modifier aka "package private" |Y|Y|N|N|
|private|Y|N|N|N|

[back to top](#table-of-contents)

## Hello World 
- java classes are typically organized into packages
  - package is a global unique string that usually starts with your domain name in reverse domain order
    - ensures globally unique identifiers (e.g.: Main)
      - if there are more than 1 class named Main in an app
        - can be distinguished by using the package
- each source code file will contain 1 public class
- ```public``` visible to all classes
- ```protected``` visible to class they belong and any subclasses
- ```private``` (most restricted): visible only to class they belong
- ```static``` can be accessed without creating a class instance
- ```final``` constant value, value cannot be changed
- ```void``` means that the method doesn't return any value
```java
package com.example;  // package declaration

// class declaration
public class HelloWorld {
  // main method: always have the 3 keywords (public, static, void)
  // must also receive an array of strings as an argument
  public static void main(String[] args) {
    // executable code
    System.out.println("Hello World");  // adds new line after printing
    System.out.print("Hello World");  // no new line is added after
  }
}
```

[back to top](#table-of-contents)

## Comments
```java
// Single line comment

/*
multi-line comments
*/

/**
 * javadoc <b>comments</b> for classes, javadocs can be used to auto generate documentation documents for code commented with javadocs
 */
 
 /**
 * javadoc <b>comments</b> for methods with parameters - example main method
 * @param args - an array of string values
 */
```

[back to top](#table-of-contents)

## Print
```java
System.out.println("Hello World");  // adds new line after printing
System.out.print("Hello World");  // no new line is added after
```
- formatting
  - [print format reference](https://www.baeldung.com/java-printstream-printf)
  - `s` for strings
  - `S` for uppercase strings, it converts lowercase to uppercase
  - `c` for characters
  - `C` for uppercase characters
  - `d` for byte, short, int, long, and BigInteger
  - `f` for float and double
  - `t` for date/time values
    - time
      - `T` for time hh:mm:ss
      - `H` for hours
      - `M` for minutes
      - `S` for seconds
      - `L` for milliseconds
      - `N` for nanoseconds
      - `p` adds a.m./p.m. formatting
      - `z` prints out the time-zone offset
    - data
      - `A` prints out the full day of the week
      - `d` formats a two-digit day of the month
      - `B` is for the full month name
      - `m` formats a two-digit month
      - `Y` outputs a year in four digits
      - `y` outputs the last two digits of the year
  - `n` for line separator
  - `b` for boolean
```java
// syntax
System.out.printf(format, arguments);
System.out.printf(locale, format, arguments);

// example
System.out.printf("Hello %s!%n", "World");  // Hello World!

// add left spaces
System.out.printf("'%15s' %n", "baeldung");  // '       baeldung'

// add right spaces
System.out.printf("'%-10s' %n", "baeldung");  // 'baeldung  '

// limit number of characters in string
/*
%x.ys syntax
x is the padding, y is the number of chars
*/
System.out.printf("%2.2s", "Hi there!");  // 'Hi'


// control float precision
/*
%x.yf syntax
x is the padding, y is the number of decimal places
*/
System.out.printf("'%5.2f'%n", 5.1473);  // ' 5.15'

// using locale to format numbers
import java.util.Locale;
System.out.printf(Locale.US, "%,d %n", 10000);  // 10,000
System.out.printf(Locale.ITALY, "%,d %n", 10000);  // 10.000

// dates
import java.util.Date;
System.out.printf("%tT%n", date);  // 13:51:15
System.out.printf("hours %tH: minutes %tM: seconds %tS%n", date, date, date);  // hours 13: minutes 51: seconds 15

// extracting from 1 argument
System.out.printf("hours %1$tH: minutes %1$tM: seconds %1$tS%n", date);  // hours 13: minutes 51: seconds 15

// date words format
System.out.printf("%1$tA, %1$tB %1$tY %n", date);  // Thursday, November 2018

// date numeric format
System.out.printf("%1$td.%1$tm.%1$ty %n", date);  // 22.11.18

```

[back to top](#table-of-contents)


## Data types
### java 8
#### 2 major data types
1. Primitive data types
    - stored in fastest available memory
    - names are all camel case
    - Java class library includes helper classes for each primitive
      - helper classes support conversion and formatting tools
      - ```import java.lang.Byte;```  import not required from java.lang libraries
    - all primitive numeric variables default to 0
    ```java
    public class Main {
      private static int myInt;  // must be declared as static of a class to have default value
    
      public static void main(String args[]) {
        System.out.println(myInt);  // 0
      }
    }
    ``` 
    - data types
      - numbers
        - byte
          - 8 bits
          - -128 to 127
          - default value ```0```
          - helper class ```Byte```
        - short
          - 16 bits
          - -32,768 to 32,767
          - default value ```0```
          - helper class ```Short```
        - int
          - 32 bits
          - -2,147,483,648 to 2,147,483,647
          - default value ```0```
          - helper class ```Integer```
        - long
          - 64 bits
          - -9.22337E+18 to 9.22337E+18
          - default value ```0L```
          - helper class ```Long```
        - float
          - 32 bits
          - default value ```0.0f``` or ```0.0F``` or ```.0f``` or ```.0F```
          - helper class ```Float```
        - double
          - 64 bits
          - default value ```0.0d``` or ```0.0D``` or ```.0d``` or ```.0D```
          - helper class ```Double```
          ```java          
          double doubleValue = 156.5d;
          Double doubleObj = new Double(doubleValue);  // declare instance of the double class
          int intValue = doubleObj.intValue();  // 156, use helper object to convert to desired numeric data type
          ```
      - characters
        - '\u0000' (or 0) to '\uffff' (or 65,535 inclusive)
        - default value ```'\u0000'```
      - booleans
        - default value ```false```
2. Objects
    - an object is an instance of a class
    - nonprimitive variables are references to objects
    - objects can have multiple references
    - Object data types
      - String
        - a complex object
        - is an instance of the string class
        - is an array of characters
        - string objects are immutable
        - reasigning the string value creates a new object
          - the old object can be cleared from memory thrown garbage collection process
        - helper class is ```java.lang.String```, thus import not required
        ```java
        String string1 = new String("Hello");
        ```

[back to top](#table-of-contents)

## Variable declaration
- multi variables declaration
  ```java
  double num1, num2, num3;
  ```
- type inference: starting from `java 10`
  - use `var` key word
  - type is derived from assigned value
  ```java
  var myVar = 5;  // data type becomes integer
  ```
- primitive numbers are always signed
- `long` and `integer` methods support unsigned operations
  ```java
  int unsigned = Integer.parseUnsignedInt("3000000000");
  System.out.println(unsigned);  // -1294967296

  int result = Integer.divideUnsigned(unsigned, 2);
  System.out.println(result);  // 1500000000

  int unsigned2 = Integer.parseUnsignedInt("300");
  System.out.println(unsigned2);  // 300

  int result2 = Integer.divideUnsigned(unsigned2, 2);
  System.out.println(result2);  // 150
  ``

[back to top](#table-of-contents)


## Variable declaration int
- integer ...-2, -1, 0, 1, 2...
```java
// public/private/protected static final byte/short/int/long integerName = 123;
/* 
public: visible to all classes
protected: visible to class they belong and any subclasses
private (most restricted): visible only to class they belong
static: can be accessed without creating a class instance
final: constant value, value cannot be changed
*/

// byte: -128 ~ 127, 8 bits
// wrapper class: Byte
byte byteName = 123;

// short: -32768 ~ 32767, 16 bits
// wrapper class: Short
short shortName = 123;

// int: -2^31 ~ 2^31 - 1, -2147483648 ~ 2147483647, -2_147_483_648 ~ 2_147_483_647, 32 bits
// wrapper class: Integer
int integerName; integerName = 123;
int integerName2 = 123;  // default is visible within the same package

// long: -2^63 ~ 2^63 - 1, -9223372036854775808L ~ 9223372036854775807L, can use _ same as int, 64 bits
// wrapper class: Long
long longName1 = 123l;  // 123
long longName2 = 123L;  // 123
long longName3 = 10_000;  // 10000, introduced in java 7, just makes it easier to read
```

[back to top](#table-of-contents)

## Variable declaration float
- float, double
```java
// float: 32 bits, 4 bytes
// wrapper class: Float
float float_name = 1.123f;  // 1.123, have 7 decimal digits
float float_name = (float) 1.123;

// double: 64 bits, 8 bytes
// wrapper class: Double
double double_name = 1.123d;  // 1.123, have 16 decimal digits
double double_name = 1.123;

// using BigDecimal math class
import java.math.BigDecimal;

public class Main {

  public static void main(String[] args) {
    double value = .012;
    double pSum = value + value + value;
    System.out.println(pSum);  // 0.036000000000000004
    
    String strValue = Double.toString(value);
    System.out.println(strValue);  // 0.012

    BigDecimal bigValue1 = new BigDecimal(value);
    BigDecimal bSum1 = bigValue1.add(bigValue1).add(bigValue1);
    System.out.println(bSum1.toString());  // 0.0360000000000000007494005416219806647859513759613037109375
    
    // convert double value to string for accuracy
    BigDecimal bigValue2 = new BigDecimal(strValue);
    BigDecimal bSum2 = bigValue2.add(bigValue2).add(bigValue2);
    System.out.println(bSum2.toString());  // 0.036
  }
}
```

[back to top](#table-of-contents)

## Variable declaration None
```java
String stringName = null;

// NaN is produced if a floating point operation
float floatName = Float.NaN;  // NaN
double doubleName = Double.NaN;  // NaN

Double x = new Double(-2.0/0.0);  // -Infinity
Double y = new Double(0.0/0.0);  // NaN
x.isNaN();  // false
y.isNaN();  // true

System.out.println(2.0 / 0);  // Infinity

// set infinity value
double inf = Double.POSITIVE_INFINITY;  // Infinity
double inf = Double.NEGATIVE_INFINITY;  // -Infinty
```

[back to top](#table-of-contents)

## Strings
- characters
```java
// character: 16 bits, 2 bytes, only 1 letter or symbol, must use single quotes ''
// wrapper class: Character
char charName1 = 'a';
char charName2 = '\u0061';  // unicode character for the letter a

// modify character cases
Character.toUpperCase(charName1);  // 'A'
Character.toLowerCase(charName1);  // 'a'

// convert Char Array to a string
char[] chars = {'H', 'e', 'l', 'l', 'o'};
String s = new String(chars);  // "Hello"

// convert string to char array
char[] chars2 = s.toCharArray();
for (char c : chars2) {  // for each loop
  System.out.print(c);  // "Hello"
}
```
- strings
```java
// convert primitive values to string
int intValue = 42;
String fromInt = Integer.toString(intValue);  // "42"

boolean boolValue = true;
String fromBool = Boolean.toString(boolValue);  // "true"


// strings: must use double quotes ""
String stringName = new String("Hello");  // method 1
String stringName1 = "string";  // method 2
String stringName2 = "multi-line " +
                     "string";


// get character of string with index
char charName = stringName1.charAt(0);  // 's'

// get character code
int charCode = (int) charName;  // 115

// get character code difference
System.out.println('b' - 'a');  // 98 - 97 = 1

// modify string cases
String stringName3 = stringName1.toUpperCase();  // "STRING"
String stringName4 = stringName3.toLowerCase();  // "string"


// get length of string
stringName4.length();  // 6

// get index of substring
int index = stringName4.indexOf("ng");  // 4

// get substring with index
String sub1 = stringName4.substring(4);  // "ng"
String sub2 = stringName4.substring(4, 6);  // "ng" from starting index to but exclude last index

// trim whitespaces from beginning and ending of string
String trimStr = "  test  ";
String newStr = trimStr.trim();  // "test"


// toString method: convert primitive numeric values to string
double doubleValue = .5d;
String stringName5 = Double.toString(doubleValue);  // "0.5"

// comparing strings
String str1 = "Hello";  // object 1
String str2 = "Hello";  // str2 points to str1, thus is still object 1
str1 == str2;  // true

String part1 = "Hello ";
String part2 = "World";
String str3 = part1 + part2;  // object 1
String str4 = "Hello World";  // object 2
str3 == str4;  // false
// need to use .equals()
str3.equals(str4);  // true
```

[back to top](#table-of-contents)

## Boolean
- wrapper class: `Boolean`
```java
boolean booleanName1 = true;
boolean booleanName2 = false;
boolean booleanName3 = !booleanName2;  // true

String sBoolean = "true";
boolean booleanName4 = Boolean.parseBoolean(sBoolean);  // true
```

[back to top](#table-of-contents)

## Arithmetic Operators
- addition: ```+```
- subtraction: ```-```
- multiplication: ```*```
- division: ```double double_name = 3.0/2;  // output 1.5, 3/2 output 1```
- modulus: ```%```
- exponent: ```Math.pow(3, 2);  // output 9```
- floor division: ```int integer_name = 3/2;  // output 1```

[back to top](#table-of-contents)

## Comparison Operators
- ```==```
  - reference comparison
    ```java
    String s1 = new String("string value");
    String s2 = new String("string value");
    System.out.println(s1 == s2);  // false
    
    String s3, s4;
    s3 = "string value";
    s4 = "string value";
    System.out.println(s3 == s4);  // true
    ```
  - use equals method to compare string values
    ```java
    String s1 = new String("string value");
    String s2 = new String("string value");
    System.out.println(s1.equals(s2));  // true
    ```
  - use equalsIgnoreCase to ignore cases
    ```java
    String s1 = new String("String value");
    String s2 = new String("string value");
    System.out.println(s1.equals(s2));  // false
    System.out.println(s1.equalsIgnoreCase(s2));  // true
    ```
- ```!=```
- ```>```
- ```<```
- ```>=```
- ```<=```
- ```instanceof``` class membership
```java
String s = "Hello";
if (s instanceof java.lang.String) {
  System.out.println(true);
}
```

[back to top](#table-of-contents)

## Logical Operators
- `&&` and
- `||` or
- `^` exclusive or
- `!` not
- `?=` Ternary (shorthand if-then)

[back to top](#table-of-contents)

## Getting Input
- must import scanner library 
```java
import java.util.Scanner;
```
```java
// print question
System.out.println("What's your name?");

// get raw input
Scanner scanner = new Scanner(System.in);
// convert raw value to string type
// can read the input only till the space
// It can't read two words separated by a space
// places the cursor in the same line after reading the input
String input = scanner.next();
// reads input including space between the words till the end of line \n
// Once the input is read, positions the cursor in the next line
String input1 = scanner.nextLine();
// convert raw value to int type
Int input2 = scanner.nextInt();
```
- single input
```java
String name;
try (Scanner in = new Scanner(System.in)) {
  System.out.println("Enter your name: ");
  name = in.nextLine();
}
System.out.println("name is " + name);
```
- multiple inputs
```java
String firstname, surname;
try (Scanner in = new Scanner(System.in)) {
  System.out.println("Enter your first name and then your surname: ");
  firstname = in.nextLine();
  surname = in.nextLine();
}
System.out.println("name is " + firstname + " " + surname);
```

[back to top](#table-of-contents)

## Bitwise Operators
```java
// & is binary AND, return 1 if both a and b are 1, count the 1s
a & b  // 12 = ...0000 1100
    
// | is binary OR, return 1 if either a and or b HAVE a 1
a | b  // 61 = ...0011 1101
    
// ^ is binary XOR, return 1 if both a and b are not 1 or 0
a ^ b  // 49 = ...0011 0001
    
// ~ is binary ones complement, invert everything, 1 change to 0 and vice versa, count the 0s
~a  // -61 = ...1100 0011
    
// << is binary left shift, shift everything to the left by n digit(s)
a << 2  // 240 = ...1111 0000
    
// >> is Sign-propagating right shift, a binary right shift, shift everything to the right by n digit(s)
a >> 2  // 15 = ...0000 1111
c >> 2  // 3 = ...0000 0010, count the 1s
c = -9  // -9 = ...1111 0111
c >> 2  // -3 = ...1111 1101, count the 0s
    
// >>> is Zero fill right shift, shift everything to the right by n digits(s), leftmost will add n 0s
c >>> 2  // 2 = ...0000 0010, count the 1s
c = -9  // -9 = ...1111 0111
c >>> 2  // 1073741821 = 0011...1111 1101, count the 0s
```

[back to top](#table-of-contents)

## Increment
* `x = x + 1;`
* `x += 1;`
* `++x;` preincrement, add 1 now
* `x++;` postincrement, display without addition now then add 1 later when called again

[back to top](#table-of-contents)

## Arrays and Lists
- Arrays
  - can only have 1 data type: string, int, etc.
  - printing this only shows the memory
```java
// Empty string array of desired array size
String[] string_array = new String[length_of_desired_array];
// New string array with elements inside
String [] string_array = new String [] {string1, string2,...};  // Method 1
String[] string_array = {string1, string2,...};  // Method 2

// Add string array element, limited to array size
// Modify string array element value
string_array[index] = element;

// Access an element
string_array[index];

// Find array size
string_array.length;

// Copy array
int sourceArrStartingIndex = 1;
int destinationArrStartingIndex = 0;
int copiedArrLen = 2;
String[] copiedArr = new String[copiedArrLen];
System.arraycopy(sourceArr, sourceArrStartingIndex, copiedArr, destinationArrStartingIndex, copiedArrLen);  // {"apple", "pear"}

// multidimensional array
String[][] states = new String[3][2];
states[0][0] = "Japan";
states[0][1] = "Tokyo";
```
- Sorting an array
  - Sort array, can sort numbers, strings, etc.
```java
import java.util.Arrays;
```
```java
String[] sourceArr = {"orange", "apple", "pear"};
Arrays.sort(sourceArr);  // {"apple", "orange", "pear"}
```
- Arraylist
  - it is a class, extends the AbstractList class and implements List interface
  - used to create a dynamic array that contains objects
  - creates an array of objects where the array can grow dynamically
  - can only have 1 data type: string, int, class, etc.
```java
import java.util.ArrayList;
```
```java
// Empty string arrayList
ArrayList<String> arrayList = new ArrayList<String>();

// Add element to string arrayList (left to right)
arrayList.add(element);

// Modify an element at index
arrayList.set(index, element);

// Access an element
arrayList.get(index);

// Remove element from arrayList at index
arrayList.remove(index);

// Find arrayList size
arrayList.size();

// Remove all elements
arrayList.clear();
```
- List
  - it is an interface, extends the Collection framework
  - used to create a list of elements(objects) which are associated with their index numbers
  - creates a collection of elements that are stored in a sequence and they are identified and accessed using the index
  - printing this shows the actual array
```java
import java.util.List;
import java.util.Arrays;
import java.util.ArrayList;
```
```java
// method 1
List<String> list = Arrays.asList(element, element, ...)

// method 2
List<String> list = new ArrayList<>();  // from java 7 onwards redundent <String> is not required, can just use <>

// Add element to string List (left to right)
list.add(element);

// Remove element from list at index
list.remove(index);

// Access an element
list.get(index);

// Find index of an element
list.indexOf(element);
```

[back to top](#table-of-contents)

## Conditional Statement
```java
// If else statement
if (condition_a) {
    do_A;
} else if (condition_b) {
    do_B;
} else {
    do_something_else;
}


// {} not required if statement is a single line
if (condition_a)
    do_A;  // Single line statement
else if (condition_b)
    do_B;  // Single line statement
else
    do_something_else;  // Single line statement


// Ternary operator
condition_a ? do_A : do_B;


// Switch statement
switch(choice) {  // choice value can only be primitive values in java 7, since java 8 strings are also accepted
    case choice_A:
        do_A;
        break;
    case choice_B:
        do_B;
        break;
    default:
        do_something_else;
        break;  // not required, but good to have in Java
}
```

[back to top](#table-of-contents)

## Loops
```java
// While loop
// declare_initial_conditional_value
int i = 0;
// Set condition
while (i<5) {  // Start from 0 to 4
    doThis;
    // Include condition_increment_or_decrement;
    i++;
    // Can use break or continue to add additional functionality, or not use any
    break;  // Breaks out of the current closest enclosing loop
    continue;  // Goes to the top of the closest enclosing loop
}

// Do while loop: execute first before setting conditions
// declare_initial_conditional_value
int i = 0;
do {  // Start from 0 to 4
    doThis;
    // Include condition_increment_or_decrement;
    i++;
// Set condition
} while (i<5);

// For loop
for (int i=0; i<5; i++) {  // Start from 0 to 4
    doThis;
    // Can use break or continue to add additional functionality, or not use any
    break;  // Breaks out of the current closest enclosing loop
    continue;  // Goes to the top of the closest enclosing loop
}
// Reverse loop
for (int i=4; i>=0; i--) {  // Start from 4 to 0
    doThis;
}

// for each loop, can also loop collections with iterators
char[] chars = {'H', 'e', 'l', 'l', 'o'};  // an array can only have a single data type
for (char c : chars) {  // for each element in the array
  doThis;
}
```

[back to top](#table-of-contents)

## Instantiation
```java
public class ClassName {
  public String type;  // instance variable
  
  public static void main(String[] args) {
    ClassName t = new ClassName();  // instantiation
    t.type = "something";
    t.display();
    
    doSomething();  // can call static method directly
  }
  
  // instance method
  private void display() {}
  
  // static method
  static void doSomething() {}
}
```

[back to top](#table-of-contents)

## Functions
```java
// Normal functions
public static void myFunction() {
  do_something;
}


// Normal function with parameters
public static void myFunction(dataType a){
  do_something_with_a
}


// Normal function with return value (change void to data type to return)
public static int sum(int a){
  return a + 1;
}
```
- Lambda
  - interface
    - an interface that contains at most one abstract function
    - represents abstract concepts such as functions, actions, or predicates
    - `Predicate:` takes 1 argument, returns a Boolean
      ```java
      import java.util.function.Predicate;
      ```
      ```java
      Predicate<String> stringLen = (s) -> s.length() < 10;
      System.out.println(stringLen.test("Apples") + " - Apples is less than 10");  // true - Apples is less than 10
      ```
    - `Consumer` accepts single argument with no return value
      ```java
      import java.util.function.Consumer;
      ```
      ```java
      Consumer<String> consumerStr = (s) -> System.out.println(s.toLowerCase());
      consumerStr.accept("ABCDefghij");  // abcdefghij
      ```
    - `Function` accepts 1 argument and produces a result
      ```java
      import java.util.function.Function;
      ```
      ```java
      Function<Integer, String> converter = (num) -> Integer.toString(num);
      System.out.println("length of 26: " + converter.apply(26).length());  // length of 26: 2
      ```
    - `Supplier` represents a supplier of results
      ```java
      import java.util.function.Supplier;
      ```
      ```java
      Supplier<String> s = () -> "Java is fun";
      System.out.println(s.get());  // Java is fun
      ```
    - `Runnable` similar to `Supplier`
    ```java
    // method 1
    Runnable r1 = new Runnable() {
      @Override
      public void run() {
        System.out.println("run");
      }
    };
    r1.run();  // run
    
    // method 2
    Runnable r2 = () -> System.out.println("run");
    r2.run();  // run
    ```
    - `UnaryOperator` single argument with a return value
      ```java
      import java.util.function.UnaryOperator;
      ```
      ```java
      UnaryOperator<String> str = (msg) -> msg.toUpperCase();
      System.out.println(str.apply("Msg in upper case"));  // MSG IN UPPER CASE
      
      UnaryOperator<String> makeGreeting = "Hello, "::concat;
      System.out.println(makeGreeting.apply("World"));  // Hello, World
      ```
    - `BinaryOperator` takes 2 arguments and returns value
      ```java
      import java.util.function.BinaryOperator;
      ```
      ```java
      BinaryOperator<Integer> add = (a, b) -> a + b;
      System.out.println(add.apply(10, 25));  // 35
      ```
    - `BiFunction` similar to `BinaryOperator`
      ```java
      import java.util.function.BiFunction;
      ```
      ```java
      BiFunction<String, String, String> concat = (a, b) -> a + b;
      String sentence = concat.apply("Today is ", "a great day");
      System.out.println(sentence);  // Today is a great day
      ```
    - custom interface
      ```java
      @FunctionalInterface  // not a must but better to have
      interface StringFunction {
        String doSomething(String str);
      }
      ```
      ```java
      StringFunction strFunc = (s) -> s;
      System.out.println(strFunc.doSomething("test"));  // test
      ```
    - method as lambdas
      ```java
      import java.util.function.Function;
      import java.util.function.IntFunction;
      ```
      ```java
      // method 1
      IntFunction<String> intToString = num -> Integer.toString(num);
      System.out.println(intToString.apply(123));  // 123

      // method 2: static method reference using ::
      IntFunction<String> intToString2 = Integer::toString;
      System.out.println(intToString2.apply(123));  // 123
      ```
      - lambdas made using a constructor
        ```java
        import java.math.BigInteger;
        ```
        ```java
        // method 1
        Function<String, BigInteger> newBigInt1 = (num) -> new BigInteger(num);
        System.out.println("expected value: 123456789, actual value: " + newBigInt1.apply("123456789"));  // expected value: 123456789, actual value: 123456789
    
        // method 2
        Function<String, BigInteger> newBigInt2 = BigInteger::new;
        System.out.println("expected value: 123456789, actual value: " + newBigInt2.apply("123456789"));  // expected value: 123456789, actual value: 123456789
        ```
      - lambdas made from an instance method
        ```java
        import java.util.function.Consumer;
        ```
        ```java
        // method 1
        Consumer<String> print1 = (str1) -> System.out.println(str1);
        print1.accept("Hello World");  // Hello World
        
        // method 2
        Consumer<String> print2 = System.out::println;
        print2.accept("Hello World");  // Hello World
        ```

```java
// import java.util.ArrayList;
// import java.util.function.Consumer;  // must import

// store non returning function
ArrayList<Integer> numbers = new ArrayList<Integer>();
numbers.add(5);
Consumer<Integer> method = (n) -> { System.out.println(n); };  // can remove {} if is one liner

// method 1
numbers.forEach( method );  // 5

// method 2
numbers.forEach( (n) -> { System.out.println(n); } );  // 5
```
- method overloading
```java
static double addValues(String s1, String s2) {
  double d1 = Double.parseDouble(s1);
  double d2 = Double.parseDouble(s2);
  double result = d1 + d2;
  return result;
}

static double addValues(String s1, String s2, String s3) {
  double d1 = Double.parseDouble(s1);
  double d2 = Double.parseDouble(s2);
  double d3 = Double.parseDouble(s3);
  double result = d1 + d2 + d3;
  return result;
}
```

[back to top](#table-of-contents)

## Higher order functions

[back to top](#table-of-contents)

## Hash Tables 
- Hash Tables, Dictionaries, Objects
```java
// Map: it is an interface used to store data in key-value pair
import java.util.Map;  // must import

// HashMap: it is the implementation class of the Map interface
import java.util.HashMap;  // must import

// Set: it is an interface used to store data in value without duplicates
import java.util.Set;

// HashSet: It is the implementation class of the Set interface
import java.util.HashSet;
```
```java
// declaration of maps
Map<String, String> map = new HashMap<>();
// Map<Integer, Boolean> map = new HashMap<>();

// add key value pair
map.put("jp", "Japan");
map.put("sg", "Singapore");
map.put("usa", "United States");
System.out.println(map);  // { jp=Japan, sg=Singapore, usa=United States }

// get value with key
map.get("jp");  // "Japan"

// check if key exists
map.containsKey("kr");  // false

// remove key value pair with key
map.remove("sg");  // { jp=Japan, usa=United States }

// get a set of keys
// import java.util.Set;  // must import
Set<String> keys = map.keySet();  // [ usa, jp ]


// declaration of sets
Set<Integer> numbers = new HashSet<Integer>();

// add value
numbers.add(1);

// check if value exists
numbers.contains(1);  // true

// Check if a HashSet is empty
numbers.isEmpty();

// Find the size of a HashSet
numbers.size();

// Remove an element from a HashSet (The remove() method returns false if the element does not exist in the HashSet)
boolean isRemoved = numbers.remove(10);

// Remove all elements matching a given predicate
numbers.removeIf(num -> num % 2 == 0);

// Remove all elements from HashSet (clear it completely)
numbers.clear();
```

[back to top](#table-of-contents)

## Collections
- introduced in Java 7
- it is a group of elements
- can store, retrieve, manipulate, and communicate aggregate data
```java
import java.util.List;
import java.util.Arrays;
import java.util.Comparator;
import java.util.Collections;
```
```java
List<String> names = Arrays.asList("Paul", "Jane", "Michaela", "Sam");

// method 1
Collections.sort(names, new Comparator<String>() {
  @Override
  public int compare(String a, String b) {
    return a.compareTo(b);  // ascending order
  }
});
System.out.println(names);  // [Jane, Michaela, Paul, Sam]

// method 2 using lambda
Collections.sort(names, (a, b) -> b.compareTo(a));  // descending order
System.out.println(names);  // [Sam, Paul, Michaela, Jane]
```
- removing duplicates
  - elimate duplicates and auto sort
  ```java
  import java.util.Arrays;
  import java.util.Collection;
  import java.util.HashSet;
  import java.util.List;
  import java.util.Set;
  ```
  ```java
  List<Integer> duplicateNums = Arrays.asList(4, 3, 3, 3, 2, 1, 1, 1);
  System.out.println(duplicateNums.toString());  // [4, 3, 3, 3, 2, 1, 1, 1]

  // method 1
  Collection<Integer> noDuplicatesNums = new HashSet<>(duplicateNums);
  System.out.println(noDuplicatesNums.toString());  // [1, 2, 3, 4]

  // method 2
  Set<Integer> noDuplicatesNums2 = new HashSet<>(duplicateNums);
  System.out.println(noDuplicatesNums2.toString());  // [1, 2, 3, 4]
  ```
- streams
  - the package contains interfaces for using streams
  - a stream represents a sequence of elements
  - the package was added to traverse collections
  - most stream operations take a lambda expression
  - Stream operations are either intermediate or terminal
    - Terminal operations are either void or return a type
      - e.g.: `.collect(...)` 
    - Intermediate operations return the stream itself
      - e.g.: `.sorted()`
  - common operations include map, filter, forEach
  - elements in a stream cannot be changed
  ```java
  import java.util.List;
  import java.util.Arrays;
  import java.util.stream.Collectors;

  public class Person {
    private String name;

    public Person(String name) {
      this.name = name;
    }

    public String getName() {
      return name;
    }
  }

  public class Main {
    public static void main(String[] args) {
      List<String> names = Arrays.asList("Paul", "Jane", "Michaela", "Sam");
      System.out.println(names.stream().collect(Collectors.joining(",")));  // Paul,Jane,Michaela,Sam

      Person personA = new Person("Paul");
      Person personB = new Person("Jane");
      Person personC = new Person("Sam");
      List<Person> people = Arrays.asList(personA, personB, personC);

      // use .collect to aggregate names into a list
      // use .map to get the name
      List<String> names2 = people.stream().map(Person::getName).collect(Collectors.toList());
      System.out.println(names2);  // [Paul, Jane, Sam]
    }
  }
  ```
  ```java
  import java.util.Arrays;
  import java.util.List;
  import java.util.stream.Collectors;
  import java.util.stream.Stream;
  ```
  ```java
  Arrays.asList("red", "green", "blue").stream().sorted().findFirst().ifPresent(System.out::println);  // blue

  Stream.of("red", "green", "blue").filter(color -> color.startsWith("g")).forEach(System.out::println);  // green

  List<String> collected = Stream.of("red", "green", "blue").map(string -> string.toUpperCase()).collect(Collectors.toList());
  System.out.println(collected.toString());  // [RED, GREEN, BLUE]
  ```
  ```java
  import java.util.Arrays;
  import java.util.stream.IntStream;
  import java.util.stream.Stream;
  ```
  ```java
  IntStream.range(1, 4).forEach(System.out::print);  // 123

  // find the average of the numbers squared
  Arrays.stream(new int[] {1, 2, 3, 4}).map(n -> n*n).average().ifPresent(System.out::println);  // 7.5

  // map doubles to ints
  Stream.of(1.5, 2.3, 3.7).mapToInt(Double::intValue).forEach(System.out::print);  // 123
  ```

[back to top](#table-of-contents)

## Destructuring

[back to top](#table-of-contents)

## Spread Operator

[back to top](#table-of-contents)

## Rest parameters
```java
static double myFunction(String ... args) {
  String[] argsArr = args;  // args is an array of arguments
}
```

[back to top](#table-of-contents)

## Class
- if no constructor has been defined, a constructor with no args will be auto generated
- if a constructor with args has been defined, a constructor with no args will not be auto generated
- constructor can be overloaded with multiple constructors
```java
public class Math {
  public int arg1;
  public int arg2;
  public int total;
  public static final String NAME = "Math";  // declaring a constant variable
  
  // constructor (must have the same name as class name, no return data type)
  public Math(int arg1, int arg2) {
    // this keyword is not a must, however, variable name must be different from the parameter
    this.arg1 = arg1;
    this.arg2 = arg2;
    this.total = OuterAdd(arg1, arg2);
  }
  
  public int InnerAdd(int arg3) {
    return this.arg1 + this.arg2 + arg3;
  }
  
  public static int OuterAdd(int number1, int number2) {
    return number1 + number2;
  }
}

class MainClass {
  public static void main(String[] args) {
    Math test = new Math(2, 4);  // instantiation
    // non-static variables or methods requires instantiation
    System.out.println(test.total);  // 6
    System.out.println(test.InnerAdd(2));  // 8
    // static variables or methods does not requires instantiation
    System.out.println(Math.OutterAdd(4, 5));  // 9
  }
}
```
- private key
```java
public class Person {
  private int age = 0;  // cannot be accessed other than within the class
  
  // age can only be modified with the setter method
  public void setAge(int age) {
    this.age = age;
  }
  
  // age can only be retrieve with the getter method
  public int getAge() {
    return this.age;
  }
}
```
- protected key
  ```java
  // class with protected method
  package p1;

  // Class A
  public class A {
    protected void display() {
      System.out.println("test");
    }
  }
  ```
  - Calling protected function without extending the parent class
    ```java
    package p2;

    // import all classes in package p1
    import p1.*;

    class B {
      public static void main(String args[]) {
        B obj = new B();
        // not be able to access the function “display” since child class has not inherited its value from the main class
        obj.display();  // throw an exception
      }
    }
    ```
    - throw an error Exception in thread "main" java.lang.RuntimeException: Uncompilable source code - Erroneous sym type: p2.B.display
  - Accessing a protected class
    ```java
    package p1;
  
    // Class A
    protected class A {
      void display()
      {
        System.out.println("test");
      }
    }
    ```
    ```java
    package p2;
  
    // import all classes in package p1
    import p1.*;

    // Class B is a subclass of A
    class B extends A {
        public static void main(String args[])
        {
            B obj = new B();
            obj.display();  // throw an exception
        }
    }
    ```
    - throw an error Exception in thread "main" java.lang.RuntimeException: Uncompilable source code - Erroneous sym type: p2.B.display
  - Accessing display function from the same package but different class
    ```java
    public class C {
      public static void main(String args[]) {
        A obj = new A();
        obj.display();  // test
      }
    }
    ```
  - Accessing display function from a different package
    ```java
    package p2;
  
    // import all classes in package p1
    import p1.*;

    // Class B is a subclass of A
    class B extends A {
      public static void main(String args[]) {
        B obj = new B();
        obj.display();  // test
      }
    }
    ```
  - Accessing a protected class by overriding to sub-class within same package
    ```java
    public class C extends A {
      // overridden function
      protected void display() {
        System.out.println("overridden");
      }
      
      public static void main(String args[]) {
        C obj1 = new C();
        obj1.display();  // overridden
      }
    }
    ```
- Anonymous classes
```java
import java.util.Scanner;

public class Calculator {
  public static void main(String[] args) {
    ClassName c = new ClassName();
    c.calculate();
  }
  
  // can be accessed from within the same class, subclasses of same packages,
  // different classes of same packages, subclasses of different packages
  protected void calculate() {
    InputHelper helper = new InputHelper();
    String s1 = helper.getInput("Please do something");
  }
  
  // only Calculator class can use this
  class InputHelper {
    // can only be accessed from the same class
    private String getInput(String prompt) {
      System.out.println(prompt);
      Scanner sc = new Scanner(System.in);
      return sc.nextLine();
    }
  }
}
```
- inheritance
  - if a class isn't defined as `final` it can be extended
  - superclass members are inherited unless marked private
```java
// enum
public enum Names {
  JOHN, PETER;
}

// parent / base / superclass
public class Person {
  private int age;
  private Names name;

  public Person(int age, Names name) {
    this.age = age;
    this.name = name;
  }

  public void setAge(int age) {
    this.age = age;
  }

  public int getAge() {
    return this.age;
  }

  public Names getName() {
    return this.name;
  }
  
  public void whoAmI() {
    System.out.println("I am a Person");
  }
}

// Inheritance: child / derived / subclass
public class John extends Person {
  public John() {
    super(25, Names.JOHN);
  }
  
  // Polymorphism: overriding the parent's method
  @Override  // use this even if it is not required for 2 benefits: take adv of compiler check, easier to read
  public void whoAmI() {
    System.out.println("I a John");
  }
}

public class Main {
  public static void main(String[] args) {
    Person p = new Person(0, Names.JOHN);
    p.whoAmI();  // "I am a Person
    John j = new John();
    j.setAge(25);
    System.out.println(j.getAge());
    System.out.println(j.getName());
    j.whoAmI();  // "I am John"
  }
}
```
- interface
  - it is a contract that defines a set of methods with a particular signatures
  - any class that implement that interface must implement those methods
```java
// enum
public enum Names {
  JOHN, PETER;
}

// interface: declaring of implementations are not required
// declaring of implementations in Android might be required during instantiation
public interface Human {
  public void setAge(int age);

  public int getAge();

  public Names getName();

  public void whoAmI();
}

// class that implements an interface
// if not all of the methods declared in the interface are implemented, an error will occur
// additional methods not declared in the interface can be declared
public class Person implements Human {
  private int age;
  private Names name;

  public Person(int age, Names name) {
    this.age = age;
    this.name = name;
  }

  @Override  // not required but better to be explicit
  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public int getAge() {
    return this.age;
  }

  @Override
  public Names getName() {
    return this.name1;
  }

  @Override
  public void whoAmI() {
    System.out.println("I am a Person");
  }
}
```
- abstract
  - the ```abstract``` keyword is added
  - it can contain a mixture of fully implemented methods & abstract methods
    - abstract method is similar to a method in an interface
      - no implementation & only indicates method signature
      - any subclasses of an abstract method must implement that method
  - cannot be instantiated directly, only their subclasses can be instantiated
```java
// enum
public enum Names {
  JOHN, PETER;
}

// interface
public interface Human {
  public void setAge(int age);

  public int getAge();

  public Names getName();

  public void whoAmI();
}

// abstract parent / base / superclass
public abstract class Person implements Human {
  private int age;
  private Names name;

  public Person(int age, Names name) {
    this.age = age;
    this.name = name;
  }

  @Override
  public void setAge(int age) {
    this.age = age;
  }

  @Override
  public int getAge() {
    return this.age;
  }

  @Override
  public Names getName() {
    return this.name1;
  }

  @Override
  public void whoAmI() {
    System.out.println("I am a Person");
  }
  
  // this means that every subclass of this class must declare its own origin
  public abstract String getOrigin();
}

// child / derived / subclass
public class John extends Person {
  public John() {
    super(25, Names.JOHN);
  }
  
  @Override
  public void whoAmI() {
    System.out.println("I a John");
  }
  
  @Override
  public String getOrigin() {  // this must be declared here, else an error will occur
    return "Japan";
  }
}

public class Main {
  public static void main(String[] args) {
    // Person p = new Person(0, Names.JOHN);  // abstract classes cannot be instantiated and will cause an error
    John j = new John();
    j.setAge(25);
    System.out.println(j.getAge());
    System.out.println(j.getName());
    j.whoAmI();  // "I am John"
  }
}
```

[back to top](#table-of-contents)

## Importing Libraries
```java
// folder name that the current file is in, all other files that are in this folder can be imported without additional code
package com.example.demoapi.student;

// importing of custom nested class
import com.example.demoapi.student.utilities.Helper;

import java.time.LocalDate;
import java.time.Period;

// allows imports of all static members of the class
import static java.time.LocalDate.*;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Transient;

// method 2
import javax.persistence.*;  // allows imports of all classes

@Entity
@Table
public class Student {
  @Id
  private Long id;
  @Transient
  private Integer age;
  
  // using import java.time.LocalDate;
  public Integer getAge1() {
    return Period.between(dob, LocalDate.now()).getYears();
  }
  
  // using import static java.time.LocalDate.*;
  public Integer getAge() {
    return Period.between(dob, now()).getYears();
  }
}
```

[back to top](#table-of-contents)

## Type Conversions
- implicit type conversion
  - occurs when an equation has multiple data types
  - small memory value to big memory value only
    - e.g.: byte to int
- explicit type conversion
  - occurs when we use casting to change the data type
  - can convert big memory value to small memory value, however, data loss will occur
    - allow int to byte
```java
System.out.println((3 + 5 + 8) / 3);  // 5
System.out.println((3 + 5 + 8) / 3.0);  // 5.333333333333333

// implicit type conversion
byte b = 1;
int i = b;
float f = i;

// casting
// explicit type conversion
float pi = 3.14f;
int intPi = (int) pi;  // 3

int num = 256;
byte b = (byte) num; // 0 (surplus value will assigned if converting big data type value to smaller data type value)

int num2 = 255;
byte b2 = (byte) num2; // 255

// convert number to strings (user helper class)
int i = 1234;
String str = Integer.toString(i);  // "1234"

// convert string to double
String s = "423";
double d1 = Double.parseDouble(s);
System.out.println(d1);  // 423.0
```
```
String doubleValue = "156.5";

// convert string to double
Double doubleObj = Double.parseDouble(doubleValue);
System.out.println(doubleObj);  // 156.5

// convert double to byte
byte byteValue = doubleObj.byteValue();
System.out.println(byteValue);  // -100

// convert double to int
int intValue = doubleObj.intValue();
System.out.println(intValue);  // 156

// convert double to float
float floatValue = doubleObj.floatValue();
System.out.println(floatValue);  // 156.5

// convert double to string
var stringValue = doubleObj.toString();
System.out.println(stringValue);  // "156.5"
```

[back to top](#table-of-contents)

## Find Data Type

[back to top](#table-of-contents)

## String Concatenation
```java
String string1 = "string";
int num1 = 1;

// method 1
String stringName1 = string1 + num1;  // "string1"

// method 2
StringBuilder sb1 = new StringBuilder(string1);
sb1.append(num1);  // "string1"
// or
StringBuilder sb2 = new StringBuilder();
sb2.append(string1).append(num1);  // "string1"

sb2.delete(1, sb2.length());  // "s"

// method 3
StringBuffer sBuffer1 = new StringBuffer(string1);
sBuffer1.append(num1);
sBuffer1.toString();  // "string1"
// or
StringBuffer sBuffer2 = new StringBuffer();
sBuffer2.append(string1).append(num1);
sBuffer2.toString();  // "string1"

// method 4 (concat value must be string type)
String newString1 = string1.concat(Integer.toString(num1));  // "string1"

// method 5 (%s = string, %d = "byte, short, int, long, bigint", %c = char)
String newString2 = String.format("%s%d", string1, num1);  // "string1"
```
- [String format reference](https://www.javatpoint.com/java-string-format)

## JSON

[back to top](#table-of-contents)

## Program Entry Point

[back to top](#table-of-contents)

## Swapping values
```java
int nums[] = {0, 1};
System.out.printf("%d, %d %n", nums[0], nums[1]);  // 0, 1
```
```java
int temp;
temp = nums[0];
nums[0] = nums[1];
nums[1] = temp;
System.out.printf("%d, %d %n", nums[0], nums[1]);  // 1, 0
```

[back to top](#table-of-contents)

## Error Handling
* try: lets you test a block of code for errors
* catch: lets you handle the error
  * use "Exception" keyword to catch all exception types
  * use specific exception types to catch that specific exception
    * exceptions are from java.lang library, so no imports are required
  * catch block can be chained (specific exception with highest priority should come first)
* finally: lets you execute code, after try and catch, regardless of the result
  * very important for closing a file when an opened file in the try block triggered an exception
```java
try {
  doSomething;
} catch(SomeSpecificException e) {
  doSomethingIfErrorOccursRelatedToSomESpecificException;
} catch(Exception e) {  // e is an arg (mandatory), e can be used to print general or more detailed error
  e.printStackTrace();
  doSomethingIfErrorOccursRelatedToAllExceptions;
} finally {
  doSomethingWhenTryAndCatchIsCompleted;
}
```
- try with resources statement
  - only for java 8 or later versions, can't be used on android
  - it is a try statement that declares 1 or more resources
  - a resource is an object that must be closed after the program is finished with it
```java
// type 1
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileWriter;

public class Main {
    // try-with-resources
    try (BufferedReader bReader = new BufferedReader(new FileReader(sourceFile))) {
      return bReader.readLine();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}

// type 2
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileWriter;

public class Main {
  public static void main(String[] args) {
    String sourceFile = "textfile";  // textfile path
    String targetFile = "newtextfile";  // newtextfile path

    // try-with-resources
    try (
      FileReader fReader = new FileReader(sourceFile);  // read file
      BufferedReader bReader = new BufferedReader(fReader);  // read lines in file
      FileWriter writer = new FileWriter(targetFile);  // write file
      ) {
      while (true) {
        String line = bReader.readLine();
        if (line == null) {
          break;
        } else {
          writer.write(line + "\n");
        }
      }
      System.out.println("File copied");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```

[back to top](#table-of-contents)

## Custom Error
- must use either try catch statements or be inside a conditional statement to work
```java
// if using try catch, both throw and catch must handle the same Exception type
try {
  // raise specific exception
  throw new SpecificExceptionName("custom message");
  
  // raise generic exception
  throw new Exception("custom message");
} catch (SpecificExceptionName e) {
} catch (Exception e) {
}


if (true) {
  // raise generic exception
  throw new Exception("custom message");
}
```

[back to top](#table-of-contents)

## Asynchronous
* Handling asynchronous code (making it synchronous)

[back to top](#table-of-contents)

## Math
```java
import java.util.Random;

double number1 = 10.5;
double number2 = 15;

System.out.println("Math.abs(number1) " + (Math.abs(number1)));  // Math.abs(number1) 10.5
System.out.println("Math.ceil(number1) " + (Math.ceil(number1)));  // Math.ceil(number1) 11
System.out.println("Math.floor(number1) " + (Math.floor(number1)));  // Math.floor(number1) 10
System.out.println("Math.max(number1, number2) " + (Math.max(number1, number2)));  // Math.max(number1, number2) 15
System.out.println("Math.min(number1, number2) " + (Math.min(number1, number2)));  // Math.min(number1, number2) 10.5
System.out.println("Math.pow(number1, 2) " + (Math.pow(number1, 2)));  // Math.pow(number1, 2) 110.25
System.out.println("Math.round(number1) " + (Math.round(number1)));  // Math.round(number1) 10
System.out.println("Math.sqrt(number1) " + (Math.sqrt(number1)));  // Math.sqrt(number1) 3.24037034920393

System.out.println("Random Number Between 0 and 10 = " + (int)(Math.random() * 11 + 1 + 0));  // Math.random() * (max - min + 1) + min2 = change min2 to 1 to become between 1 and 10

Random rand = new Random();
System.out.println("Random Number Between 0 and 10 " + (rand.nextInt(11)));
System.out.println("Random Number Between 1 and 10 " + (rand.nextInt(10 - 1 + 1) + 1));  // rand.nextInt((max - min) + 1) + min;
```

[back to top](#table-of-contents)

## Date and Time
- must import
```java
import java.util.Date;
import java.util.GregorianCalendar;
import java.text.DateFormat;
import java.util.Locale;
import java.time.LocalDateTime;  // java 8
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
```
```java
Date d = new Date();  // Fri Jul 09 00:46:09 SGT 2021

// January = 0, Feburary = 1, ...
GregorianCalendar gc = new GregorianCalendar(2009, 1, 28);
gc.add(GregorianCalendar.DATE, 1);  // add a day
Date d2 = gc.getTime();  // Sun Mar 01 00:00:00 SGT 2009

// format date
// method 1, with no specific style and locale
DateFormat df = DateFormat.getDateInstance();
System.out.println(df.format(d2));  // Mar 1, 2009
// method 2, with style and no locale
DateFormat df2 = DateFormat.getDateInstance(DateFormat.FULL);
System.out.println(df2.format(d2));  // Sunday, March 1, 2009
// method 3, with style and locale
Locale locale = new Locale("en_SG", "SGP");  // set as Singapore
DateFormat df3 = DateFormat.getDateInstance(DateFormat.FULL, locale);
System.out.println(df3.format(d2));  // 2009 Mar 1, Sun

LocalDateTime ldt = LocalDateTime.now();  // 2021-07-09T01:03:50.874932

// January = 1, Feburary = 2, ...
LocalDate ld = LocalDate.of(2009, 1, 28);  // 2009-01-28

DateTimeFormatter dtf = DateTimeFormatter.ISO_DATE;
System.out.println(dtf.format(ld));  // 2009-01-28

// format with a specific pattern
DateTimeFormatter dtf2 = DateTimeFormatter.ofPattern("M/d/yyyy");
System.out.println(dtf2.format(ld));  // 1/28/2009
```

[back to top](#table-of-contents)

## File System
```java
import java.io.FileReader;
import java.io.BufferedReader;
import java.io.FileWriter;

public class Main {
  public static void main(String[] args) {
    String sourceFile = "textfile";  // sourceFile path
    String targetFile = "newtextfile";  // targetFile path

    // try with resources statement, only available for java 8 and later versions
    // can't be used on android
    try (
      FileReader fReader = new FileReader(sourceFile);  // read file
      BufferedReader bReader = new BufferedReader(fReader);  // read lines in file
      FileWriter writer = new FileWriter(targetFile);  // write file
      ) {
      while (true) {
        String line = bReader.readLine();
        if (line == null) {
          break;
        } else {
          writer.write(line + "\n");
        }
      }
      System.out.println("File copied");
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
```
```java
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    String subDirectory = "";  // parent folder where the file is located
    String sourceFilename = "textfile";
    String targetFilename = "newtargetfile3";
    
    // only for java 7 or later versions, not available for android
    Path sourceFile = Paths.get(subDirectory, sourceFilename);
    Path targetFile = Paths.get(subDirectory, targetFilename);

    try {
      // copy existing file contents into the new file
      Files.copy(sourceFile, targetFile, StandardCopyOption.REPLACE_EXISTING);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```
- using ```commons-io``` library to copy file
  - for latest versions and for android
  - download the ```commons-io``` jar file
  - create a ```lib``` folder inside the root folder of your project and move the ```commons-io``` jar file into it
  - then add the jar file into the class path
```java
import org.apache.commons.io.FileUtils;  // common-io library

import java.io.File;
import java.io.IOException;

public class Main {
  public static void main(String[] args) {
    File sourceFile = new File("path/to/file.txt");
    File targetFile = new File("path/to/newfile.txt");
    
    try {
      // use commons-io
      FileUtils.copyFile(sourceFile, targetFile);
    } catch (IOException e) {
      e.printStackTrace();
    }
  }
}
```
- reading a text file over the internet
```java
import java.net.URL;
import java.io.InputStream;
import java.io.BufferedInputStream;
import java.io.IOException;

public class Main {
  private static final String FLOWERS_FEED = "https://services.hanselandpetal.com/feeds/flowers.xml";

  // adding the throws block allow code to run safely without having to write another try catch statement in the finally block
  public static void main(String[] args) throws IOException {
    InputStream stream = null;
    BufferedInputStream buf = null;
    try {
      URL url = new URL(FLOWERS_FEED);
      stream = url.openStream();
      buf = new BufferedInputStream(stream);

      StringBuilder sb = new StringBuilder();

      while (true) {
        int data = buf.read();  // gets a single character from stream, returns a character integer value if found else returns -1

        if (data == -1) {
          break;
        } else {
          sb.append((char) data);  // translate the integer value into a character
        }
      }
      System.out.println(sb);
    } catch(IOException e) {
      e.printStackTrace();
    } finally {
      // use finally to explicitly close the stream
      stream.close();
      buf.close();
    }
  }
}
```

[back to top](#table-of-contents)

## Access modifier
* use to hide the implementation details of a class

[back to top](#table-of-contents)

## Iterators
- using iterators to loop through collections
```java
// import java.util.List;
// import java.util.ArrayList;
// import java.util.Iterator;  // must import

List<String> list = new ArrayList<>();
list.add("Japan");
list.add("China");
list.add("USA");

// method 1: using Iterator
Iterator<String> iterator = list.iterator();
while (iterator.hasNext()) {
  String value = iterator.next();
  System.out.println(value);
}
// method 2: using forEach loop
for (String value: list) {
  System.out.println(value);
}
// method 3: using List's forEach method, only available for Java 8 onwards, not included in android java 8
list.forEach(System.out::println);  // method 1
list.forEach((s) -> {System.out.println(s});  // method 2


// loop hash maps with Iterator
// import java.util.Map;
// import java.util.HashMap;
// import java.util.Set;
// import java.Iterator;
Map<String, String> map = new HashMap<>();
map.put("jp", "Japan");
map.put("sg", "Singapore");
map.put("usa", "United States");
Set<String> keys = map.keySet();

Iterator<String> iterator = keys.iterator();
while (iterator.hasNext()) {
  String key = iterator.next();
  System.out.println(map.get(key));
}

// loop has maps with forEach
for (String key : keys) {
  System.out.println(map.get(key));
}
```

[back to top](#table-of-contents)

## Generators

[back to top](#table-of-contents)

## Fetching Web Data

[back to top](#table-of-contents)

## Enum
- Enumerations are lists of possible values that you can use for any particular variable
- An enumeration in java is called an enum class
```java
// usual enums
public enum Names1 {
  JOHN, PETER;
}

// setting a string value for enums
public enum Names2 {
  JOHN("John"), PETER("Peter");
  
  private String name;
  
  Names2(String name) {
    this.name = name;
  }
  
  @Override
  public String toString() {
    return this.name;
  }
}

public class Person {
  private Names1 name1 = Names1.JOHN;  // using enum to set a constant variable
  private Names2 name2 = Names2.JOHN;
  
  public Names1 getName1() {
    return this.name1;
  }
  
  public Names2 getName2() {
    return this.name2;
  }
}

public class Main {
  public static void main(String[] args) {
    Person p = new Person();
    System.out.println(p.getName1());  // "JOHN"
    System.out.println(p.getName2());  // "John"
  }
}
```

[back to top](#table-of-contents)

## Language Specific
- Number formatting
```java
long longValue = 10_000_000;
// method 1
// using "import java.text.NumberFormat;"
NumberFormat formatter = NumberFormat.getNumberInstance();
String formatted = formatter.format(lognValue);  // "10,000,000" (us locale)
// method 2
// using "import java.util.Locale;"
Locale locale = new Locale("da", "DK");  // set as Denmark
NumberFormat formatter = NumberFormat.getNumberInstance(locale);
String formatted = formatter.format(lognValue);  // "10.000.000" (dk locale)
```
- Currency formatting
```java
long longValue = 10_000_000.00;
// method 1
// using "import java.text.NumberFormat;"
NumberFormat formatter = NumberFormat.getCurrencyInstance();
String formatted = formatter.format(lognValue);  // "$10,000,000.00" (us locale)
// method 2
// using "import java.util.Locale;"
Locale locale = new Locale("da", "DK");  // set as Denmark
NumberFormat formatter = NumberFormat.getCurrencyInstance(locale);
String formatted = formatter.format(lognValue);  // "kr10.000.000,00" (dk locale)
```
- Integer formatting
```java
long longValue = 10_000_000.89;
// method 1
// using "import java.text.NumberFormat;"
NumberFormat formatter = NumberFormat.getIntegerInstance();
String formatted = formatter.format(lognValue);  // "10,000,001" (us locale)
// method 2
// using "import java.util.Locale;"
Locale locale = new Locale("da", "DK");  // set as Denmark
NumberFormat formatter = NumberFormat.getIntegerInstance(locale);
String formatted = formatter.format(lognValue);  // "10.000.001" (dk locale)
```
- double colon operator / method reference operator
  - ```<Class name>::<method name>```
  - can be used for
    - a static method
    ```java
    import java.util.*;
  
    class GFG {
      // static function to be called
      static void someFunction(String s)
      {
        System.out.println(s);
      }

      public static void main(String[] args)
      {
        List<String> list = new ArrayList<String>();
        list.add("Geeks");
        list.add("For");
        list.add("GEEKS");
  
        // call the static method
        // using double colon operator
        list.forEach(GFG::someFunction);
      }
    }
    ```
    - an instance method
    ```java
    import java.util.*;
  
    class GFG {
      // instance function to be called
      void someFunction(String s)
      {
        System.out.println(s);
      }
  
      public static void main(String[] args)
      {
        List<String> list = new ArrayList<String>();
        list.add("Geeks");
        list.add("For");
        list.add("GEEKS");
  
        // call the instance method
        // using double colon operator
        list.forEach((new GFG())::someFunction);
      }
    }
    ```
    - super method
    ```java
    import java.util.*;
    import java.util.function.*;
  
    class Test {
      // super function to be called
      String print(String str)
      {
        return ("Hello " + str + "\n");
      }
    }
  
    class GFG extends Test {
      // instance method to override super method
      @Override
      String print(String s)
      {
        // call the super method
        // using double colon operator
        Function<String, String> func = super::print;
        
        String newValue = func.apply(s);
        newValue += "Bye " + s + "\n";
        System.out.println(newValue);
        return newValue;
      }
  
      // Driver code
      public static void main(String[] args)
      {
        List<String> list = new ArrayList<String>();
        list.add("Geeks");
        list.add("For");
        list.add("GEEKS");
        
        // call the instance method
        // using double colon operator
        list.forEach(new GFG()::print);
      }
    }
    ```
    - Instance method of an arbitrary object of a particular type
    ```java
    import java.util.*; 
  
    class Test { 
      String str=null;
      
      Test(String s)
      {
        this.str=s;
      }
      // instance function to be called 
      void someFunction() 
      { 
        System.out.println(this.str); 
      } 
    } 
  
    class GFG { 
      public static void main(String[] args) 
      { 
        List<Test> list = new ArrayList<Test>(); 
        list.add(new Test("Geeks")); 
        list.add(new Test("For")); 
        list.add(new Test("GEEKS")); 
  
        // call the instance method 
        // using double colon operator 
        list.forEach(Test::someFunction); 
      } 
    }
    ```
    - a constructor
    ```java
    import java.util.*;
  
    class GFG {
      // Class constructor
      public GFG(String s)
      {
        System.out.println("Hello " + s);
      }
  
      // Driver code
      public static void main(String[] args)
      {
        List<String> list = new ArrayList<String>();
        list.add("Geeks");
        list.add("For");
        list.add("GEEKS");
  
        // call the class constructor
        // using double colon operator
        list.forEach(GFG::new);
      }
    }
    ```

[back to top](#table-of-contents)
