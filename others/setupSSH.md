# SSH Guide

## Check for existing SSH keys

### MAC OS

- open terminal and type ```ls ~/.ssh
- check if the directory has one of the following public SSH keys

```
id_rsa.pub
id_ecdsa.pub
id_ed25519.pub
```

- if none of it exist, generation of a new SSH key would be required

## Generate a new SSH key

- open terminal with the following command
  > ssh-keygen -t ed25519 -C "your_email@example.com"
  - If you are using a legacy system that doesn't support the Ed25519 algorithm, use:
    > ssh-keygen -t rsa -b 4096 -C "your_email@example.com"
- you will get the following prompt message, just press enter to save at default file location

```
Generating public/private ed25519 key pair.
Enter file in which to save the key (/Users/yourusername/.ssh/id_ed25519):
```

- you will get the next prompt, key is a password for easy access

```
Enter passphrase (empty for no passphrase):
Enter same passphrase again:
```

- when completed, you will get something like the following

```
Your identification has been saved in /Users/yourusername/.ssh/id_ed25519.
Your public key has been saved in /Users/yourusername/.ssh/id_ed25519.pub.
The key fingerprint is:
SHA256:kgkYKGY+hjkbfcHKBVBUYVYVWbhlbfVYK your_email@example.com
The key's randomart image is:
+--[ED25519 256]--+
|    o.+.= .      |
|   . - o + .     |
|    . . * .      |
|   . + @ +       |
|  . O - S .      |
| o.ooo   +       |
|  +Boo+   o      |
|  ==E0 + .       |
| .oo+.. .        |
+----[SHA256]-----+
```

## Adding SSH key to the ssh-agent

- start the ssh-agent in the background
  > eval "$(ssh-agent -s)"
- you will get something like the following
  `Agent pid 59566`
- modify the `~/.ssh/config` file to automatically load keys into the ssh-agent and store passphrases in the keychain
  - create file if it does not exist
  - file contents should have something like the following
  ```
  Host *
    AddKeysToAgent yes
    UseKeychain yes
    IdentityFile ~/.ssh/id_ed25519
  ```
  - `UseKeyChain` can be omitted if passphrase was not used
  - if an error `/Users/USER/.ssh/config: line 16: Bad configuration option: usekeychain` occur
    - add an additional line in the config file under Host `IgnoreUnknown UseKeychain`
- add SSH private key to the ssh-agent and store passphrase in the keychain, omit `-K` if not using passphrase
  > ssh-add -K ~/.ssh/id_ed25519
  - you will be prompty with
  ```
  Enter passphrase for /Users/yourusername/.ssh/id_ed25519:
  ```
  ```
  Identity added: /Users/yourusername/.ssh/id_ed25519 (your_email@example.com)
  ```

## Adding a new SSH key to your server that you want to SSH to

- copy the SSH public key
  > pbcopy < ~/.ssh/id_ed25519.pub
- add and paste this value into the SSH key field in your server

## Add server identity to your pc's known host

- you will get a prompt similar to this

```
The authenticity of host 'someonlineserver.com (11.12.123.123)' can't be established.
RSA key fingerprint is SHA256:kjlnfe7o8GBLU7o42ulgob24ofbuy.
Are you sure you want to continue connecting (yes/no/[fingerprint])?
```

- if type `yes` it would be added to your `~/.ssh/known_hosts` file

```
Warning: Permanently added 'github.com,11.12.123.123' (RSA) to the list of known hosts.
```
