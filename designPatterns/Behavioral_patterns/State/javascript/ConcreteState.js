const State = require("./State");

/**
 * Concrete States implement various behaviors, associated with a state of the
 * Context.
 */
class ConcreteStateA extends State {
  handle1() {
    console.log("ConcreteStateA handles request1.");
    console.log("ConcreteStateA wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateB());
  }

  handle2() {
    console.log("ConcreteStateA handles request2.");
  }
}

class ConcreteStateB extends State {
  handle1() {
    console.log("ConcreteStateB handles request1.");
  }

  handle2() {
    console.log("ConcreteStateB handles request2.");
    console.log("ConcreteStateB wants to change the state of the context.");
    this.context.transitionTo(new ConcreteStateA());
  }
}

module.exports = {
  ConcreteStateA,
  ConcreteStateB,
};
