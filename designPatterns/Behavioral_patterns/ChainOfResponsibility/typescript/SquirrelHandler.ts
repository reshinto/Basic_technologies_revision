import HandlerAbstract from "./HandlerAbstract";

/**
 * All Concrete Handlers either handle a request or pass it to the next handler
 * in the chain.
 */
export default class SquirrelHandler extends HandlerAbstract {
  public handle(request: string): string {
    if (request === 'Nut') {
      return `Squirrel: I'll eat the ${request}.`;
    }
    return super.handle(request);
  }
}