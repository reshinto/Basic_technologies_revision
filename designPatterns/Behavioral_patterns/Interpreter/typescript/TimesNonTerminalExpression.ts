import Context from "./Context";
import AbstractExpression from "./AbstractExpressions";
import MinusNonTerminalExpression from "./MinusNonTerminalExpression";
import VariableTerminalExpression from "./VariableTerminalExpression";
import NumberTerminalExpression from "./NumberTerminalExpression"

type allExpressions = TimesNonTerminalExpression | MinusNonTerminalExpression | VariableTerminalExpression | NumberTerminalExpression;

// provide specific conversions on different types of data
export default class TimesNonTerminalExpression implements AbstractExpression {
  numA: allExpressions;
  numB: allExpressions;

  constructor(numA: allExpressions, numB: allExpressions) {
    this.numA = numA;
    this.numB = numB;
  }

  public interpret(context: AbstractExpression | Context): number {
    return this.numA.interpret(context) * this.numB.interpret(context);
  }
}
