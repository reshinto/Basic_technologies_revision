// this violates the interface segregation principle
// because it is being used by multiple classes that does not requires all of it
interface Entity {
  name: string;
  attackDamage: number;
  health: number;

  move(): void | null;
  attack(targetEntity: Entity | undefined): void | null;
  takeDamage(amount: number): void | null;
}

// passes the interface segregation principle
class Character implements Entity {
  name: string;
  attackDamage: number;
  health: number;

  constructor(name: string, attackDamage: number, health: number) {
    this.name = name;
    this.attackDamage = attackDamage;
    this.health = health;
  }

  move(): void {
    console.log(`${this.name} moved`);
  }

  attack(targetEntity: Entity | undefined): void {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`,
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  takeDamage(amount: number | undefined): void {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

class Wall implements Entity {
  name: string;
  // violates the interface segregation principle
  attackDamage: number;
  health: number;

  constructor(name: string, health: number) {
    this.name = name;
    this.attackDamage = 0;
    this.health = health;
  }

  // violates the interface segregation principle
  move(): null {
    return null;
  }

  // violates the interface segregation principle
  attack(): null {
    return null;
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

class Turret implements Entity {
  name: string;
  attackDamage: number;
  // violates the interface segregation principle
  health: number;

  constructor(name: string, attackDamage: number) {
    this.name = name;
    this.attackDamage = attackDamage;
    this.health = 0;
  }

  // violates the interface segregation principle
  move(): null {
    return null;
  }

  attack(targetEntity: Entity): void {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`,
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  // violates the interface segregation principle
  takeDamage(): null {
    return null;
  }
}

const turret = new Turret("turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
