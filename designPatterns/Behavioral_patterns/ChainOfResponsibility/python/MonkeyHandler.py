from HandlerAbstract import HandlerAbstract


class MonkeyHandler(HandlerAbstract):
    def handle(self, request):
        if request == "Banana":
            return f"Monkey: I'll eat the {request}"
        return super().handle(request)
