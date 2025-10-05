const AbstractClass = require("./AbstractClass");

/**
 * Concrete classes have to implement all abstract operations of the base class.
 * They can also override some operations with a default implementation.
 */
class ConcreteClass1 extends AbstractClass {
  requiredOperations1() {
    console.log("ConcreteClass1 says: Implemented Operation1");
  }

  requiredOperation2() {
    console.log("ConcreteClass1 says: Implemented Operation2");
  }
}

module.exports = ConcreteClass1;
