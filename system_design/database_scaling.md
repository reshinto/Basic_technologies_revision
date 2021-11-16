# Database Scaling
- an important topic for any system design
  - because for any large scale applications, the database is usually going to be where the performance bottleneck is
    - because while the application servers are stateless, it can be scaled horizontally as much as required
    - these servers are going to hit the database for retrieving and writing of data
## Key Information
- most web apps are read heavy, around 95% +
  - e.g.: twitter (tweets), facebook (posts), google (searches)
## Basic Scaling Techniques
### Indexes
### Denormalization
### Connection Pooling
### Caching
### Vertical Scaling
