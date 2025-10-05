from CarBuilder import JeepBuilder, NissanBuilder, Director

d = Director()
d.setBuilder(JeepBuilder())
print(d.getCar())
d.getCar().specification()

d2 = Director()
d2.setBuilder(NissanBuilder())
print(d2.getCar())
d2.getCar().specification()
