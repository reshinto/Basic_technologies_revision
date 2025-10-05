from abc import ABC, abstractmethod

# this violates the interface segregation principle
# because it is being used by multiple classes that does not requires all of it
class Entity(ABC):
    def __init__(self, name, attack_damage, health):
        self.name = name
        self.attack_damage = attack_damage
        self.health = health

    @abstractmethod
    def move(self):
        pass

    @abstractmethod
    def attack(self, target_entity):
        pass

    @abstractmethod
    def take_damage(self, amount):
        pass


class Character(Entity):
    def __init__(self, name, attack_damage, health):
        super().__init__(name, attack_damage, health)

    def move(self):
        print(f"{self.name} moved")

    def attack(self, target_entity):
        print(
            f"{self.name} attacked {target_entity.name} for {self.attack_damage} damage",
        )
        target_entity.take_damage(self.attack_damage)

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} has {self.health} health remaining")


class Wall(Entity):
    def __init__(self, name, health):
        super().__init__(name, 0, health)

    def move(self):
        return None

    def attack(self):
        return None

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} has {self.health} health remaining")


class Turret(Entity):
    def __init__(self, name, attack_damage):
        super().__init__(name, attack_damage, 0)

    def move(self):
        return None

    def take_damage(self):
        return None

    def attack(self, target_entity):
        print(
            f"{self.name} attacked {target_entity.name} for {self.attack_damage} damage",
        )
        target_entity.take_damage(self.attack_damage)


turret = Turret("Turret", 5)
character = Character("Character", 3, 100)
wall = Wall("Wall", 200)

turret.attack(character)
character.move()
character.attack(wall)
