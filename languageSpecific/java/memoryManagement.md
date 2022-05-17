# Memory Management
## Java Memory
- when app run, need access to some of computer's memory to store the objects that we create and hold in memory
- rules
  - objects are stored on the heap
  - variables are a reference to the object which is stored on the stack
  - local variables are stored on the stack
### The Stack
- every thread has its own stack
- it is managed by the Java Virtual Machine (JVM)
- java knows exactly when data on the stack can be destoryed
- used for local primitive variables
  - e.g.: ints and doubles
- stack works as First In Last Out structure (FILO)
  - each time a function is called, java pushes the local variables for that function on to the stack
  - the local variables are automatically popped from the stack when it reaches the close of the block that create that variable
- data on the stack can only be seen by the thread that owns the stack
- the stack is a tightly managed structure and java can maintain very tight scoping rules with the stack
- stacks are great for local variables because we want a local variable to have a short lifetime
```java
public class Main {
  public static void main(String[] args) {
    int value = 7;
    value = calculate(value);
  }
  public static int calculate(int data) {
    int tempValue = data + 3;
    int newValue = tempValue * 2;
    return newValue;
  }
}
```
```
           ______________________      ______________________
           | newValue = 20      |      |                    |
_____      | tempValue = 10     |      |                    |      _____
|   |  ->  | data = 7           |  ->  |                    |  ->  |   |
-----      | value = 7          |      | value = 7          |      -----
           | args = empty array |      | args = empty array |
           ----------------------      ----------------------
```
### The Heap
- it allows us to store data that has a longer lifetime than a single code block or function
  - e.g.: objects that need to be shared across multiple methods
- it is all the memory of the app except for the data on the stacks
- in an app, there is 1 heap which is shared across all the threads and a number of stacks 1 for each thread
- since most objects are quite big and that most programs will want to pass around objects between blocks of code
  - by placing objects on the heap, it makes it easy to pass them around
  - thus, all threads and code blocks in the app can potentially access the heap
- in java, all objects are stored on the heap
  - e.g.: strings, integer objects
- for the objects on the heap, there will be a pointer to the object
  - it is the variable reference stored on the stack
  - basically a variable would be created on the stack which points to the object stored in the heap
- simple example
  ```java
  int age = 21;
  String name = "Hello";
  ```
  ```
  stack             heap
  ____________     _____________________________
  | name ----|--   |                            |
  | age = 21 |  \--|--->  String name = "Hello" |
  ------------     ------------------------------
  ```
- complicated example
  ```java
  public class Main {
    public static void main(String[] args) {
      List<String> myList = new ArrayList<String>();
      myList.add("One");
      myList.add("Two");
      myList.add("Three");
      printList(myList);
    }
    public static void printList(List<String> data) {
      String value = data.get(1);
      data.add("Four");
      System.out.println(value);
    }
  }
  ```
  ```
  stack      heap
  ______     ______
  |    |     |    |
  ------     ------
  ```
  ```
  List<String> myList = new ArrayList<String>();
  
  stack          heap
  __________     __________
  | myList-|-----|-> List |
  ----------     ----------
  ```
  ```
  myList.add("One");  // myList.add(new String("One"));
  myList.add("Two");  // myList.add(new String("Two"));
  myList.add("Three");  // myList.add(new String("Three"));
  
  stack          heap
  __________     ___________________________
  | myList-|-----|-> List                  |
  ----------     |    0 ----> String One   |
                 |    1 ----> String Two   |
                 |    2 ----> String Three |
                 ---------------------------
  ```
  ```
  public static void printList(List<String> data)
  
  stack          heap
  __________     ___________________________
  | data---|-----|-> List                  |
  | myList-|-----|->  0 ----> String One   |
  ----------     |    1 ----> String Two   |
                 |    2 ----> String Three |
                 ---------------------------
  ```
  ```
  String value = data.get(1);
  
  stack          heap
  __________     _______________________________
  | value--|-----|---------------------------  |
  | data---|-----|-> List                   |  |
  | myList-|-----|->  0 ----> String One    |  |
  ----------     |    1 ----> String Two  <--  |
                 |    2 ----> String Three     |
                 -------------------------------
  ```
  ```
  data.add("Four");  // data.add(new String("Four"));
  
  stack          heap
  __________     _______________________________
  | value--|-----|---------------------------  |
  | data---|-----|-> List                   |  |
  | myList-|-----|->  0 ----> String One    |  |
  ----------     |    1 ----> String Two  <--  |
                 |    2 ----> String Three     |
                 |    3 ----> String Four      |
                 -------------------------------
  ```
  ```  
  stack          heap
  __________     _______________________________
  | myList-|-----|-> List                      |
  ----------     |    0 ----> String One       |
                 |    1 ----> String Two       |
                 |    2 ----> String Three     |
                 |    3 ----> String Four      |
                 -------------------------------
  ```