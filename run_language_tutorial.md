# How to compile and run files of different languages in the terminal

# Run C++ files
## compile .cpp & .h files together
### syntax: -Wall: check for errors
* -o: is an output file
* output file name: zzz
* .cpp and .h files
> g++ -Wall -o zzz xxx.cpp abc.h

# Run C files
## same as above but add -x c when compiling
> g++ -x c -Wall -o zzz xxx.c abc.h
## OR
> clang -o zzz xxx.c abc.h
## OR
> make xxx
### If .h header file is in another directory need to use -I
> g++ -I /fullpath/myproject xxx.cpp /fullpath/myproject/header/yyy.h
### use ./ to run file
> ./zzz
### if no output file name is defined earlier
* ouput file will automatically create an a.out file
* to run
> ./a.out

# Run C# files
* Need to have Mono platform to compile and run code
  * if using MacOS
    > brew install mono
## compile file
> mcs xxx.cs
  * xxx.exe will be created
## run file
> mono xxx.exe

# Run Java files
### .java file name must be the same as public class name
* note: it is case sensitive
## compile .java file with javac in terminal
> javac xxx.java
## java class will be created, run class file with java
> java xxx
## compile and run at the same time
javac xxx.java && java xxx

# Run Javascript files
## run with nodeJS
> node filename.js
### open nodejs shell
> node

# Run Python files
## run with python 2
> python2 filename.py
### open python 2 shell
> python2
## run with python 3
> python3 filename.py
### open python 3 shell
> python3

# Run Ruby files
> ruby filename.rb
## open ruby shell
> irb

# Run assembly files
* nasm compiler must be installed
  * if using MacOS
    > brew install nasm
## compile & run x86 32 bit files
### compile
  > nasm -f macho xxx32.asm && ld -macosx_version_min 10.7.0 -o xxx32 xxx32.o
### run
  > ./xxx32
## compile & run x86_64 64 bit files
### compile
  > nasm -f macho64 xxx64.asm && ld -macosx_version_min 10.7.0 -lSystem -o xxx64 xxx64.o
### run
  > ./xxx64
