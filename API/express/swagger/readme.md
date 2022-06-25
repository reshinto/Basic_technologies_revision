# Add Swagger to Express
## Default express app
> npm i express
```javascript
const express = require("express");
const app = express();

const port = process.env.PORT || 5000;

// Routes
app.get("/customers", (req, res) => {
  res.send("Customer results");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
## Setup basic Swagger options
```javascript
const express = require("express");
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const port = process.env.PORT || 5000;

// for more info: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: "Customer API",
      description: "Customer API Information",
      contact: {
        name: "Amazing Developer",
      },
      servers: ["http://localhost:5000"],
    },
  },
  apis: ["app.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Routes
app.get("/customers", (req, res) => {
  res.send("Customer results");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
```
- verify at `http://localhost:5000/api-docs/`
- result
  ![Basic Swagger Setup](../../../images/basicSwaggerSetup.png)
