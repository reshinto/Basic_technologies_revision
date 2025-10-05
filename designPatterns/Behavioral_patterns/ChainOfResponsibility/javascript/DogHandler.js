const HandlerAbstract = require("./HandlerAbstract");

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class DogHandler extends HandlerAbstract {
  handle(request) {
    if (request === "MeatBall") {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

module.exports = DogHandler;
