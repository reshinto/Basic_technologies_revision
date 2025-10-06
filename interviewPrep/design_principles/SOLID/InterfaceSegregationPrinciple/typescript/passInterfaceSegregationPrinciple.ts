interface Entity {
  name: string;
}

interface Mover {
  move(): void;
}

interface Attacker {
  attackDamage: number;
  attack(targetEntity: any): void;
}

interface HasHealth {
  health: number;
  takeDamage(amount: number): void;
}

class Character implements Entity, Mover, Attacker, HasHealth {
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

  attack(targetEntity: any): void {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`,
    );
    targetEntity.takeDamage(this.attackDamage);
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

class Wall implements Entity, HasHealth {
  name: string;
  health: number;

  constructor(name: string, health: number) {
    this.name = name;
    this.health = health;
  }

  takeDamage(amount: number): void {
    this.health -= amount;
    console.log(`${this.name} has ${this.health} health remaining`);
  }
}

class Turret implements Entity, Attacker {
  name: string;
  attackDamage: number;

  constructor(name: string, attackDamage: number) {
    this.name = name;
    this.attackDamage = attackDamage;
  }

  attack(targetEntity: any): void {
    console.log(
      `${this.name} attacked ${targetEntity.name} for ${this.attackDamage} damage`,
    );
    targetEntity.takeDamage(this.attackDamage);
  }
}

const turret = new Turret("Turret", 5);
const character = new Character("Character", 3, 100);
const wall = new Wall("Wall", 200);

turret.attack(character);
character.move();
character.attack(wall);
