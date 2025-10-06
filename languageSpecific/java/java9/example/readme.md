# Java 9 example

- build.sh

  ```sh
  #!/bin/bash
  set -v

  javac -d ./mods/ --module-source-path src $(find src -name "*.java")
  ```

- linking.sh

  ```sh
  #!/usr/bin/env bash
  printf 'Using JAVA_HOME=%s\n' $JAVA_HOME
  jlink --module-path mods/:$JAVA_HOME/jmods --add-modules com.java9modules.main --output com.java9modules.main-image
  ```

- run-linked.sh

  ```sh
  #!/usr/bin/env bash
  ./com.java9modules.main-image/bin/java -m com.java9modules.main/com.java9modules.main.api.App
  ```

- run.sh

  ```sh
  #!/bin/bash
  set -v

  java --module-path mods/ -m com.java9modules.main/com.java9modules.main.api.App
  ```

## src/com.java9modules.main

- module-info.java

  ```java
  module com.java9modules.main {
    requires com.java9modules.greetings;
  }
  ```

### src/com.java9modules.main/com/java9modules/main/api

- App.java

  ```java
  package com.java9modules.main.api;

  import com.java9modules.greetings.api.Greeting;

  public class App {
    public static void main(String[] args) {
      System.out.println(new Greeting().regular("World"));
    }
  }
  ```

## src/com.java9modules.greetings

- module-info.java

  ```java
  module com.java9modules.greetings {
    exports com.java9modules.greetings.api;
  }
  ```

### src/com.java9modules.greetings/com/java9modules/greetings/api

- Greeting.java

  ```java
  package com.java9modules.greetings.api;

  public class Greeting {
    public String regular(String party) {
      return "Hello, " + party + "!";
    }
  }
  ```
