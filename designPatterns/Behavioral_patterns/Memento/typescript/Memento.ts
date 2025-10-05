/**
 * The Memento interface provides a way to retrieve the memento's metadata, such
 * as creation date or name. However, it doesn't expose the Originator's state.
 */
export default interface Memento {
  getState(): string;

  getName(): string;

  getDate(): string;
}
