import Context from "./Context";
import AbstractExpression from "./AbstractExpressions";

// provide specific conversions on different types of data
export default class VariableTerminalExpression implements AbstractExpression {
  variable: string;

  constructor(variable: string) {
    this.variable = variable;
  }

  public interpret(context: AbstractExpression | Context): number {
    return context[this.variable] || 0;
  }
}
