const Strategy = require("./Strategy");

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class ConcreteStrategyA extends Strategy {
  doAlgorithm(data) {
    return data.sort();
  }
}

module.exports = ConcreteStrategyA;
