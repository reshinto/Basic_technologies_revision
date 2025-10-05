export default interface Command {
  execute(): any;
  undo(): any;
}
