const Memento = require("./Memento");

/**
 * The Concrete Memento contains the infrastructure for storing the Originator's
 * state.
 */
class ConcreteMemento extends Memento {
  constructor(state) {
    super();
    this.state = state;
    this.date = new Date().toISOString().slice(0, 19).replace("T", " ");
  }

  /**
   * The Originator uses this method when restoring its state.
   */
  getState() {
    return this.state;
  }

  /**
   * The rest of the methods are used by the Caretaker to display metadata.
   */
  getName() {
    return `${this.date} / (${this.state.substr(0, 9)}...)`;
  }

  getDate() {
    return this.date;
  }
}

module.exports = ConcreteMemento;
