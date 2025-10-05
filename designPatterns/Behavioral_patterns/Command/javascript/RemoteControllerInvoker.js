class RemoteController {
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

module.exports = RemoteController;
