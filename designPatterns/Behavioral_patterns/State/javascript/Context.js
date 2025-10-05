/**
 * The Context defines the interface of interest to clients. It also maintains a
 * reference to an instance of a State subclass, which represents the current
 * state of the Context.
 */
class Context {
  constructor(state) {
    /**
     * type {State} A reference to the current state of the Context.
     */
    this.transitionTo(state);
  }

  /**
   * The Context allows changing the State object at runtime.
   */
  transitionTo(state) {
    console.log(`Context: Transition to ${state.constructor.name}.`);
    this.state = state;
    this.state.setContext(this);
  }

  /**
   * The Context delegates part of its behavior to the current State object.
   */
  request1() {
    this.state.handle1();
  }

  request2() {
    this.state.handle2();
  }
}

module.exports = Context;
