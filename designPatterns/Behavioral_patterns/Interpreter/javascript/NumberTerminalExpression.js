// provide specific conversions on different types of data
class NumberTerminalExpression {
  constructor(num) {
    this.num = num;
  }

  interpret(context) {
    return this.num;
  }
}

module.exports = NumberTerminalExpression;
