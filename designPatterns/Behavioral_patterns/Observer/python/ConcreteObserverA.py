from Observer import Observer


class ConcreteObserverA(Observer):
    """
    Concrete Observers react to the updates issued by the Subject they had been
    attached to.
    """

    def update(self, subject):
        if subject._state < 3:
            print("ConcreteObserverA: Reacted to the event")
