// this violates the interface segregation principle
// because it is being used by multiple classes that does not requires all of it
class Entity {
  constructor(name, attackDamage, health) {
    this.name = name;
    this.attackDamage = attackDamage;
    this.health = health;
  }

  move() {
    console.log(`${this.name} moved`);
  }

  attack(targetEntity) {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`,
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  takeDamage(amount) {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

// passes the interface segregation principle
class Character extends Entity {}

class Wall extends Entity {
  constructor(name, health) {
    // violates the interface segregation principle
    super(name, 0, health);
  }

  // violates the interface segregation principle
  move() {
    return null;
  }

  // violates the interface segregation principle
  attack() {
    return null;
  }
}

class Turret extends Entity {
  constructor(name, attackDamage) {
    // violates the interface segregation principle
    super(name, attackDamage, 0);
  }

  // violates the interface segregation principle
  move() {
    return null;
  }

  // violates the interface segregation principle
  takeDamage() {
    return null;
  }
}

const turret = new Turret("Turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
