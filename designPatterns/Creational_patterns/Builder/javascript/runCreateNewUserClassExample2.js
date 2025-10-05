// const {SignupNormalMethod} = require("./SignupSingletonInterface");
const SignupBuilder = require("./SignupBuilderClass");

// normal method
// SignupNormalMethod.create(
//   "John Doe",
//   "john@email.com",
//   25,
//   "johndoe.jpg",
//   "john_D",
//   ["JavaScript", "Node.js"],
//   ["Node.js"],
//   true,
//   false,
// );

// using builder method
// free to rearrange or exclude
new SignupBuilder("John Doe", "john@email.com", 25)
  .setPhoto("johndoe.jpg")
  .setNick("John_D")
  .setTopics(["Node.js", "JavaScript"])
  .setSME(["Node.js"])
  .setModerator()
  .setAdmin()
  .create();
