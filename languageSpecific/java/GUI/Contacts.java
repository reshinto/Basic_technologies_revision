import javax.swing.JFrame;

public class Contacts {
  /**
   * @param args the command line arguments
   */
  public static void main(String[] args) {
   JFrame frame = new ContactUI();
   frame.setTitle("GUI Test");
   frame.setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
   frame.setVisible(true);
  }
}
