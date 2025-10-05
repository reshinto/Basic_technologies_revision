from HandlerAbstract import HandlerAbstract


class DogHandler(HandlerAbstract):
    def handle(self, request):
        if request == "MeatBall":
            return f"Dog: I'll eat the {request}"
        return super().handle(request)
