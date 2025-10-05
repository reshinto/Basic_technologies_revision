import Subject from "./Subject";

/**
 * The Observer interface declares the update method, used by subjects.
 */
export default interface Observer {
  // Receive update from subject.
  update(subject: Subject): void;
}
