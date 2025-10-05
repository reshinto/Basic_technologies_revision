import HandlerAbstract from "./HandlerAbstract";

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
export default class DogHandler extends HandlerAbstract {
  public handle(request: string): string {
    if (request === 'MeatBall') {
      return `Dog: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}