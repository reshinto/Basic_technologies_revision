import ConcreteSubject from "./ConcreteSubject";
import Observer from "./Observer";
import Subject from "./Subject";

/**
 * Concrete Observers react to the updates issued by the Subject they had been
 * attached to.
 */
export default class ConcreteObserverB implements Observer {
  public update(subject: Subject): void {
    if (
      subject instanceof ConcreteSubject &&
      (subject.state === 0 || subject.state >= 2)
    ) {
      console.log("ConcreteObserverB: Reacted to the event.");
    }
  }
}
