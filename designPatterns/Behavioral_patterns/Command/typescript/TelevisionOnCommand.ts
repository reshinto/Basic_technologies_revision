import Television from "./TelevisionReceiver";
import Command from "./CommandInterface";

export default class TelevisionOnCommand implements Command {
  television: Television;

  constructor(television: Television) {
    this.television = television;
  }

  execute() {
    this.television.on();
  }

  undo() {
    this.television.off();
  }
}
