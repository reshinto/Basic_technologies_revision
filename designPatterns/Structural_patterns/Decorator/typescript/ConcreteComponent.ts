import Component from "./Component";

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
export default class ConcreteComponent implements Component {
  public operation(): string {
    return 'ConcreteComponent';
  }
}