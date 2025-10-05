class TelevisionOffCommand:
    def __init__(self, television):
        self.television = television

    def execute(self):
        self.television.off()

    def undo(self):
        self.television.on()
