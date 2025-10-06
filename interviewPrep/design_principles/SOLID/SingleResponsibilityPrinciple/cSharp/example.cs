/*
Single Responsibility Principle

- A good advice on how to build systems
- it specifies that any particular class should have just a single reason to change
- the whole point of this principle is that a typical class is responsible for 1 thing and has 1 reason to change
*/
using System;
using System.Collections.Generic;
using System.IO;
using System.Diagnostics;

// this example violates the Single Responsibility Principle as the class has too many responsibilities
public class Journal {
  private readonly List<string> entries = new List<string>();
  private static int count = 0;

  public int AddEntry(string text) {
    entries.Add($"{++count}: {text}");
    return count;  // memento pattern
  }

  public void RemoveEntry(int index) {
    entries.RemoveAt(index);  // not a stable way of removing entries as once removed, indices of other elements become invalid
  }

  public override string ToString() {
    return string.Join(Environment.NewLine, entries);
  }

  /*
  // breaks single responsibility principle
  public void Save(string filename) {
    File.WriteAllText(filename, ToString());
  }

  public static Journal Load(string filename) {}

  public void Load(Uri uri) {}
  */
}

// solution is to separate the persistence to a different class
public class Persistence {
  public void SaveToFile(Journal j, string filename, bool overwrite = false) {
    if (overwrite || !File.Exists(filename))
      File.WriteAllText(filename, j.ToString());
  }
}

public class Program {
  public static void Main() {
    var j = new Journal();
    j.AddEntry("I cried today!");
    j.AddEntry("I ate a bug2!");
    Console.WriteLine(j);

    var p = new Persistence();
    var filename = @"./journal.txt";  // mac file format
    p.SaveToFile(j, filename, true);  // create and save file, overwrite if exist
    Process.Start(filename);  // open file
  }
}
