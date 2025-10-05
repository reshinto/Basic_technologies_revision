from facade import Car

c = Car()
c.turn_key()  # engine not started because there is no charge

c.jump()
c.turn_key()  # engine starts because it has been charged
