/**
 * The Base Component provides the basic functionality of storing a mediator's
 * instance inside component objects.
 */
class BaseComponent {
  constructor(mediator = null) {
    this.mediator = mediator;
  }

  setMediator(mediator) {
    this.mediator = mediator;
  }
}

module.exports = BaseComponent;
