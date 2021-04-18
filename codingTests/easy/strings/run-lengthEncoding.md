# Run-Length Encoding

  Write a function that takes in a non-empty string and returns its run-length
  encoding.
  
  From Wikipedia, "run-length encoding is a form of lossless data compression in
  which runs of data are stored as a single data value and count, rather than as
  the original run." For this problem, a run of data is any sequence of
  consecutive, identical characters. So the run "AAA" would be
  run-length-encoded as "3A"
  
  To make things more complicated, however, the input string can contain all
  sorts of special characters, including numbers. And since encoded data must be
  decodable, this means that we can't naively run-length-encode long runs. For
  example, the run "AAAAAAAAAAAA" (12 As), can't
  naively be encoded as "12A", since this string can be decoded as
  either "AAAAAAAAAAAA" or "1AA". Thus, long runs (runs
  of 10 or more characters) should be encoded in a split fashion; the
  aforementioned run should be encoded as "9A3A"
  
  Sample Input
  ```string = "AAAAAAAAAAAAABBCCCCDD"```
  Sample Output
  "9A4A2B4C2D"
```python
# solution 1
def runLengthEncoding(string):
  # Write your code here.
  newStr = []
  count = 0
  previous = None
  for i in range(len(string)):
    if not previous:
      count += 1
    elif string[i] == previous and count < 9:
      count += 1
    elif string[i] == previous:
      newStr.append(str(count))
      newStr.append(string[i])
      count = 1
    elif string[i] != previous:
      newStr.append(str(count))
      newStr.append(previous)
      count = 1
    if i == len(string) - 1:
      newStr.append(str(count))
      newStr.append(string[i])
    previous = string[i]
  return "".join(newStr)


# solution 2
def runLengthEncoding(string):
  # Write your code here.
  newStr = []
  count = 1
  for i in range(1, len(string)):
    current = string[i]
    previous = string[i-1]
    if current != previous or count >= 9:
      newStr.append(str(count))
      newStr.append(previous)
      count = 0
    count += 1
  newStr.append(str(count))
  newStr.append(string[len(string) - 1])
  return "".join(newStr)
```
```javascript
function runLengthEncoding(string) {
  // Write your code here.
  const newStr = [];
  let count = 1;
  for (let i=1; i<string.length; i++) {
    const current = string[i];
    const previous = string[i - 1];
    if (current !== previous || count >= 9) {
      newStr.push(String(count));
      newStr.push(previous);
      count = 0;
    }
    count++;
  }
  newStr.push(String(count));
  newStr.push(string[string.length - 1]);
  return newStr.join("");
}
```
