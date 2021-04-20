# Array Of Products

  Write a function that takes in a non-empty array of integers and returns an
  array of the same length, where each element in the output array is equal to
  the product of every other number in the input array.
  
  In other words, the value at output[i] is equal to the product of
  every number in the input array other than input[i]
  
  Note that you're expected to solve this problem without using division.
  
  Sample Input
  ```array = [5, 1, 4, 2]```
  
  Sample Output
  ```
  [8, 40, 10, 20]
  // 8 is equal to 1 x 4 x 2
  // 40 is equal to 5 x 4 x 2
  // 10 is equal to 5 x 1 x 2
  // 20 is equal to 5 x 1 x 4
  ```
```python
# solution 1
def arrayOfProducts(array):
  # Write your code here.
  result = []
  i = 0
  while i < len(array):
    product = 1
    for j in range(len(array)):
      if j == i:
        continue
      product *= array[j]
    result.append(product)
    i += 1
  return result


# solution 2
def arrayOfProducts(array):
  # Write your code here.
  leftProduct = [1 for _ in range(len(array))]
  rightProduct = [1 for _ in range(len(array))]
  
  left = 1
  right = 1
  for i in range(len(array)):
    leftProduct[i] = left
    left *= array[i]
    rightProduct[len(array) - 1 - i] = right
    right *= array[len(array) - 1 - i]
  
  results = []
  for i in range(len(array)):
    results.append(leftProduct[i] * rightProduct[i])
  
  return results


# solution 3
def arrayOfProducts(array):
  # Write your code here.
  result = [1 for _ in range(len(array))]
  
  left = 1
  right = 1
  for i in range(len(array)):
    result[i] *= left
    left *= array[i]
    result[len(array) - 1 - i] *= right
    right *= array[len(array) - 1 - i]
  
  return result


# solution 4
def arrayOfProducts(array):
  # Write your code here.
  results = []
  
  left = 1
  for i in range(len(array)):
    results.append(left)
    left *= array[i]
  
  right = 1
  for i in reversed(range(len(array))):
    results[i] *= right
    right *= array[i]
  
  return results
```
```javascript
// solution 1
function arrayOfProducts(array) {
  // Write your code here.
  const result = [];
  let i = 0;
  while (i < array.length) {
    let product = 1;
    for (let j=0; j<array.length; j++) {
      if (j !== i) {
        product *= array[j];
      }
    }
    result.push(product);
    i++;
  }
  return result;
}

// solution 2
function arrayOfProducts(array) {
  // Write your code here.
  const leftProduct = new Array(array.length).fill(1);
  const rightProduct = new Array(array.length).fill(1);
  const result = [];
  
  let left = 1;
  let right = 1;
  for (let i=0; i<array.length; i++) {
    leftProduct[i] = left;
    left *= array[i];
    rightProduct[array.length - 1 - i] = right;
    right *= array[array.length - 1 - i]
  }
  
  for (let i=0; i<array.length; i++) {
    result.push(leftProduct[i] * rightProduct[i]);    
  }
  
  return result;
}

// solution 3
function arrayOfProducts(array) {
  // Write your code here.
  const result = new Array(array.length).fill(1);
  
  let left = 1;
  let right = 1;
  for (let i=0; i<array.length; i++) {
    result[i] *= left;
    left *= array[i];
    result[array.length - 1 - i] *= right;
    right *= array[array.length - 1 -i];
  }
  
  return result;
}

// solution 4
function arrayOfProducts(array) {
  // Write your code here.
  const result = [];
  
  let left = 1;
  let right = 1;
  for (let i=0; i<array.length; i++) {
    result[i] = left;
    left *= array[i];
  }
  
  for (let i=array.length-1; i>=0; i--) {
    result[i] *= right;
    right *= array[i];
  }
  
  return result;
}
```
