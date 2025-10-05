const BaseComponent = require("./BaseComponent");

/**
 * Concrete Components implement various functionality. They don't depend on
 * other components. They also don't depend on any concrete mediator classes.
 */
class Component1 extends BaseComponent {
  doA() {
    console.log("Component 1 does A.");
    this.mediator.notify(this, "A");
  }

  doB() {
    console.log("Component 1 does B.");
    this.mediator.notify(this, "B");
  }
}

module.exports = Component1;
