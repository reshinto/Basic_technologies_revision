const Phone = require("./PhoneInterface");

class iPhoneXR {
  constructor(serialNum) {
    return new Phone(serialNum, "iPhone Xr", "A12 Bionic", "3 Gb", 75.7, 150.9, 8.3, "828 x 1792");
  }
}

module.exports = iPhoneXR;
