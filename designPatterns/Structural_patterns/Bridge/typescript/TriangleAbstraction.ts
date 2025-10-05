import ShapeAbstract from "./ShapeAbstract";
import ColorInterface from "./ColorInterface";

// You can extend the Abstraction without changing the Implementation classes
export default class TriangleAbstraction extends ShapeAbstract {
  constructor(color: ColorInterface) {
    super(color);
  }
}