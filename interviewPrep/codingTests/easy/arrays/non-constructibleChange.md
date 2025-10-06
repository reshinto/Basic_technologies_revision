# Non-Constructible Change

Given an array of positive integers representing the values of coins in your
possession, write a function that returns the minimum amount of change (the
minimum sum of money) that you cannot create. The given coins can have
any positive integer value and aren't necessarily unique (i.e., you can have
multiple coins of the same value).

For example, if you're given `coins = [1, 2, 5]`, the minimum
amount of change that you can't create is 4. If you're given no
coins, the minimum amount of change that you can't create is 1

Sample Input
`coins = [5, 7, 1, 1, 2, 3, 22]`
Sample Output
20

```python
def nonConstructibleChange(coins):
  # Write your code here.
  coins.sort()
  if 1 not in coins:
    return 1
  min = 0
  for i in range(len(coins)):
    min += coins[i]
    if i < len(coins) - 1:
      if coins[i + 1] > min + 1:
        return min + 1
    else:
      return min + 1
    return 1


def nonConstructibleChange(coins):
  # Write your code here.
  coins.sort()

  min = 0
  for coin in coins:
    if coin > min + 1:
      return min + 1
    min += coin
  return min + 1
```

```javascript
function nonConstructibleChange(coins) {
  // Write your code here.
  coins.sort((a, b) => a - b);
  let min = 0;
  for (let coin of coins) {
    if (coin > min + 1) {
      return min + 1;
    }
    min += coin;
  }
  return min + 1;
}
```
