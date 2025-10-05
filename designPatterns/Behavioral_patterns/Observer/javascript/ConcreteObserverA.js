const Observer = require("./Observer");
const ConcreteSubject = require("./ConcreteSubject");

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
class ConcreteObserverA extends Observer {
  update(subject) {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}

module.exports = ConcreteObserverA;
