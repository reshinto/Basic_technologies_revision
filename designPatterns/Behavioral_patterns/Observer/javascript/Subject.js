/**
 * The Subject interface declares a set of methods for managing subscribers.
 */
class Subject {
  // Attach an observer to the subject.
  attach(observer) {}

  // Detach an observer from the subject.
  detach(observer) {}

  // Notify all observers about an event.
  notify() {}
}

module.exports = Subject;
