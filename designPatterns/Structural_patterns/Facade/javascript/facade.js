class Engine {
  constructor() {
    // how much the motor is spinning in revs per minute
    this.spin = 0;
  }

  start(spin) {
    this.spin = Math.min(spin, 3000);
  }
}


class StarterMotor {
  constructor() {
    // how much the starter motor is spinning in revs per minute
    this.spin = 0;
  }

  start(charge) {
    // if there is enough power then spin fast
    if (charge > 50) {
      this.spin = 2500;
    }
  }
}


class Battery {
  constructor() {
    // % charged, starts flat
    this.charge = 0;
  }
}


class Car {
  // the facade object that deals with the battery, engine and starter motor
  constructor() {
    this.battery = new Battery();
    this.starter = new StarterMotor();
    this.engine = new Engine();
  }

  turnKey() {
    this.starter.start(this.battery.charge);
    this.engine.start(this.starter.spin);
    if (this.engine.spin > 0) {
      console.log("Engine started");
    } else {
      console.log("Engine not started");
    }
  }

  jump() {
    this.battery.charge = 100;
    console.log("Jumped");
  }
}

module.exports = Car;
