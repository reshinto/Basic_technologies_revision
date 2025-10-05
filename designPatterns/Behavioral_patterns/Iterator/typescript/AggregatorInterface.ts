import Iterator from "./IteratorInterface";
/**
 * Iterator Design Pattern
 *
 * Intent: Lets you traverse elements of a collection without exposing its
 * underlying representation (list, stack, tree, etc.).
 */
export default interface Aggregator {
  // Retrieve an external iterator.
  getIterator(): Iterator<string>;
}