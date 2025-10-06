# Reduce method

## Calculate sum of values in array

```js
const intArr = [1, 2, 3, 4];

const intResult = intArr.reduce((acc, x) => acc + x);

console.log(intResult); // 10
```

## Combine and join arrays by ID

- data

  ```js
  const users = [
    {
      userID: "1",
      username: "John40",
      country: "USA",
      name: "John",
    },
    {
      userID: "2",
      username: "Luke123",
      country: "Sweden",
      name: "Luke",
    },
    {
      userID: "3",
      username: "Lora123",
      country: "Finland",
      name: "Lora",
    },
    {
      userID: "4",
      username: "MIKE",
      country: "GB",
      name: "Mike",
    },
    {
      userID: "5",
      username: "Emmi1990",
      country: "Finland",
      name: "Emmi",
    },
  ];

  const data = [
    {
      userID: "1",
      amt: 20,
    },
    {
      userID: "2",
      amt: 30,
    },
    {
      userID: "3",
      amt: 40,
    },
    {
      userID: "4",
      amt: 50,
    },
    {
      userID: "1",
      amt: 100,
    },
  ];
  ```

- combine data by ID

  ```js
  const combined = users.concat(data);

  const result = Object.values(
    combined.reduce((acc, x) => {
      // if acc.userID object does not exist, replace it with an empty object
      // combine object at acc.userID with x object
      acc[x.userID] = Object.assign(acc[x.userID] || {}, x);

      return acc;

      // initial value required for x value not to start from 2nd element of array
    }, {})
  );

  console.log(result);
  ```

  ```js
  [
    {
      userID: "1",
      username: "John40",
      country: "USA",
      name: "John",
      amt: 100,
    },
    {
      userID: "2",
      username: "Luke123",
      country: "Sweden",
      name: "Luke",
      amt: 30,
    },
    {
      userID: "3",
      username: "Lora123",
      country: "Finland",
      name: "Lora",
      amt: 40,
    },
    {
      userID: "4",
      username: "MIKE",
      country: "GB",
      name: "Mike",
      amt: 50,
    },
    {
      userID: "5",
      username: "Emmi1990",
      country: "Finland",
      name: "Emmi",
    },
  ];
  ```

- combine data by ID and increment duplicates

  ```js
  const combined = users.concat(data);

  const result = Object.values(
    combined.reduce((acc, x) => {
      // set default value for objects that does not have amt property
      const currentAmt = acc[x.userID]?.amt ? acc[x.userID].amt : 0;
      const nextAmt = x?.amt ? x.amt : 0;

      // if acc.userID object does not exist, replace it with an empty object
      // combine object at acc.userID with modified x object
      acc[x.userID] = Object.assign(acc[x.userID] || {}, {
        ...x,
        amt: currentAmt + nextAmt,
      });

      return acc;

      // initial value required for x value not to start from 2nd element of array
    }, {})
  );

  console.log(result);
  ```

  ```js
  [
    {
      userID: "1",
      username: "John40",
      country: "USA",
      name: "John",
      amt: 120,
    },
    {
      userID: "2",
      username: "Luke123",
      country: "Sweden",
      name: "Luke",
      amt: 30,
    },
    {
      userID: "3",
      username: "Lora123",
      country: "Finland",
      name: "Lora",
      amt: 40,
    },
    {
      userID: "4",
      username: "MIKE",
      country: "GB",
      name: "Mike",
      amt: 50,
    },
    {
      userID: "5",
      username: "Emmi1990",
      country: "Finland",
      name: "Emmi",
      amt: 0,
    },
  ];
  ```
