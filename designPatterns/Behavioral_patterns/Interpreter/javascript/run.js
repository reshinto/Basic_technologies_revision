const Context = require("./Context");
const NumberTerminalExpression = require("./NumberTerminalExpression");
const VariableTerminalExpression = require("./VariableTerminalExpression");
const TimesNonTerminalExpression = require("./TimesNonTerminalExpression");
const MinusNonTerminalExpression = require("./MinusNonTerminalExpression");

class Client {
  constructor(context) {
    this.context = context;
  }

  parse(expression) {
    const values = expression.split(" ");
    const queue = [];
    let exp;
    let numB;
    let numA;
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
    const main = queue.pop();
    return main.interpret(this.context);
  }
}

const ctxt = new Context(45);
const res = new Client(ctxt).parse("16 v * 76 q - -");
console.log(res);
