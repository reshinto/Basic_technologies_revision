import transform from "lodash/transform";

export class Url {
  constructor(url = "", params = "") {
    this.url = url;
    this.params = params;
  }

  addParams(params) {
    Object.assign(this.params, params);
  }

  toString() {
    let paramsStr = this.params ? "?" : "";

    paramsStr += transform(
      this.params,
      (result, value, key) => {
        result.push(`${key}=${value}`);
      },
      []
    ).join("&");

    return this.url + paramsStr;
  }
}

export const getUrlWithQuery = ({ location, queryName, queryValue }) => {
  const { pathname, search } = location;
  const params = new URLSearchParams(search.slice(1));

  if (params.has(queryName)) {
    params.set(queryName, queryValue);
  } else {
    params.append(queryName, queryValue);
  }

  return `${pathname}?${decodeURIComponent(params.toString())}`;
};
