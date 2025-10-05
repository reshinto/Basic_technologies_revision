import HandlerInterface from "./HandlerInterface";

/**
 * The default chaining behavior can be implemented inside a base handler class.
 */
export default abstract class HandlerAbstract implements HandlerInterface {
  private nextHandler: HandlerInterface;
 
  public setNext(handler: HandlerInterface): HandlerInterface {
    this.nextHandler = handler;
    // Returning a handler from here will let us link handlers in a
    // convenient way like this:
    // monkey.setNext(squirrel).setNext(dog);
    return handler;
  }
 
  public handle(request: string): string {
    if (this.nextHandler) {
      return this.nextHandler.handle(request);
    }
    return null;
  }
}