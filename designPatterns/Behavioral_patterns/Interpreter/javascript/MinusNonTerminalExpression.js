// provide specific conversions on different types of data
class MinusNonTerminalExpression {
  constructor(numA, numB) {
    this.numA = numA;
    this.numB = numB;
  }

  interpret(context) {
    return this.numA.interpret(context) - this.numB.interpret(context);
  }
}

module.exports = MinusNonTerminalExpression;
