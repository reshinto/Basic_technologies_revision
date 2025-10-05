// Create a Concrete Implementation

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
class BlueConcreteImplementation {
  log() {
    return "blue";
  }
}

module.exports = BlueConcreteImplementation;
