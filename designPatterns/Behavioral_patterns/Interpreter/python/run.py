from Context import Context
from NumberTerminalExpression import NumberTerminalExpression
from VariableTerminalExpression import VariableTerminalExpression
from TimesNonTerminalExpression import TimesNonTerminalExpression
from MinusNonTerminalExpression import MinusNonTerminalExpression


class Client:
    def __init__(self, context):
        self.context = context

    def parse(self, expression):
        values = expression.split(" ")
        queue = []
        for value in values:
            if value == "*":
                b = queue.pop()
                a = queue.pop()
                exp = TimesNonTerminalExpression(a, b)
            elif value == "-":
                b = queue.pop()
                a = queue.pop()
                exp = MinusNonTerminalExpression(a, b)
            else:
                try:
                    number = int(value)
                    exp = NumberTerminalExpression(number)
                except ValueError:
                    exp = VariableTerminalExpression(value)
            queue.append(exp)
        main = queue.pop()
        return main.interpret(self.context)


if __name__ == "__main__":
    ctxt = Context(45)
    res = Client(ctxt.__dict__).parse("16 v * 76 q - -")
    print(res)
