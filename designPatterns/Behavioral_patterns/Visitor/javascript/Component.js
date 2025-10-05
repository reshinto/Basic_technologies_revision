/**
 * The Component interface declares an `accept` method that should take the base
 * visitor interface as an argument.
 */
class Component {
  accept(visitor) {}
}

module.exports = Component;
