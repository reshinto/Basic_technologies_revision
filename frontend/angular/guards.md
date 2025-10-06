# Guards

- the route guard resolves to true or false based on custom logic and functionality
- we inject the guard in our module under providers

- cli
  > ng generate guard guards/somename

## CanActivate

- checks to see if user can visit a route

## CanActivateChild

- checks to see if a user can visit a routes children

## CanDeactivate

- checks to see if a user can exit a route

## Resolve

- performs route data retrieval before route activation

## CanLoad

- checks to see if a user can route to a module that lazy loaded
