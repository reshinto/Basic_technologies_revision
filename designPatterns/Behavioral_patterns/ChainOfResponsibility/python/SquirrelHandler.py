from HandlerAbstract import HandlerAbstract


class SquirrelHandler(HandlerAbstract):
    def handle(self, request):
        if request == "Nut":
            return f"Squirrel: I'll eat the {request}"
        return super().handle(request)
