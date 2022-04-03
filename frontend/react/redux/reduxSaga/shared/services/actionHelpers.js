export class AsyncAction {
  constructor(type) {
    if (!type) {
      throw new Error("Type parameter is mandatory");
    }
    this.REQUEST = `${type}_REQUEST`;
    this.SUCCESS = `${type}_SUCCESS`;
    this.FAILURE = `${type}_FAILURE`;
  }

  request(payload) {
    return { type: this.REQUEST, payload };
  }

  success(payload) {
    return { type: this.SUCCESS, payload };
  }

  failure(payload) {
    return { type: this.FAILURE, payload };
  }
}

export class Action {
  constructor(type) {
    if (!type) {
      throw new Error("Type parameter is mandatory");
    }
    this.ACTION = `${type}`;
  }

  action(payload) {
    return { type: this.ACTION, payload };
  }
}
