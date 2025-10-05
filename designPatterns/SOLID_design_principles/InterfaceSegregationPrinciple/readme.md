# Interface Segregation Principle

- no client should be forced to depend on methods it does not use
- this helps to split interfaces that are very large into smaller and more specific ones
  - so that clients will only have to know about the methods that are of interest to them
    - also referred to as `role interfaces`

## Purpose

- the purpose is to
  - keep a system decoupled
  - allow easy refactor, change, and redeploy
