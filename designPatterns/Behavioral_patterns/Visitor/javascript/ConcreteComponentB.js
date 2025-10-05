const Component = require("./Component");

/**
 * Each Concrete Component must implement the `accept` method in such a way that
 * it calls the visitor's method corresponding to the component's class.
 */
class ConcreteComponentB extends Component {
  /**
   * Same here: visitConcreteComponentB => ConcreteComponentB
   */
  accept(visitor) {
    visitor.visitConcreteComponentB(this);
  }

  specialMethodOfConcreteComponentB() {
    return "B";
  }
}

module.exports = ConcreteComponentB;
