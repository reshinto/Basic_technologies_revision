# How to compile and run files of different languages in the terminal

# Run C++ files
## compile .cpp & .h files together
### syntax: -Wall: check for errors
* -o: is an output file
* output file name: zzz
* .cpp and .h files
* old method of building
> g++ -Wall -o zzz xxx.cpp abc.h
* new method of building
> g++ -Wall -o zzz xxx.cpp
* run built file
> ./zzz

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
* xxx.java file name must be the same as public class name
* note: it is case sensitive
## compile xxx.java file with javac in terminal
> javac xxx.java
## java class will be created, run class file with java
> java xxx
## compile and run at the same time
javac xxx.java && java xxx
## using package
- e.g.: Main.java
```java
package com.example.java;

public class Main {
  public static void main(String[] args) {
    System.out.println("Hello from Java!");
  }
}
```
### at root directory of project
#### compile file
> javac ./com/example/java/Main.java
#### run file
> java com.example.java.Main

# Run Typescript files
## run typescript files without compiling with ts-node in terminal (no javascript created)
> ts-node xxx.ts
## compile xxx.ts file with tsc in terminal
> tsc ./xxx.ts
## javascript file will be created, run file with node
> node xxx.js

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

# Run Groovy
## Open GroovyShell to use the dynamic interpreter on the terminal
- in the command line type ```groovysh```
## Open GroovyConsole to open an external UI interface editor
- in the command line type ```groovyConsole```
## Execute groovy code on the command line
- ```groovy -e "println 'Hello, World!'"```
## Run groovy file
- ```groovy hello.groovy``` or ```groovy hello```

# Compile Latex file
> xelatex filename.tex
