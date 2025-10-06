# Nth Fibonacci

The Fibonacci sequence is defined as follows: the first number of the sequence
is 0, the second number is 1, and the nth number is the sum of the (n - 1)th
and (n - 2)th numbers. Write a function that takes in an integer
n and returns the nth Fibonacci number.

Important note: the Fibonacci sequence is often defined with its first two
numbers as F0 = 0 and F1 = 1. For the purpose of
this question, the first Fibonacci number is F0; therefore,
getNthFib(1) is equal to F0, getNthFib(2)
is equal to F1, etc..

Sample Input #1
`n = 2`
Sample Output #1
`1 // 0, 1`
Sample Input #2
`n = 6`
Sample Output #2
`5 // 0, 1, 1, 2, 3, 5`

```python
# solution 1
def getNthFib(n):
  # Write your code here.
  if n == 1:
    return 0
  if n == 2:
    return 1
  return getNthFib(n-1) + getNthFib(n-2)


# solution 2
def getNthFib(n, store={}):
  # Write your code here.
  if n == 1:
    return 0
  if n == 2:
    return 1
  if n in store:
    return store[n]
  store[n] = getNthFib(n - 1, store) + getNthFib(n - 2, store)
  return store[n]


# solution 3
def getNthFib(n):
  # Write your code here.
  lastTwo = [0, 1]
  counter = 3
  while counter <= n:
    next = lastTwo[0] + lastTwo[1]
    lastTwo[0] = lastTwo[1]
    lastTwo[1] = next
    counter += 1
  return lastTwo[1] if n > 1 else lastTwo[0]
```

```javascript
// solution 1
function getNthFib(n) {
  // Write your code here.
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  return getNthFib(n - 1) + getNthFib(n - 2);
}

// solution 2
function getNthFib(n, store = {}) {
  // Write your code here.
  if (n === 1) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  if (store[n]) {
    return store[n];
  }
  store[n] = getNthFib(n - 1, store) + getNthFib(n - 2, store);
  return store[n];
}

// solution 3
function getNthFib(n) {
  // Write your code here.
  const lastTwo = [0, 1];
  let counter = 3;
  while (counter <= n) {
    const next = lastTwo[0] + lastTwo[1];
    lastTwo[0] = lastTwo[1];
    lastTwo[1] = next;
    counter++;
  }
  return n > 1 ? lastTwo[1] : lastTwo[0];
}
```
