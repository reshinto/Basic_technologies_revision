# C# Example

```csharp
/*
Interface Segregation Principle

- Interfaces should be segregated so that nobody who implements the interface will need to implement functions which they don't actually need.
*/

public class Document {
}

// not a good design as it forces different printer types to implement all of these features
public interface IMachine {
  void Print(Document d);
  void Scan(Document d);
  void Fax(Document d);
}

// this is ok because this product uses all the features
public class MultiFunctionPrinter : IMachine {
  public void Print(Document d) {}

  public void Scan(Document d) {}

  public void Fax(Document d) {}
}

// this is NOT ok because the product cannot scan and fax
public class OldFashionPrinter : IMachine {
  public void Print(Document d) {}

  // should not have this, even if throw an exception
  public void Scan(Document d) {
    throw new System.NotImplementedException();
  }

  // should not have this, even if throw an exception
  public void Fax(Document d) {
    throw new System.NotImplementedException();
  }
}


// better to design interfaces separately in this case
public interface IPrinter {
  void Print(Document d);
}

public interface IScanner {
  void Scan(Document d);
}

// use multiple interface inheritance to implement multiple features
public class Photocopier : IPrinter, IScanner {
  public void Print(Document d) {}

  public void Scan(Document d) {}
}

// or can make an interface inherit multiple interfaces
public interface IMultiFunctionDevice : IScanner, IPrinter {}

public class MultiFunctionMachine : IMultiFunctionDevice {
  /* method 1
  public void Scan(Document d) {}

  public void Print(Document d) {}
  */

  // method 2
  private IPrinter _printer;
  private IScanner _scanner;

  public MultiFunctionMachine(IPrinter printer, IScanner scanner) {
    if (printer == null)
      throw new System.ArgumentNullException(paramName: nameof(printer));
    if (scanner == null)
      throw new System.ArgumentNullException(paramName: nameof(scanner));
    this._printer = printer;
    this._scanner = scanner;
  }

  // Print will be delegated to _printer
  public void Print(Document d) {
    _printer.Print(d);
  }  // decorator pattern

  // Scan will be delegated to _scanner
  public void Scan(Document d) {
    _scanner.Scan(d);
  }  // decorator pattern
}

public class Program {
  public static void Main() {}
}
```
