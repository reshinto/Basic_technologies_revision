const User = require("./UserClass");
const UserPref = require("./UserPrefClass");

// normal method
class Signup {
  async create(
    name,
    email,
    age,
    photo,
    nickname,
    favoriteTopics,
    isSME,
    isModerator,
    isAdmin,
  ) {
    const newUser = await new User(name, email, age, photo);
    await new UserPref(
      newUser,
      nickname,
      favoriteTopics,
      isSME,
      isModerator,
      isAdmin,
    );
  }
}

// using builder method
class Signup2 {
  async create(
    {
      name,
      email,
      age,
      photo,
      nickname,
      favoriteTopics,
      isSME,
      isModerator,
      isAdmin,
    },
  ) {
    const newUser = await new User(name, email, age, photo);
    await new UserPref(
      newUser,
      nickname,
      favoriteTopics,
      isSME,
      isModerator,
      isAdmin,
    );
  }
}

module.exports = {
  SignupNormalMethod: new Signup(),
  SignupWithBuilderMethod: new Signup2(),
};
