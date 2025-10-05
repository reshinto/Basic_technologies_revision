class VariableTerminalExpression:
    def __init__(self, variable):
        self.variable = variable

    def interpret(self, context):
        return context.get(self.variable) or 0
