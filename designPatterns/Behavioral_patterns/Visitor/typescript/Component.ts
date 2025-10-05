import Visitor from "./Visitor";

/**
 * The Component interface declares an `accept` method that should take the base
 * visitor interface as an argument.
 */
export default interface Component {
  accept(visitor: Visitor): void;
}
