/**
 * State Design Pattern
 *
 * Intent: Lets an object alter its behavior when its internal state changes. It
 * appears as if the object changed its class.
 */

const {ConcreteStateA} = require("./ConcreteState");
const Context = require("./Context");

const context = new Context(new ConcreteStateA());
context.request1();
context.request2();
