from AbstractFactory import Shape2DFactory, Shape3DFactory

s2 = Shape2DFactory()
print(s2.getShape(1))
s2.getShape(1).draw()

s3 = Shape3DFactory()
print(s3.getShape(1))
s3.getShape(1).build()
