/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
export default interface Mediator {
  notify(sender: object, event: string): void;
}
