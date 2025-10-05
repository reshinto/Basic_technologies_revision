// provide specific conversions on different types of data
class VariableTerminalExpression {
  constructor(variable) {
    this.variable = variable;
  }

  interpret(context) {
    return context[this.variable] || 0;
  }
}

module.exports = VariableTerminalExpression;
