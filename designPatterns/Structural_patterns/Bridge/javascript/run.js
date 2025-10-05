const CircleRefinedAbstraction = require("./CircleRefinedAbstraction");
const TriangleAbstraction = require("./TriangleAbstraction");
const RedConcreteImplementation = require("./RedConcreteImplementation");
const BlueConcreteImplementation = require("./BlueConcreteImplementation");

// Bridge pattern is to link the abstraction and implementation which had been separated
// Instantiate the circle with a concrete implementation

/**
 * The client code should be able to work with any pre-configured abstraction-
 * implementation combination.
 */
const circle = new CircleRefinedAbstraction(new RedConcreteImplementation());
const triangle = new TriangleAbstraction(new BlueConcreteImplementation());

circle.logMe();  // Output: I am a red circle.

triangle.logMe();  // Output: I am a blue shape.
