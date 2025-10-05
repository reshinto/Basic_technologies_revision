const Strategy = require("./Strategy");

/**
 * Concrete Strategies implement the algorithm while following the base Strategy
 * interface. The interface makes them interchangeable in the Context.
 */
class ConcreteStrategyB extends Strategy {
  doAlgorithm(data) {
    return data.reverse();
  }
}

module.exports = ConcreteStrategyB;
