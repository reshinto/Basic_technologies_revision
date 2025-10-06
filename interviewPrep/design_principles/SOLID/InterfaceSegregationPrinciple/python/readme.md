# Python Example

## Violate ISP

```python
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
```

## Pass ISP

```python
from abc import ABC, abstractmethod


class Entity(ABC):
    def __init__(self, name):
        self.name = name


class Mover(ABC):
    @abstractmethod
    def move(self):
        pass


class Attacker(ABC):
    def __init__(self, attack_damage):
        self.attack_damage = attack_damage

    @abstractmethod
    def attack(self, target_entity):
        pass


class HasHealth(ABC):
    def __init__(self, health):
        self.health = health

    @abstractmethod
    def take_damage(self, amount):
        pass


class Character(Entity, Mover, Attacker, HasHealth):
    def __init__(self, name, attack_damage, health):
        Entity.__init__(self, name)
        Attacker.__init__(self, attack_damage)
        HasHealth.__init__(self, health)

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


class Wall(Entity, HasHealth):
    def __init__(self, name, health):
        Entity.__init__(self, name)
        HasHealth.__init__(self, health)

    def take_damage(self, amount):
        self.health -= amount
        print(f"{self.name} has {self.health} health remaining")


class Turret(Entity, Attacker):
    def __init__(self, name, attack_damage):
        Entity.__init__(self, name)
        Attacker.__init__(self, attack_damage)

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
```
