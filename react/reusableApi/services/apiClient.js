import isString from "lodash/isString";

export const isJsonContentType = (type) => type && type.indexOf("json") >= 0;

class ApiClient {
  async get(url, body, options) {
    return this.request(url, body, options, "GET");
  }

  async post(url, body, options) {
    return this.request(url, body, options, "POST");
  }

  async put(url, body, options) {
    return this.request(url, body, options, "PUT");
  }

  async delete(url, body, options) {
    return this.request(url, body, options, "DELETE");
  }

  async patch(url, body, options) {
    return this.request(url, body, options, "PATCH");
  }

  async request(url, body, options, method) {
    const token = "123";

    const headers = new Headers({
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`
    });

    if (body) {
      if (body instanceof FormData) {
        headers.delete("Content-Type");
      } else if (!isString(body)) {
        body = JSON.stringify(body);
      }
    }

    let extraOptions = {};

    if (options) {
      const { headers: additionalHeaders, ...restOptions } = options;
      extraOptions = restOptions;
      for (const header in additionalHeaders) {
        if (additionalHeaders.hasOwnProperty(header)) {
          headers.append(header, additionalHeaders(header));
        }
      }
    }

    return fetch(url.toString(), {
      body,
      method,
      headers,
      ...extraOptions
    }).then(
      (response) =>
        new Promise((resolve, reject) => {
          const type = response.headers.get("content-type");

          let promise;
          if (isJsonContentType(type)) {
            promise = response.json();
          } else {
            promise = response.text();
          }

          promise.then((data) => {
            if (response.status < 400) {
              resolve(data);
            } else {
              reject(data);
            }
          });
        })
    );
  }
}

export const apiClient = new ApiClient();
