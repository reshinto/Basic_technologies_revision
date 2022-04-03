# What are design fundamentals
- to conduct a 45 min discussion
- involve asking the interviewer questions
  - prodding them about what type of system you're really building
  - what kind of functionality your system is gonna have to support
  - what characteristics we're gonna value in our system
- answer to system interview question had a lot to do with subjectivity
  - a proposed solution to a system design interview question may very well not be objectively correct or objectively incorrect
  - it is our job to very confidently justify our solution
  - it is our job to explain to rationalize why i've made certain choices, why i've designed parts of my system in 1 way instead of another
  - it is our job to make the interviewer understand why my proposed solution is reasonable, why it's sound, and why it might be the best 1, or perhaps why it might not be the best 1, why it may be 1 of many potential solutions
  - it is our job to eliminate any doubts that the interviewer might have in some of my design choices
  - it is our job to defend my position or to adapt my position if the interview challenges it
## 4 categories
### Underlying or foundational knowledge
- these are design fundamentals where, if you don't understand them, you will at best have severe gaps in knowledge that will undermine your positions or your ability to defend positions in a system design interview
  - at worst, will make you incapable of even beginning to tackle a system design interview
  - e.g.:
    - client server model: need to know what it is to design any modern day systems
    - network protocols: need to have some understanding of how machines communicate and interact with 1 another in order to be able to properly design a complex system
### Key characteristics of a system
- things that you might want the system to have
- things that you might be trading off when making certain design decisions
  - e.g.: availability, wait and see, throughput, redundancy, consistency
### Actual components of a system
- these are gonna be slightly more tangible things that you can either have in a system or that you can implement in a system
- e.g.: load balances, proxies, caches, rate limiting, leader election
- these are the key components that are gonna allow your system to have the key characteristics
### Actual tech
- real existing products or services that you can actually use in a system, either as actual components in a system or to achieve a certain characteristic in a system
- these are gonna be real tools
  - e.g.: Zookeeper, XCD, Engine X, Reddits, Amazon S3, Google Cloud Storage
- this category is often overlooked but is very important that can round you off and make you shine in a systems design interview
