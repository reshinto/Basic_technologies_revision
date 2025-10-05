const cashRegister1 = require("./Singleton");
const cashRegister2 = require("./Singleton");

cashRegister1.credit(25);
cashRegister2.credit(5);

console.log(`Total amount in cashRegister2 is ${cashRegister2.total()}`); // 30
