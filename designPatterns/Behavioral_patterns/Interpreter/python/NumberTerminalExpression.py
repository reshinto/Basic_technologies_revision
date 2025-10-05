class NumberTerminalExpression:
    def __init__(self, num):
        self.num = num

    def interpret(self, context):
        return self.num
