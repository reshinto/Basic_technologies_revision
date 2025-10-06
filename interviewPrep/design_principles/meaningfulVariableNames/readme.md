# Meaning Variable Names

- One of the most difficult things while coding is naming things (variables, functions, and classes)
- Most people go ahead with single or double letter variable names like A, v, d, mp, etc when they start coding
  - Most people use generic variable names like flag, value, map, arr, etc
  - These variable names might be easy to write but it makes the code difficult to read and makes debugging more time-consuming
- Follow these rules to create meaningful variables, functions, and classes
  - Use Intention-Revealing Names
  - Name Functions as Verbs
  - Name Classes as Nouns
  - Use Meaningful Distinction
  - Use Pronounceable Names
  - Use Searchable Names
  - Avoid Encodings

## Use Intention-Revealing Names

- The name of the variable, function, class, etc should be sufficient enough to understand its purpose
  - One should not have to read the whole code to figure out what a function does or what a class represents or to understand why a variable exists
- The name should ideally not require a comment
- Writing descriptive variable names may look like it would take more time
  - Once you start writing descriptive names, it would become pretty intuitive and would result in saving more time in terms of collaboration, maintenance, and readability

### Bad examples

```java
//This is bad
int d;
String[] arr;
boolean flag;

//This is bad
int getAnswer(int a, int b) {
}
```

### Good Examples

```java
//This is good
int courseDurationInDays;
String[] chapterNames;
boolean isCellVisited;

//This is good
int getSum(int firstNum, int secondNum) {
}
```

## Name Functions as Verbs

- Function names should be verbs or verb phrases that explain what the function does. Getters (Accessors) and Setters (Mutators) should start with get/set
- Function names should also be descriptive
  - A long, descriptive name is better than using a comment to describe it
  - A function name should be descriptive enough to understand the intent of that function
- Ward’s principle: You know you are working on clean code when each function turns out to be pretty much what you expected
- Be consistent in naming functions and use the same convention

## Name Classes as Nouns

- Classes should have descriptive names such that it should be easy to understand their intent
  - Classes should have nouns or noun phrases as names
  - A class name should not be a verb

## Use Meaningful Distinction

- When two variables/functions/classes exist with similar names, make sure that there is a meaningful distinction between their names

### Number-series

- Number-series naming is a pretty bad way to name variables as it is difficult to distinguish between variables

```java
int[] arr1;
int[] arr2;
```

### Noise words

- Noise words like `Data`, `Value`, `Info`, `Variable`, `Table`, `String`, `Object`, etc which are used as a suffix do not offer any meaningful distinction
  - Noise words are redundant and should be avoided

```js
String status;
String statusValue;

class Product {
}

class ProductInfo {
}

getDistinctValue(int[] arr) {
}

getDistinctValues(int[] arr) {
}
```

## Use Pronounceable Names

- Using pronounceable names makes the code easy to read and discuss about
  - Doing so allows discussing/explaining code in plain English

### Bad Example

```java
Date modDateYYMMDD;
```

### Good Example

```java
Date modificationTimestamp;
```

## Use Searchable Names

- In big codebases, you would have to search for variable/function/class names to find it
  - Small names or constant values might make it difficult to search
  - Proper names that make it easy to search make the code cleaner and easier to maintain

### Avoid magic numbers

- Create named constants instead of using numbers or other constant values where it is supposed to denote something

#### Bad Example

```java
ParkingLot() {
    int[] parkingSpots[100];
}

void printParkingSpots() {
    for (int i = 0; i < 100; i++) {
        System.out.println(parkingSpots[i]);
    }
}
```

#### Good Example

```java
final int NUMBER_OF_PARKING_SPOTS = 100;

ParkingLot() {
    int[] parkingSpots[NUMBER_OF_PARKING_SPOTS];
}

void printParkingSpots() {
    for (int i = 0; i < NUMBER_OF_PARKING_SPOTS; i++) {
        System.out.println(parkingSpots[i]);
    }
}
```

### Avoid short names

- Smaller names should only be used in variables inside short functions (for temporary use) where it has no meaning/use outside the said function
  - However, it should be noted that the variable names can be small if the scope of the variable is very small given that it is sufficient to understand the intention

## Avoid Encodings

- Avoid using any unnecessary prefixes or suffixes
  - A variable/function/class name should not be unnecessarily prefixed/suffixed with type information or any other redundant information

## Bad Example

```java
//String suffix ties the variable to the data type that makes it difficult to be changed later.
String locationString;

//The prefix I should be avoided for Interfaces
interface IEmployee {
}
```
