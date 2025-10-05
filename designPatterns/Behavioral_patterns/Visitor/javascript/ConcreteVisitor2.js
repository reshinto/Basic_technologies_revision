const Visitor = require("./Visitor");

/**
 * Concrete Visitors implement several versions of the same algorithm, which can
 * work with all concrete component classes.
 *
 * You can experience the biggest benefit of the Visitor pattern when using it
 * with a complex object structure, such as a Composite tree. In this case, it
 * might be helpful to store some intermediate state of the algorithm while
 * executing visitor's methods over various objects of the structure.
 */
class ConcreteVisitor2 extends Visitor {
  visitConcreteComponentA(element) {
    console.log(
      `${element.exclusiveMethodOfConcreteComponentA()} + ConcreteVisitor2`,
    );
  }

  visitConcreteComponentB(element) {
    console.log(
      `${element.specialMethodOfConcreteComponentB()} + ConcreteVisitor2`,
    );
  }
}

module.exports = ConcreteVisitor2;
