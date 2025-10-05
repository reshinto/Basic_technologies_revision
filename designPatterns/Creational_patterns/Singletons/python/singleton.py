class Singleton:
    __instance = None

    def __new__(cls, val=None):
        if Singleton.__instance is None:
            Singleton.__instance = object.__new__(cls)
        Singleton.__instance.val = val
        return Singleton.__instance


x = Singleton()
x.val = "burger"
print(x.val)  # "burger"

y = Singleton()
y.val = "chips"
print(y.val)  # "chips"
print(x.val)  # "chips"
