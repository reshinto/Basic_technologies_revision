/**
 * The base State class declares methods that all Concrete State should
 * implement and also provides a backreference to the Context object, associated
 * with the State. This backreference can be used by States to transition the
 * Context to another State.
 */
class State {
  setContext(context) {
    this.context = context;
  }

  handle1() {}

  handle2() {}
}

module.exports = State;
