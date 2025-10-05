/*
Open Closed Principle

- parts of the system or in the subsystems have to be open for extensions
  - so you should be able to extend the functionality of a filter
    - but should be closed for modification

- shouldn't have to go back into the filter to modify things
  - instead, to add functionality, should make new classes, implement ISpecifications, and feed those into something that has already been made and something that have already been shipped

- should not reship the functionality of the filter to customers, but can ship additional modules, which implements an ISpecification and make use of better filter

- the reason for doing this is because the code might already been shipped to the client
*/

using System.Collections.Generic;

// different colors of a product
public enum Color {
  Red, Green, Blue
}

public enum Size {
  Small, Medium, Large, Huge
}

public class Product {
  public string name;
  public Color color;
  public Size size;

  public Product(string name, Color color, Size size) {
    if (name == null)
      throw new System.ArgumentNullException(paramName: nameof(name));
    this.name = name;
    this.color = color;
    this.size = size;
  }
}

// filter products on website
// NOT a good filter, do not use this class
public class ProductFilter {
  public IEnumerable<Product> FilterBySize(IEnumerable<Product> products, Size size) {
    foreach (var p in products) {
      if (p.size == size)
        yield return p;
    }
  }

  // this needs to be added if not implemented, which is not good in this case
  // by adding more methods here, it breaks the open closed principle
  public IEnumerable<Product> FilterByColor(IEnumerable<Product> products, Color color) {
    foreach (var p in products) {
      if (p.color == color)
        yield return p;
    }
  }

  public static IEnumerable<Product> FilterBySizeAndColor(IEnumerable<Product> products, Size size, Color color)
    {
      foreach (var p in products)
        if (p.size == size && p.color == color)
          yield return p;
    } // state space explosion
}


// SOLUTION, use inheritance and interfaces
// implement by using the Specification pattern
public interface ISpecification<T> {
  bool IsSatisfied(T t);  // check if criteria is statified
}

// make filter interface dynamic
public interface IFilter<T> {
  IEnumerable<T> Filter(IEnumerable<T> items, ISpecification<T> spec);
}

public class ColorSpecification : ISpecification<Product>
{
  private Color color;

  public ColorSpecification(Color color)
  {
    this.color = color;
  }

  public bool IsSatisfied(Product p)
  {
    return p.color == color;
  }
}

public class SizeSpecification : ISpecification<Product> {
  private Size size;

  public SizeSpecification(Size size) {
    this.size = size;
  }

  public bool IsSatisfied(Product p) {
    return p.size == size;
  }
}

// combinator
public class AndSpecification<T> : ISpecification<T>
{
  private ISpecification<T> first, second;

  public AndSpecification(ISpecification<T> first, ISpecification<T> second)
  {
    this.first = first ?? throw new System.ArgumentNullException(paramName: nameof(first));
    this.second = second ?? throw new System.ArgumentNullException(paramName: nameof(second));
  }

  public bool IsSatisfied(T t)
  {
    return first.IsSatisfied(t) && second.IsSatisfied(t);
  }
}

public class BetterProductFilter : IFilter<Product>
  {
    public IEnumerable<Product> Filter(IEnumerable<Product> items, ISpecification<Product> spec)
    {
      foreach (var i in items)
        if (spec.IsSatisfied(i))
          yield return i;
    }
  }

public class Program {
  public static void Main() {
    Product apple = new Product("Apple", Color.Green, Size.Small);
    Product tree = new Product("Tree", Color.Green, Size.Large);
    Product house = new Product("House", Color.Blue, Size.Large);

    Product[] products = {apple, tree, house};

    // not a good filter
    ProductFilter pf = new ProductFilter();
    System.Console.WriteLine("Green products (old):");
    foreach (var p in pf.FilterByColor(products, Color.Green))
      System.Console.WriteLine($" - {p.name} is green");

    // better filter
    BetterProductFilter bf = new BetterProductFilter();
    System.Console.WriteLine("Green products (new):");
    foreach (var p in bf.Filter(products, new ColorSpecification(Color.Green)))
      System.Console.WriteLine($" - {p.name} is green");

    System.Console.WriteLine("Large products");
    foreach (var p in bf.Filter(products, new SizeSpecification(Size.Large)))
      System.Console.WriteLine($" - {p.name} is large");

    System.Console.WriteLine("Large blue items");
    foreach (var p in bf.Filter(products,
      new AndSpecification<Product>(new ColorSpecification(Color.Blue), new SizeSpecification(Size.Large)))
    )
    {
      System.Console.WriteLine($" - {p.name} is big and blue");
    }
  }
}
