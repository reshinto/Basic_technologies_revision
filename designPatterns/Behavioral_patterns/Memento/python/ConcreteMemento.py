from datetime import datetime
from Memento import Memento


class ConcreteMemento(Memento):
    def __init__(self, state):
        self._state = state
        self._date = str(datetime.now())[:19]

    def get_state(self):
        """
        The Originator uses this method when restoring its state.
        """
        return self._state

    def get_name(self):
        """
        The rest of the methods are used by the Caretaker to display metadata.
        """

        return f"{self._date} / ({self._state[0:9]}...)"

    def get_date(self):
        return self._date
