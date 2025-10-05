# Probability
## Random username
```
Return a random username in accordance to the user's probability

Example
  Input:
    {
      "Tom": 9,
      "Jerry": 1,
      "Kate": 3,
    }
   
  Output:
    Tom or Jerry or Kate
```
```javascript
const users = {
  "Tom": 9,
  "Jerry": 1,
  "Kate": 3,
}

function getRandomUsername(users) {
  let totalProb = 0;
  const newUserObj = {};

  for (let key in users) {
    for (let i=0; i<users[key]; i++) {
      newUserObj[totalProb] = key;
      totalProb++;
    }
    delete users[key];
  }
  const rawIndex = Math.floor(Math.random() * totalProb);

  return newUserObj[rawIndex];
}
```
