const ShapeAbstract = require("./ShapeAbstract");

// You can extend the Abstraction without changing the Implementation classes
class CircleRefinedAbstraction extends ShapeAbstract {
  constructor(color) {
    super(color);
  }

  // Create a refined Abstraction that behaves slightly differently
  logMe() {
    console.log(`I am a ${this.color.log()} circle.`);
  }
}

module.exports = CircleRefinedAbstraction;
