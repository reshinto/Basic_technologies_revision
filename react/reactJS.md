# React js
## setState examples
- ```javascript
  onChange = e => {
    this.setState({ [e.target.name ]: e.target.value });  // requires the name attribute to be declared at the html tag
  }
  ```
- ```javascript
  onChange = prop => e => this.setState({ [prop]: e.target.value });
  ```
