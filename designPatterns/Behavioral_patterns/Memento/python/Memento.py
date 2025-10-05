from abc import ABC, abstractmethod


class Memento(ABC):
    """
    The Memento interface provides a way to retrieve the memento's metadata,
    such as creation date or name. However, it doesn't expose the Originator's
    state.
    """

    @abstractmethod
    def get_name(self):
        pass

    @abstractmethod
    def get_date(self):
        pass
