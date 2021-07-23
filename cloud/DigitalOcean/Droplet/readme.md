# How to configure droplet after ssh
## Create new user
> adduser myusername
```
Adding user `myusername' ...
Adding new group `myusername' (1000) ...
Adding new user `myusername' (1000) with group `myusername' ...
Creating home directory `/home/myusername' ...
Copying files from `/etc/skel' ...
```
- type in user password
```
New password:
Retype new password:
```
- enter the required details
```
passwd: password updated successfully
Changing the user information for myusername
Enter the new value, or press ENTER for the default
	Full Name []:
	Room Number []:
	Work Phone []:
	Home Phone []:
	Other []:
Is the information correct? [Y/n]
```
- enable sudo
> usermod -aG sudo myusername
- check if your username exist and sudo enabled
> id myusername
```
uid=1000(myusername) gid=1000(myusername) groups=1000(myusername),27(sudo)
```
- login to user account
> sudo su - myusername
