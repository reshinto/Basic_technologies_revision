from RemoteControllerInvoker import RemoteControllerInvoker as RemoteController
from TelevisionOffCommand import TelevisionOffCommand
from TelevisionOnCommand import TelevisionOnCommand
from TelevisionReceiver import TelevisionReceiver as Television

if __name__ == "__main__":
    television = Television()
    television_on_command = TelevisionOnCommand(television)
    television_off_command = TelevisionOffCommand(television)
    remote = RemoteController()

    remote.set_command(television_on_command, television_off_command)

    print("state of television before remote is used:", television.state)
    remote.click_on_button()
    print("state of television after remote is used with on click:", television.state)
    remote.click_off_button()
    print("state of television after remote is used with off click:", television.state)
