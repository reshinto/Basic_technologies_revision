from Strategy import Strategy


class ConcreteStrategyB(Strategy):
    """
    Concrete Strategies implement the algorithm while following the base Strategy
    interface. The interface makes them interchangeable in the Context.
    """

    def do_algorithm(self, data):
        return reversed(sorted(data))
