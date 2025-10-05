const ShapeAbstract = require("./ShapeAbstract");

// You can extend the Abstraction without changing the Implementation classes
class TriangleAbstraction extends ShapeAbstract {
  constructor(color) {
    super(color);
  }
}

module.exports = TriangleAbstraction;
