// refer to https://github.com/reshinto/Basic_technologies_revision/tree/master/react/reusableApi for import files
import { ROOT_ENDPOINTS } from "../constants/api";

import { apiClient } from "./apiClient";
import { Url } from "./url";

export const users = {
  get: () => apiClient.get(new Url(`${ROOT_ENDPOINTS.users}`))
};

export const user = {
  get: (userId) => apiClient.get(new Url(`${ROOT_ENDPOINTS.users}/${userId}`)),
  post: (data) =>
    apiClient.post(new Url(`${ROOT_ENDPOINTS.users}/create`), data),
  put: (userId, data) =>
    apiClient.put(new Url(`${ROOT_ENDPOINTS.users}/edit/${userId}`), data),
  delete: (userId) =>
    apiClient.get(new Url(`${ROOT_ENDPOINTS.users}/delete/${userId}`))
};
