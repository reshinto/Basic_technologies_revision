class TelevisionOnCommand {
  constructor(television) {
    this.television = television;
  }

  execute() {
    this.television.on();
  }

  undo() {
    this.television.off();
  }
}

module.exports = TelevisionOnCommand;
