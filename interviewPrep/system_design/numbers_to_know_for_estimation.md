# Numbers to know for Estimation

## Latency Numbers

- has a big impact
  - on user experience
  - on how you design your entire app to reduce latency
- key points
  - avoid network calls whenever possible
  - replicate data across data centers for disaster recovery as well as performance
  - use CDNs to reduce latency
  - keep frequently accessed data in memory if possible rather than seeking from disk, caching

| Access Type       | actual latency time | Converted more understandable Time |
| ----------------- | ------------------- | ---------------------------------- |
| CPU Cycle         | 0.3 nanoseconds     | 1 seconds                          |
| CPU L1 Cache      | 1 nanoseconds       | 3 seconds                          |
| CPU L2 Cache      | 3 nanoseconds       | 9 seconds                          |
| CPU L3 Cache      | 13 nanoseconds      | 43 seconds                         |
| Main Memory (RAM) | 120 nanoseconds     | 6 minutes                          |
| SSD               | 150 micro seconds   | 6 days                             |
| HDD               | 10 milliseconds     | 12 months                          |
| SF to NYC         | 40 milliseconds     | 4 years                            |
| SF to Australia   | 180 milliseconds    | 19 years                           |

## Capacity Estimates

- use to get a rough figure of the type of resources and server amounts that you would need

### Data Conversions

| Unit           | Equivalent |
| -------------- | ---------- |
| 8 bits         | 1 byte     |
| 1024 bytes     | 1 kilobyte |
| 1024 kilobytes | 1 megabyte |
| 1024 megabytes | 1 gigabyte |
| 1024 gigabytes | 1 terabyte |

### Common Data Types

| Data Type      | Size    |
| -------------- | ------- |
| Char           | 1 byte  |
| Integer        | 4 bytes |
| UNIX Timestamp | 4 bytes |

- use to make quick estimates for daily traffic
  - such as requests per second
  - how many requests you need to handle

| Time                                             |
| ------------------------------------------------ |
| 60 seconds x 60 minutes = 3,600 seconds per hour |
| 3,600 x 24 hours = 86,400 seconds per day        |
| 86,400 x 30 days = 2,500,000 seconds per month   |

### Traffic Estimates

- estimate total number of requests app will receive
- Average Daily Active Users (DAU) x average reads / writes per user

```
Instagram type app:

10 million DAU x 30 photos viewed = 300 million photo requests per day
10 million DAU x 1 photo upload = 10 million photo writes per day
300 million requests / 86,400 seconds per day = 3472 requests per second (using floor division)
10 million writes / 86,400 seconds per day = 15 writes per second (using floor division)
```

### Memory Estimates

- Read Request per day x Average Request size x 0.2
  - use 0.8 by using the 80 20 rule
    - for a rough estimate, can assume that 20% of the data will be 80% of the overall request or traffic
    - especially on a social media site, some posts are gonna get much more views than others
      - in a popular account, their post is gonna get view millions of times
      - while other people's posts might not get viewed at all
    - thus to save the database workload, we need to cache our most popular stuff, and most frequently accessed data to reduce latency
      - by providing data from memory instead of from database or disk

```
300 million requests x 500 bytes = 150 gigabytes per day
150 GB x 0.2 (20%) = 30 gigabytes (only store this amount for the most popular data)
30 GB x 3 (replication) = 90 gigabytes (total cache memory)
```

### Bandwidth Estimates

- Requests per day x Request size
  - this would account the size of the data we are serving
  - average bandwidth is 5.2 gb per second for this example
  - take note that rarely an app will have a steady flow at the same rate
    - often have peaks where it's your highest usage time giving you 3 times the bandwidth
    - during dead times, you might get a much lower amount

```
1 photo size ~= 1.5 mb

300 million request x 1.5 mb = 450,000 gigabytes per day
450,000 gb / 86,400 seconds = 5.2 gb per second (using floor division)
```

### Storage Estimates

- Writes per day x Size of write x Time to store data
  - storage is normally used for data that you would want to keep for a long time
    - around 10 years or longer

```
1 photo size ~= 1.5 mb

10 million write x 1.5 mb = 15 TB per day
15 tb x 365 days x 10 years = 55 Petabytes
```
