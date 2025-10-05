from Factory import ShapeFactory

F = ShapeFactory()
s = F.getShape("Square")
print(s)
s.draw()
