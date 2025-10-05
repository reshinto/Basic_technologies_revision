const {SignupWithBuilderMethod} = require("./SignupSingletonInterface");

class SignupBuilder {
  constructor(name, email, age) {
    this.name = name;
    this.email = email;
    this.age = age;
  }

  setNick(name) {
    this.nickname = name;
    return this;
  }

  setPhoto(photo) {
    this.photo = photo;
    return this;
  }

  setTopics(topics) {
    this.favoriteTopics = topics;
    return this;
  }

  setSME(topics) {
    this.isSME = topics;
    return this;
  }

  setModerator() {
    this.isModerator = true;
    return this;
  }

  setAdmin() {
    this.isAdmin = true;
    return this;
  }

  create() {
    return SignupWithBuilderMethod.create(this);
  }
}

module.exports = SignupBuilder;

