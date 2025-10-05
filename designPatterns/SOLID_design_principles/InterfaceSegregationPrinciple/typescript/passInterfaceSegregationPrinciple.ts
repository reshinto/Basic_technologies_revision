interface Entity2 {
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

class Character2 implements Entity2, Mover, Attacker, HasHealth {
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

class Wall2 implements Entity2, HasHealth {
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

class Turret2 implements Entity2, Attacker {
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

const turret2 = new Turret2("Turret", 5);
const character2 = new Character2("Character", 3, 100);
const wall2 = new Wall2("Wall", 200);

turret2.attack(character2);
character2.move();
character2.attack(wall2);
