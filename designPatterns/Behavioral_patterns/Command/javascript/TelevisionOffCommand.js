class TelevisionOffCommand {
  constructor(television) {
    this.television = television;
  }

  execute() {
    this.television.off();
  }

  undo() {
    this.television.on();
  }
}

module.exports = TelevisionOffCommand;
