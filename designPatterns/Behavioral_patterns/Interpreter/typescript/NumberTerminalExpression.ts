import Context from "./Context";
import AbstractExpression from "./AbstractExpressions";

// provide specific conversions on different types of data
export default class NumberTerminalExpression implements AbstractExpression {
  num: number;

  constructor(num: number) {
    this.num = num;
  }

  public interpret(context: AbstractExpression | Context): number {
    return this.num;
  }
}
