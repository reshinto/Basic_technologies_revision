from ShapeAbstract import ShapeAbstract


class CircleRefinedAbstraction(ShapeAbstract):
    def __init__(self, color):
        super().__init__(color)

    def log_me(self):
        print(f"I am a {self.color.log()} circle.")
