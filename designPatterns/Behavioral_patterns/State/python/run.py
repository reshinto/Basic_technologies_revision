"""
State Design Pattern

Intent: Lets an object alter its behavior when its internal state changes. It
appears as if the object changed its class.
"""

from Context import Context
from ConcreteState import ConcreteStateA

if __name__ == "__main__":
    # The client code.

    context = Context(ConcreteStateA())
    context.request1()
    context.request2()
