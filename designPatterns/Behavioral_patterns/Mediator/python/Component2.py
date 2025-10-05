"""
Concrete Components implement various functionality. They don't depend on other
components. They also don't depend on any concrete mediator classes.
"""
from BaseComponent import BaseComponent


class Component2(BaseComponent):
    def do_c(self):
        print("Component 2 does C.")
        self.mediator.notify(self, "C")

    def do_d(self):
        print("Component 2 does D.")
        self.mediator.notify(self, "D")
