class ShapeAbstract:
    def __init__(self, color):
        self.color = color

    def log_me(self):
        print(f"I am a {self.color.log()} shape.")
