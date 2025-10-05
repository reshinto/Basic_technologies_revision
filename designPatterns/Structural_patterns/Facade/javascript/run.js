const Car = require("./facade");

const c = new Car();
c.turnKey(); // engine not started because there is no charge

c.jump();
c.turnKey(); // engine starts because it has been charged

