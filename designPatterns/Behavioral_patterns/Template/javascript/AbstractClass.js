/**
 * The Abstract Class defines a template method that contains a skeleton of some
 * algorithm, composed of calls to (usually) abstract primitive operations.
 *
 * Concrete subclasses should implement these operations, but leave the template
 * method itself intact.
 */
class AbstractClass {
  /**
   * The template method defines the skeleton of an algorithm.
   */
  templateMethod() {
    this.baseOperation1();
    this.requiredOperations1();
    this.baseOperation2();
    this.hook1();
    this.requiredOperation2();
    this.baseOperation3();
    this.hook2();
  }

  /**
   * These operations already have implementations.
   */
  baseOperation1() {
    console.log("AbstractClass says: I am doing the bulk of the work");
  }

  baseOperation2() {
    console.log(
      "AbstractClass says: But I let subclasses override some operations",
    );
  }

  baseOperation3() {
    console.log(
      "AbstractClass says: But I am doing the bulk of the work anyway",
    );
  }

  /**
   * These operations have to be implemented in subclasses.
   */
  requiredOperations1() {}

  requiredOperation2() {}

  /**
   * These are "hooks." Subclasses may override them, but it's not mandatory
   * since the hooks already have default (but empty) implementation. Hooks
   * provide additional extension points in some crucial places of the
   * algorithm.
   */
  hook1() {}

  hook2() {}
}

module.exports = AbstractClass;
