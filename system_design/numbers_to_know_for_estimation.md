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

|Access Type|actual latency time|Converted more understandable Time|
|-|-|-|
|CPU Cycle|0.3 nanoseconds|1 seconds|
|CPU L1 Cache|1 nanoseconds|3 seconds|
|CPU L2 Cache|3 nanoseconds|9 seconds|
|CPU L3 Cache|13 nanoseconds|43 seconds|
|Main Memory (RAM)|120 nanoseconds|6 minutes|
|SSD|150 micro seconds|6 days|
|HDD|10 milliseconds|12 months|
|SF to NYC|40 milliseconds|4 years|
|SF to Australia|180 milliseconds|19 years|
