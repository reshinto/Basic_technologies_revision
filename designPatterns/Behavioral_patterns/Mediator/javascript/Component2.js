const BaseComponent = require("./BaseComponent");

/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class Component2 extends BaseComponent {
  doC() {
    console.log("Component 2 does C.");
    this.mediator.notify(this, "C");
  }

  doD() {
    console.log("Component 2 does D.");
    this.mediator.notify(this, "D");
  }
}

module.exports = Component2;
