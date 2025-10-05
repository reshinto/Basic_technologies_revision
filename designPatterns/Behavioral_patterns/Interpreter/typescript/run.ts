import Context from "./Context";
import NumberTerminalExpression from "./NumberTerminalExpression";
import VariableTerminalExpression from "./VariableTerminalExpression";
import TimesNonTerminalExpression from "./TimesNonTerminalExpression";
import MinusNonTerminalExpression from "./MinusNonTerminalExpression";

type allExpressions = TimesNonTerminalExpression | MinusNonTerminalExpression | VariableTerminalExpression | NumberTerminalExpression;

class Client {
  context: Context;

  constructor(context: Context) {
    this.context = context;
  }

  parse(expression: string): number {
    const values: string[] = expression.split(" ");
    const queue: (allExpressions)[] = [];
    let exp: allExpressions;
    let numB: allExpressions;
    let numA: allExpressions;
    for (const value of values) {
      switch (value) {
        case "*":
          numB = queue.pop();
          numA = queue.pop();
          exp = new TimesNonTerminalExpression(numA, numB);
          break;
        case "-":
          numB = queue.pop();
          numA = queue.pop();
          exp = new MinusNonTerminalExpression(numA, numB);
          break;
        default:
          if (isNaN(parseInt(value))) {
            exp = new VariableTerminalExpression(value);
          } else {
            const number = parseInt(value);
            exp = new NumberTerminalExpression(number);
          }
          break;
      }
      queue.push(exp);
    }
    const main: allExpressions = queue.pop();
    return main.interpret(this.context);
  }
}

const ctxt: Context = new Context(45);
const res: number = new Client(ctxt).parse("16 v * 76 q - -");
console.log(res);
