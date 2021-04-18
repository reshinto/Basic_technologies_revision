# Caesar Cipher Encryptor

  Given a non-empty string of lowercase letters and a non-negative integer
  representing a key, write a function that returns a new string obtained by
  shifting every letter in the input string by k positions in the alphabet,
  where k is the key.
  
  Note that letters should "wrap" around the alphabet; in other words, the
  letter z shifted by one returns the letter a
  
  Sample Input
  ```string = "xyz"```
  ```key = 2```
  Sample Output
  zab
  
```python
# solution 1
def caesarCipherEncryptor(string, key):
    # Write your code here.
    aValue = ord("a")
  zValue = ord("z")
  newStr = []
  for i in range(len(string)):
    currentValue = ord(string[i]) + key
    while currentValue > zValue:
      currentValue = currentValue - zValue + aValue - 1
    newStr.append(chr(currentValue))
  return "".join(newStr)


# solution 2
def caesarCipherEncryptor(string, key):
    # Write your code here.
    aValue = ord("a")
  zValue = ord("z")
  newStr = []
  newKey = key % 26
  for i in range(len(string)):
    currentValue = ord(string[i]) + newKey
    if currentValue > zValue:
      newStr.append(chr(currentValue - zValue + aValue - 1))
    else:
      newStr.append(chr(currentValue))
  return "".join(newStr)
```
```javascript
function caesarCipherEncryptor(string, key) {
  // Write your code here.
  const aValue = "a".charCodeAt();
  const zValue = "z".charCodeAt();
  const newKey = key % 26;
  const newStr = [];
  for (let i=0; i<string.length; i++) {
    const currentValue = string[i].charCodeAt(0) + newKey;
    if (currentValue > zValue) {
      newStr.push(String.fromCharCode(currentValue - zValue + aValue - 1));
    } else {
      newStr.push(String.fromCharCode(currentValue));
    }
  }
  return newStr.join("");
}
```
