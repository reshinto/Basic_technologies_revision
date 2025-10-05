// Bridge Abstraction
import ColorInterface from "./ColorInterface";

// Define an abstract class for the Abstraction
/**
 * The Abstraction defines the interface for the "control" part of the two class
 * hierarchies. It maintains a reference to an object of the Implementation
 * hierarchy and delegates all of the real work to this object.
 */
export default abstract class ShapeAbstract {
  color: ColorInterface;

  constructor(color: ColorInterface) {
    this.color = color;
  }

  logMe() {
    console.log(`I am a ${this.color.log()} shape.`);
  }
}