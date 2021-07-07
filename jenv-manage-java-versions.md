# Java Version Manager - jEnv
## Install
> brew install jenv
## Configuration
- Add following configs into ```~/.bash_profile``` or ```~/.bashrc``` or ```~/.zshrc```
```
export PATH="$HOME/.jenv/bin:$PATH"
eval "$(jenv init -)"
```
- restart shell
  - if using zsh ```source ~/.zshrc```
## Verify installation
- ```jenv doctor```
