/**
 * The Handler interface declares a method for building the chain of handlers.
 * It also declares a method for executing a request.
 */
export default interface HandlerInterface {
  setNext(handler: HandlerInterface): HandlerInterface;

  handle(request: string): string;
}