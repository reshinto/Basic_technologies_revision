import Television from "./TelevisionReceiver";
import TelevisionOnCommand from "./TelevisionOnCommand";
import TelevisionOffCommand from "./TelevisionOffCommand";
import RemoteController from "./RemoteControllerInvoker";

const television = new Television();
const televisionOnCommand = new TelevisionOnCommand(television);
const televisionOffCommand = new TelevisionOffCommand(television);
const remote = new RemoteController();

remote.setCommand(televisionOnCommand, televisionOffCommand);

console.log("state of television before remote is used:", television.state);
remote.clickOnButton();
console.log("state of television after remote is used with on click:", television.state);
remote.clickOffButton();
console.log("state of television after remote is used with off click:", television.state);