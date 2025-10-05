import Television from "./TelevisionReceiver";
import Command from "./CommandInterface";

export default class TelevisionOffCommand implements Command {
  television: Television;

  constructor(television: Television) {
    this.television = television;
  }

  execute() {
    this.television.off();
  }

  undo() {
    this.television.on();
  }
}
