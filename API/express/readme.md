# Express
- index.ts
```typescript
import express, { Request, Response, NextFunction, Errback } from 'express';
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
app.get('/Test', (req: Request, res: Response) => res.send('Hey 1'));
app.get('/test', (req: Request, res: Response) => res.send('Hey 2'));

// -------------------------
// app middlewares
// -------------------------

// allow parsing of json body
app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  console.log('Time:', Date.now());
  next();
});

app.use('user/:id', (req: Request, res: Response, next: NextFunction) => {
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

app.use((req: Request, res: Response, next: NextFunction) => {
  throw new Error('Oops, error: (');
});

app.use((err: Errback, req: Request, res: Response, next: NextFunction) => {
  console.log(err);
  res.status(500).send('Something broke!');
});

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}`));
```
- user-route.ts
```typescript
import express, { Request, Response } from 'express';
import Joi from 'joi';
import { validateSchema } from './utils';


const userRouter = express.Router();

export const userSchema = Joi
  .object()
  .keys({
    id: Joi.number().integer().required(),
    name: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),
    age: Joi.number().integer().min(18).max(99),
    isAdmin: Joi.boolean().required()
  }).meta({ className: 'User' });

const users = [
  { id: 1, name: 'Diana', age: 21, isAdmin: true },
  { id: 2, name: 'Max', age: 24, isAdmin: false },
  { id: 3, name: 'Mary', age: 23, isAdmin: false }
];

userRouter.get('/users', (req: Request, res: Response) => {
  const { order = 'asc' } = req.query;

  return  (order === 'desc')
    ? res.json(users.reverse())
    : res.json(users);
});

userRouter.get('/users/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const user = users.find((_user) => _user.id === parseInt(id, 10));

  res.json(user);
});

userRouter.post('/users', validateSchema(userSchema), (req: Request, res: Response) => {
  const user = req.body;

  const newUsers = [...users, user];

  res.json(newUsers);
});

export default userRouter;
```
- utils.ts
```typescript
import { Schema, Context } from 'joi';
import { Request, Response, NextFunction } from 'express';

type schemaErrorsType = {
  message: string;
  path: (string | number)[];
  type: string;
  context?: Context
}

type errorResponseType = {
  status: string;
  errors: { path: (string | number)[]; message: string }[];
}

export const errorResponse = (schemaErrors: schemaErrorsType[]): errorResponseType => {
  const errors = schemaErrors.map(({ path, message }: { path: (string | number)[], message: string }) => ({ path, message }));

  return {
    status: 'failed',
    errors
  };
};

export const validateSchema = (schema: Schema) => {
  return (req: Request, res: Response, next: NextFunction): Response | undefined => {
    const { error } = schema.validate(req.body, {
      abortEarly: true,
      allowUnknown: false
    });

    if (error && error.isJoi) {
      console.log(errorResponse(error.details));
      return res.status(400).json(errorResponse(error.details));
    }

    next();
  };
};
```
