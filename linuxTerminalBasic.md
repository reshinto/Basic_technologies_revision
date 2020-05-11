# Linux terminal commands
## linux is case-sensitive
### Current directory
* ```.```
### Previous directory
* ```..```
### Home directory
* ```~```
### Root directory
* ```/```
### Check present working directory
* ```pwd```
### Show list of folders and files
* ```ls```
* ```ls -a``` also display hidden folders and files
### Change directory
* ```cd ..``` go back 1 directory
* ```cd <folderName>``` change to folderName directory
### Make directory
* ```mkdir <newFolderName>```
* ```mkdir <newFolderName> <newFolderName2> <newFolderName3>``` create multiple directories
* ```mkdir -p <newFolderName/newFolderName2/newFolderName3>``` create nested directories
### Create new file
* ```touch <newFileName>```
### Remove directory (can only remove empty directory)
* ```rmdir <folderName>```
### Remove file and/or folder
* ```rm <filename>``` only for files
* ```rm -r <folderName>``` remove current and nested folders
* ```rm -rf <folderName>``` remove current and nested folders and files
### Copy file and/or folder
* ```cp <filename>``` only for 1 file
* ```cp -r <folderName>``` for folders, nested folders and files
### Move or rename folder or file
* ```mv <oldFilename> <newFilename>``` or ```mv <oldFilePath> <newFilePath>```
### Print file contents
* ```cat <filename>```
### Search through text in a file
* ```grep "<text>" <filename>```
### Append the output of a command to a file (file will be created if it does not exist)
* ```<cmd> >> <filename>```
### Overwrite output of a command to a file (Output redirection, file will be created if it does not exist)
* ```<cmd> > <filename>```
### Direct output of a command to another command
* ```<cmd1> | <cmd2>``` cmd2 will use cmd1 output to execute
### Input redirection
* ```<cmd> < <file>``` file will be fed into the command and then runned
  * ex: ```<sendingEmailCommand> < <fileToBeAttached>```
### Sort text in a file
* ```sort <file>``` sort by ascending order
* ```sort -r <file>``` sort by descending order
### Print unique text in a file (file contents must be sorted first)
* ```uniq <file>```
### Temporarily replace or substitute string in a file and prints the file contents
* ```sed "s/<oldString>/<newString>/" <file>```
