/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
class HandlerAbstract {
  #nextHandler;
 
  setNext(handler) {
    this.#nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }
 
  handle(request) {
    if (this.#nextHandler) {
      return this.#nextHandler.handle(request);
    }
    return null;
  }
}

module.exports = HandlerAbstract;
