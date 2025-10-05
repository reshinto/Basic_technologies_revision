import Mediator from "./Mediator";

/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
export default class BaseComponent {
  protected mediator: Mediator;

  constructor(mediator: Mediator = null) {
    this.mediator = mediator;
  }

  public setMediator(mediator: Mediator): void {
    this.mediator = mediator;
  }
}
