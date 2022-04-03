# Strings
- strings are generally considered to be a data type that behaves like a data structure
- strings are stored in memory as arrays of integers
  - where each english character in a given string is mapped to an integer via some character-encoding standard like ASCII
    - each character is stored in memory as 1 byte of 8 bits
  - other languages would use other character encoding standard and might require more space, which is more bytes
- strings behave much like normal arrays, with the main distinction being that, in most programming languages (C++ is a notable exception). strings are immutable
  - this means that they can't be edited after creation
  - this also means that simple operations like appending a character to a string are more expensive than they might appear
## e.g. of an operation that's deceptively expensive due to string immutability
```python
string = "this is a string"
newString = ""

for character in string:
    newString += character  # creates a new string
```
- the operation above has a time complexity of O(n<sup>2</sup>)
  - where n is the length of string
    - because each addition of a character to newString creates an entirely new string and is itself an O(n) operation
  - therefore, n O(n) operations are performed, leading to an O(n<sup>2</sup>) time complexity operation overall
## standard operations and complexities
### Traversing a string: O(n) time, O(1) space
### Copying a string: O(n) time and space
- space complexity is linear because it would be storing another n characters in space
### Accessing a character at a given index in a string: O(1) time and space
### Insert a value in a string: O(n) time
- in C++, strings are mutable, so alteration of string after creation is possible
  - time complexity is O(1) for this case
- other than C++, in other languages, strings are immutable
  - strings cannot be altered after creation
  - to alter a string, need to copy the string and create a brand new string that have that new character
    - in this case, it is better to split the string in to an actual array of characters, append the new character, then rejoin them back into a string
## Find sub strings within a string
- Knuth-Morris-Pratt algorith
  - a very fast but complex algorithm
  - allows you to find 1 sub string inside another string
  - or check if it is present in another string
