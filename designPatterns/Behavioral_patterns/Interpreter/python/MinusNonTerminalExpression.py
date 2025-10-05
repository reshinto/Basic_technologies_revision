class MinusNonTerminalExpression:
    def __init__(self, a, b):
        self.a = a
        self.b = b

    def interpret(self, context):
        return self.a.interpret(context) - self.b.interpret(context)
