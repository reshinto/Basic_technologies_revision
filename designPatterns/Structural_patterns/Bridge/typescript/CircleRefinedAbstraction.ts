import ShapeAbstract from "./ShapeAbstract";
import ColorInterface from "./ColorInterface";

// You can extend the Abstraction without changing the Implementation classes
export default class CircleRefinedAbstraction extends ShapeAbstract {
  constructor(color: ColorInterface) {
    super(color);
  }

  // Create a refined Abstraction that behaves slightly differently
  logMe() {
    console.log(`I am a ${this.color.log()} circle.`);
  }
}