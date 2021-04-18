# Generate Document

  You're given a string of available characters and a string representing a
  document that you need to generate. Write a function that determines if you
  can generate the document using the available characters. If you can generate
  the document, your function should return true; otherwise, it
  should return false
  
  
  You're only able to generate the document if the frequency of unique
  characters in the characters string is greater than or equal to the frequency
  of unique characters in the document string. For example, if you're given
  characters = "abcabc" and document = "aabbccc" you
  cannot generate the document because you're missing one c
  
  The document that you need to create may contain any characters, including
  special characters, capital letters, numbers, and spaces.
  
  Note: you can always generate the empty string ("")
  
  Sample Input
  ```characters = "Bste!hetsi ogEAxpelrt x "```
  ```document = "AlgoExpert is the Best!"```
  Sample Output
  true
```python
# solution 1
def generateDocument(characters, document):
    # Write your code here.
    result = False
  newChars = list(characters)
  if document == "":
    return True
  for v in document:
    if v in newChars:
      newChars.remove(v)
      result = True
    else:
      return False
  return result


# solution 2
def generateDocument(characters, document):
    # Write your code here.
    memo = {}
  
  for v in characters:
    if v not in memo:
      memo[v] = 0
    memo[v] += 1
  
  for v in document:
    if v not in memo or not memo[v]:
      return False
    memo[v] -= 1
  return True


# solution 3
def generateDocument(characters, document):
    # Write your code here.
    for v in document:
    charF = charFreq(v, characters)
    docF = charFreq(v, document)
    if docF > charF:
      return False
  return True


def charFreq(c, string):
  freq = 0
  for v in string:
    if c == v:
      freq += 1
  return freq
```
```javascript
// solution 1
function generateDocument(characters, document) {
  // Write your code here.
  for (let v of document) {
    const charFreq = charsFreq(v, characters);
    const docFreq = charsFreq(v, document);
    if (docFreq > charFreq) {
      return false;
    }
  }
  return true;
}

function charsFreq(c, string) {
  freq = 0;
  for (let v of string) {
    if (v === c) {
      freq++;
    }
  }
  return freq;
}

// solution 2
function generateDocument(characters, document) {
  // Write your code here.
  const memo = {};
  for (let i=0; i<characters.length; i++) {
    if (!memo[characters[i]]) {
      memo[characters[i]] = 0;
    }
    memo[characters[i]]++;
  }
  
  for (let i=0; i<document.length; i++) {
    if (!memo[document[i]]) {
      return false;
    }
    memo[document[i]]--;
  }
  return true;
}
```
