import { ROOT_ENDPOINTS } from "../constants/api";

import { apiClient } from "./apiClient";
import { Url } from "./url";

export const users = {
  // working example
  get: () => apiClient.get(new Url(`${ROOT_ENDPOINTS.users}`)),
  // for illustration purposes
  post: (data) =>
    apiClient.post(new Url(`${ROOT_ENDPOINTS.users}/create`), data),
  put: (userId, data) =>
    apiClient.put(new Url(`${ROOT_ENDPOINTS.users}/edit/${userId}`), data),
  delete: (userId) =>
    apiClient.get(new Url(`${ROOT_ENDPOINTS.users}/delete/${userId}`))
};
