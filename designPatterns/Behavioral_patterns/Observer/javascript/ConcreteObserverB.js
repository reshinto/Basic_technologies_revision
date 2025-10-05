const Observer = require("./Observer");
const ConcreteSubject = require("./ConcreteSubject");

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
class ConcreteObserverB extends Observer {
  update(subject) {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}

module.exports = ConcreteObserverB;
