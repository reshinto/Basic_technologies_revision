class RemoteControllerInvoker:
    def set_command(self, on_command, off_command):
        self.on_command = on_command
        self.off_command = off_command

    def click_on_button(self):
        self.on_command.execute()

    def click_off_button(self):
        self.off_command.execute()
