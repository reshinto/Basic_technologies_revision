import Command from "./CommandInterface";

export default class RemoteController {
  onCommand: Command;
  offCommand: Command;

  setCommand(onCommand, offCommand) {
    this.onCommand = onCommand;
    this.offCommand = offCommand;
  }

  clickOnButton() {
    this.onCommand.execute();
  }

  clickOffButton() {
    this.offCommand.execute();
  }
}
