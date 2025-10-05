const iPhoneXR = require("../../Factory/javascript/IphoneXrFactory");
const iPhoneXS = require("../../Factory/javascript/IphoneXsFactory");
const iPhoneXSMax = require("../../Factory/javascript/IphoneXsMaxFactory");

class iPhoneFactory {
  create(type, serialNum) {
    switch (type) {
      case "iPhone Xr":
        return new iPhoneXR(serialNum);
      case "iPhone Xs":
        return new iPhoneXS(serialNum);
      case "iPhone Xs Max":
        return new iPhoneXSMax(serialNum);
      default:
      {
        console.log("Unknown iPhone type...");
      }
    }
  }
}

module.exports = new iPhoneFactory();
