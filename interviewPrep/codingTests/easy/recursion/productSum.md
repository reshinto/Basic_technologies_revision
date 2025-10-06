# Product Sum

Write a function that takes in a "special" array and returns its product sum.

A "special" array is a non-empty array that contains either integers or other
"special" arrays. The product sum of a "special" array is the sum of its
elements, where "special" arrays inside it are summed themselves and then
multiplied by their level of depth.

The depth of a "special" array is how far nested it is. For instance, the
depth of [] is 1; the depth of the inner array in [[]] is 2; the depth of the innermost array in
  [[[]]] is 3

Therefore, the product sum of [x, y] is x + y; the
product sum of [x, [y, z]] is x + 2 _ (y + z); the
product sum of [x, [y, [z]]] is x + 2 _ (y + 3z)

Sample Input
`array = [5, 2, [7, -1], 3, [6, [-13, 8], 4]]`
Sample Output
12
`// calculated as: 5 + 2 + 2 * (7 - 1) + 3 + 2 * (6 + 3 * (-13 + 8) + 4)`

```python
def productSum(array, depth=1):
  # Write your code here.
  sum = 0
  for v in array:
    if type(v) == list:
      sum += productSum(v, depth + 1)
    else:
      sum += v
  return sum * depth
```

```javascript
function productSum(array, depth = 1) {
  // Write your code here.
  let sum = 0;
  for (let v of array) {
    if (Array.isArray(v)) {
      sum += productSum(v, depth + 1);
    } else {
      sum += v;
    }
  }
  return sum * depth;
}
```
