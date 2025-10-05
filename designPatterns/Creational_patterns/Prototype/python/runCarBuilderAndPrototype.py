from CarBuilderAndPrototype import JeepBuilder, Director


d = Director()
d.setBuilder(JeepBuilder())
jeep = d.getCar()  # check if it is a car
print(jeep)

jeep.specification()  # check if it is a jeep

jeep2 = jeep.clone()
print(jeep2)  # check if another similar jeep has been built
