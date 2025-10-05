/*
Liskov Subsitution Principle

- should be able to subsitute a base type for a subtype
*/

public class Rectangle {
  //public int Width { get; set; }
  //public int Height { get; set; }
  public virtual int Width { get; set; }
  public virtual int Height { get; set; }

  public Rectangle() {}

  public Rectangle(int width, int height) {
    Width = width;
    Height = height;
  }

  public override string ToString() {
    return $"{nameof(Width)}: {Width}, {nameof(Height)}: {Height}";
  }
}

public class Square : Rectangle {
  //public new int Width {
  //  set { base.Width = base.Height = value; }
  //}

  //public new int Height {
  //  set { base.Width = base.Height = value; }
  //}
  public override int Width {
    set { base.Width = base.Height = value; }
  }

  public override int Height {
    set { base.Width = base.Height = value; }
  }
}

public class Program {
  public static int Area(Rectangle r) => r.Width * r.Height;

  public static void Main() {
    Rectangle rc = new Rectangle();
    System.Console.WriteLine($"{rc} has area {Area(rc)}");

    // should be able to substitute a base type for a subtype
    //Square sq = new Square();
    Rectangle sq = new Square();
    sq.Width = 4;
    System.Console.WriteLine($"{sq} has area {Area(sq)}");
  }
}
