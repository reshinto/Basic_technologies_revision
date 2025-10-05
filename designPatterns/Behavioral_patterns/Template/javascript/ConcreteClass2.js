const AbstractClass = require("./AbstractClass");

/**
 * Usually, concrete classes override only a fraction of base class' operations.
 */
class ConcreteClass2 extends AbstractClass {
  requiredOperations1() {
    console.log("ConcreteClass2 says: Implemented Operation1");
  }

  requiredOperation2() {
    console.log("ConcreteClass2 says: Implemented Operation2");
  }

  hook1() {
    console.log("ConcreteClass2 says: Overridden Hook1");
  }
}

module.exports = AbstractClass;
