from FlyweightFactory import FlyweightFactory


factory = FlyweightFactory(
    [
        ["Chevrolet", "Camaro2018", "pink"],
        ["Mercedes Benz", "C300", "black"],
        ["Mercedes Benz", "C500", "red"],
        ["BMW", "M5", "red"],
        ["BMW", "X6", "white"],
    ]
)


def add_car_to_police_database(ff, plates, owner, brand, model, color):
    print("\nClient: Adding a car to database.")
    flyweight = ff.get_flyweight([brand, model, color])

    flyweight.operation([plates, owner])


if __name__ == "__main__":
    factory.list_flyweights()

    add_car_to_police_database(factory, "CL234IR", "James Doe", "BMW", "M5", "red")

    add_car_to_police_database(factory, "CL234IR", "James Doe", "BMW", "X1", "red")

    factory.list_flyweights()
