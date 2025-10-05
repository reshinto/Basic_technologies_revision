// Method 1
// this is tedious, time consuming and prone to errors
// especially if there are more than 1 models to produce
const Phone = require("./PhoneInterface");

const iPhoneXR = new Phone("XR-0001", "iphone Xr", "A12 Bionic", "3 Gb", 75.7, 150.9, 8.3, "828 x 1792");

iPhoneXR.displayConfig();
iPhoneXR.dial(1234567);

// Method 2
const IPhoneXR = require("./IphoneXrFactory");
const IPhoneXS = require("./IphoneXsFactory");
const IPhoneXSMax = require("./IphoneXsMaxFactory");

const myNewIphoneXr = new IPhoneXR("XR-0001");
const myNewIphoneXs = new IPhoneXS("XS-0002");
const myNewIphoneXsMax = new IPhoneXSMax("XSMAX-0003");

myNewIphoneXr.displayConfig();
myNewIphoneXr.dial(1234567);

myNewIphoneXs.displayConfig();
myNewIphoneXs.dial(1234567);

myNewIphoneXsMax.displayConfig();
myNewIphoneXsMax.dial(1234567);
