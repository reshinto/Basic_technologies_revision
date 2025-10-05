/**
 * Visitor Design Pattern
 *
 * Intent: Lets you separate algorithms from the objects on which they operate.
 */

import Component from "./Component";
import ConcreteComponentA from "./ConcreteComponentA";
import ConcreteComponentB from "./ConcreteComponentB";
import ConcreteVisitor1 from "./ConcreteVisitor1";
import ConcreteVisitor2 from "./ConcreteVisitor2";
import Visitor from "./Visitor";

/**
 * The client code can run visitor operations over any set of elements without
 * figuring out their concrete classes. The accept operation directs a call to
 * the appropriate operation in the visitor object.
 */
function clientCode(components: Component[], visitor: Visitor) {
  // ...
  for (const component of components) {
    component.accept(visitor);
  }
  // ...
}

const components = [new ConcreteComponentA(), new ConcreteComponentB()];

console.log(
  "The client code works with all visitors via the base Visitor interface:",
);
const visitor1 = new ConcreteVisitor1();
clientCode(components, visitor1);
console.log("");

console.log(
  "It allows the same client code to work with different types of visitors:",
);
const visitor2 = new ConcreteVisitor2();
clientCode(components, visitor2);
