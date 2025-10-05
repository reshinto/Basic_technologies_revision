import ColorInterface from "./ColorInterface";

// Create a Concrete Implementation

/**
 * Each Concrete Implementation corresponds to a specific platform and
 * implements the Implementation interface using that platform's API.
 */
export default class RedConcreteImplementation implements ColorInterface {
  log() {
    return 'red';
  }
}