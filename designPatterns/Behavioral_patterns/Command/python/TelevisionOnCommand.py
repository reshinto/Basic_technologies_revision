class TelevisionOnCommand:
    def __init__(self, television):
        self.television = television

    def execute(self):
        self.television.on()

    def undo(self):
        self.television.off()
