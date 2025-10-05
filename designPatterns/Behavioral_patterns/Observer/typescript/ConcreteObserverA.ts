import ConcreteSubject from "./ConcreteSubject";
import Observer from "./Observer";
import Subject from "./Subject";

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
export default class ConcreteObserverA implements Observer {
  public update(subject: Subject): void {
    if (subject instanceof ConcreteSubject && subject.state < 3) {
      console.log("ConcreteObserverA: Reacted to the event.");
    }
  }
}
