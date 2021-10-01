# Express
- index.ts
```typescript
import express from 'express';
import userRouter from './user-route';

const app = express();
const PORT = 3000;

// -------------------------
// app properties
// -------------------------

app.set('appName', 'Task 2.1');
app.set('isAdmin', true);

console.log('=== BEFORE: appName:', app.get('appName'));
console.log('=== BEFORE: isAdmin:', app.get('isAdmin'));

app.disable('appName');
app.disable('isAdmin');

console.log('=== AFTER: appName:', app.get('appName'));
console.log('=== AFTER: isAdmin:', app.get('isAdmin'));

// -------------------------
// app settings
// -------------------------

// allow routes with different cases to be different routes
app.set('case sensitive routing', true); // default value is false

// url route must be exact to how it was defined in the route
// eg: http://localhost:3000/test/ will give an error for this case
app.set('strict routing', true); // default value is false

// info in the header that provides information on what tech is being used for this app
app.set('x-powered-by', false); // default value is true

// bad practice to handle routes without router
app.get('/Test', (req, res) => res.send('Hey 1'));
app.get('/test', (req, res) => res.send('Hey 2'));

// -------------------------
// app middlewares
// -------------------------

// allow parsing of json body
app.use(express.json());

app.use((req, res, next) => {
  console.log('Time:', Date.now());
  next();
});

app.use('user/:id', (req, res, next) => {
  console.log('Request URL:', req.originalUrl);
  next();
});

// -------------------------
// router level
// -------------------------

app.use(userRouter);

// -------------------------
// error-handling middleware
// -------------------------

app.use((req, res, next) => {
  throw new Error('Oops, error: (');
});

app.use((err: any, req: any, res: any, next: any) => {
  console.log(err.stack);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
```
- user-route.ts
```typescript
import express from 'express';
import Joi from 'joi';
import { validateSchema } from './utils';


const userRouter = express.Router();

const userSchema = Joi
  .object()
  .keys({
    id: Joi.number().integer().required(),
    name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age: Joi.number().integer().min(18).max(99),
    isAdmin: Joi.boolean().required()
  });

const users = [
  { id: 1, name: 'Diana', age: 21, isAdmin: true },
  { id: 2, name: 'Max', age: 24, isAdmin: false },
  { id: 3, name: 'Mary', age: 23, isAdmin: false }
];

userRouter.get('/users', (req, res) => {
  const { order = 'asc' } = req.query;

  return  (order === 'desc')
    ? res.json(users.reverse())
    : res.json(users);
});

userRouter.get('/users/:id', (req, res) => {
  const { id } = req.params;
  const user = users.find((_user) => _user.id === parseInt(id, 10));

  res.json(user);
});

userRouter.post('/users', validateSchema(userSchema), (req, res) => {
  const user = req.body;

  const newUsers = [...users, user];

  res.json(newUsers);
});

export default userRouter;
```
- utils.ts
```typescript
export const errorResponse = (schemaErrors: any) => {
  const errors = schemaErrors.map(({ path, message }: any) => ({ path, message }));

  return {
    status: 'failed',
    errors
  };
};

export const validateSchema = (schema: any) => {
  return (req: any, res: any, next: any) => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      return res.status(400).json(errorResponse(error.details));
    }

    next();
  };
};
```
