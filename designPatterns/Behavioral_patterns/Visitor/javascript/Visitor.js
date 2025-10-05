/**
 * The Visitor Interface declares a set of visiting methods that correspond to
 * component classes. The signature of a visiting method allows the visitor to
 * identify the exact class of the component that it's dealing with.
 */
class Visitor {
  visitConcreteComponentA(element) {}

  visitConcreteComponentB(element) {}
}

module.exports = Visitor;
