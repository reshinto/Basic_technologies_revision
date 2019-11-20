# Webpack Tutorial
## Install
```
npm i -g webpack webpack-cli
```
## Bundle file
```
webpack fileToBundle.js --mode development
```
### If use npm
* Put this into the package.json file
```
"build": "webpack fileToBundle.js --mode development"
```
### import bundled file in index.html with script tag
* webpack will bundle it into a "main.js" file
* previously was bundled into a "bundle.js" file
```
<script src="dist/main.js"></script>
```
### Enable constant update to bundle file
```
webapck fileToBundle.js --mode development --watch
```
### Enable module imports
```
require(./myModule);
require(publicModule);
```
### Enable css imports
```
npm i css-loader style-loader
```
#### Import css to js file
* Method 1: Write directly in js file
```
require("!style-loader!css-loader!./cssFileName.css");
```
* Method 2: Use webpack.config file
  * touch webpack.config
      * old syntax
      ```
      module.exports = {
        mode: "development",
        entry: "./fileToBundle.js",
        output: {
          path: __dirname, // set to current path
          filename: "bundle.js" // set bundled filename
        },
        module: { // this is required if using loaders (eg. css-loader)
          loaders: [
            {test: /\.css$/, loader: "style-loader!css-loader"} // for any file that ends with a ".css"
          ]
        }
      }
      ```
      * current syntax
      ```
      const path = require('path');

      module.exports = {
        mode: "development",
        entry: "./fileToBundle.js",
        output: {
          path: path.resolve(__dirname, 'dist'),
          filename: "bundle.js"
        },
        module: {
          rules: [
            {
              test: /\.css$/,
              use: ['style-loader', 'css-loader'],
            },
          ],
        },
      };
      ```
  * write directly in js file
      ```
      require("./style.css");
      ```
  * webpack command changed
      ```
      webpack --config webpack.config
      ```
