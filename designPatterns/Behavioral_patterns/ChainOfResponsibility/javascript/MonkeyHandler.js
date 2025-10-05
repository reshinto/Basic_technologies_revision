const HandlerAbstract = require("./HandlerAbstract");

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class MonkeyHandler extends HandlerAbstract {
  handle(request) {
    if (request === "Banana") {
      return `Monkey: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

module.exports = MonkeyHandler;
