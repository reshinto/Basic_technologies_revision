package com.java9modules.main.api;

import com.java9modules.greetings.api.Greeting;

public class App {
  public static void main(String[] args) {
    System.out.println(new Greeting().regular("World"));
  }
}
