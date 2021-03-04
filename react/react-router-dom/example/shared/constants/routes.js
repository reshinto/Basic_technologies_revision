export const PUBLIC_ROUTES = {
  confirm: "/confirm",
  health: "/health",
  createPassword: "/create-password",
  guest: "/guest"
};

export const ROOT_ROUTES = {
  root: "/root"
};

export const APP_ROUTES = {
  usersPage: `${ROOT_ROUTES.root}/users`,
  // not working, for example only
  userPage: `${ROOT_ROUTES.root}/users/:userId`
};
