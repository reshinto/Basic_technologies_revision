# Springboot guide
## Install springboot
1. method 1: ```brew install springboot```
2. method 2: ```curl -s "https://get.sdkman.io" | bash```
    - ```source "$HOME/.sdkman/bin/sdkman-init.sh"```
    - Install springboot
      - ```sdk install springboot```
## Create new project
- create a new web dependency project using maven
```spring init --dependencies web --build maven --groupId groupName --artifactId projectName --name projectName saveAsThisFolderName```
```spring init -d web --build maven -g groupName -a projectName -n projectName saveAsThisFolderName```
