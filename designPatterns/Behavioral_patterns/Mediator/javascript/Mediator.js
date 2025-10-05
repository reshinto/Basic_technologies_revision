/**
 * The Mediator interface declares a method used by components to notify the
 * mediator about various events. The Mediator may react to these events and
 * pass the execution to other components.
 */
class Mediator {
  notify(sender, event) {}
}

module.exports = Mediator;
