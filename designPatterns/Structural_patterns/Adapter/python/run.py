from adapter import EuropeanSocket, AmericanKettle, Adapter

socket = EuropeanSocket()
kettle = AmericanKettle(socket)
kettle.boil()

adapter = Adapter(socket)
kettle = AmericanKettle(adapter)
kettle.boil()
