# C# Example

```csharp
/*
Dependency Inversion Principle

- high level parts of the system should not depend on low level parts of the system directly
- high level parts of the system should depend on some kind of abstraction
*/

using System.Collections.Generic;
using System.Linq;

public enum Relationship {
  Parent,
  Child,
  Sibling
}

public class Person {
  public string Name;
  public System.DateTime DateOfBirth;
}

// low level
/*
public class Relationships {
  // tuples
  // this is a bad example as Relationships cannot change how it stores data, and the data structure is exposed to the high level module
  private List<(Person, Relationship, Person)> _relations = new List<(Person, Relationship, Person)> ();

  public void AddParentAndChild(Person parent, Person child) {
    _relations.Add((parent, Relationship.Parent, child));
    _relations.Add((child, Relationship.Child, parent));
  }

  // this is bad and should be removed
  public List<(Person, Relationship, Person)> Relations => _relations;
}
*/


// Solution
// create an interface
public interface IRelationshipBrowser {
  IEnumerable<Person> FindAllChildrenOf(string name);
}

// low level
public class Relationships : IRelationshipBrowser {
  // tuples
  // relationships can change the underlying data structure because it's never exposed to the high level modules which are actually consuming it
  private List<(Person, Relationship, Person)> _relations = new List<(Person, Relationship, Person)> ();

  public void AddParentAndChild(Person parent, Person child) {
    _relations.Add((parent, Relationship.Parent, child));
    _relations.Add((child, Relationship.Child, parent));
  }

  public IEnumerable<Person> FindAllChildrenOf(string name) {
    return _relations.Where(
          x => x.Item1.Name == "John" &&
          x.Item2 == Relationship.Parent
          ).Select(r => r.Item3);
  }
}

// High level
// should not depend on low level, but rather an abstraction, in this case Interface
public class Research {
  // do not do this as it depends on the low level module
  /*
  public Research(Relationships relationships) {
    var relations = relationships.Relations;
    foreach (var r in relations.Where(
          x => x.Item1.Name == "John" &&
          x.Item2 == Relationship.Parent
          )) {
      System.Console.WriteLine($"John has a child called {r.Item3.Name}");
    }
  }
  */

  // do this as it depends on the abstraction, interface
  public Research(IRelationshipBrowser browser) {
    foreach (var p in browser.FindAllChildrenOf("John"))
      System.Console.WriteLine($"John has a child called {p.Name}");
  }

  public static void Main() {
    Person parent = new Person {Name = "John"};
    Person child1 = new Person {Name = "Chris"};
    Person child2 = new Person {Name = "Mary"};

    Relationships relationships = new Relationships();
    relationships.AddParentAndChild(parent, child1);
    relationships.AddParentAndChild(parent, child2);

    new Research(relationships);
  }
}
```
