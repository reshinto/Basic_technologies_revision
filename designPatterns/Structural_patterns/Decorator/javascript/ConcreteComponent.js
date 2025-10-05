const Component = require("./Component");

/**
 * Concrete Components provide default implementations of the operations. There
 * might be several variations of these classes.
 */
class ConcreteComponent extends Component {
  operation() {
    return "ConcreteComponent";
  }
}

module.exports = ConcreteComponent;
