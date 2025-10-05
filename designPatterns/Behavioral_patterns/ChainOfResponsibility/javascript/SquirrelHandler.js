const HandlerAbstract = require("./HandlerAbstract");

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
class SquirrelHandler extends HandlerAbstract {
  handle(request) {
    if (request === "Nut") {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}

module.exports = SquirrelHandler;
