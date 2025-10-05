const Decorator = require("./Decorator");
/**
 * Concrete Decorators call the wrapped object and alter its result in some way.
 */
class ConcreteDecoratorA extends Decorator {
  /**
   * Decorators may call parent implementation of the operation, instead of
   * calling the wrapped object directly. This approach simplifies extension
   * of decorator classes.
   * Decorators can execute their behavior either before or after the call to a
   * wrapped object.
   */
  operation() {
    return `ConcreteDecoratorA(${super.operation()})`;
  }
}

module.exports = ConcreteDecoratorA;
