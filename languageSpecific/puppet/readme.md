# Puppet
## Installation
### Ubuntu
> apt-get -y install puppet

## filename example
- `myfilename.pp`
## Hello world and save to another file
```pp
file { "/var/save/puppet_hello/hellopuppet.txt":
  content => "Hello Puppet"
}
```
## Run file
> puppet apply myfilename.pp
