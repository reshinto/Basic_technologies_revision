# Demos

## Threads wasting CPU cycles demo

```java
/**
 * Threads that waste CPU cycles
 * uses java 11
 * run command: javac ThreadProcessDemo.java && java ThreadProcessDemo
 */

// a simple thread that wastes CPU cycles forever
class CPUWaster extends Thread {
    public void run() {
        while (true) {}
    }
}

public class ThreadProcessDemo {
    public static void main(String args[]) throws InterruptedException {

        // display current information about this process
        Runtime rt = Runtime.getRuntime();
        long usedKB = (rt.totalMemory() - rt.freeMemory()) / 1024 ;
        System.out.format("  Process ID: %d\n", ProcessHandle.current().pid());
        System.out.format("Thread Count: %d\n", Thread.activeCount());
        System.out.format("Memory Usage: %d KB\n", usedKB);

        // start 6 new threads
        System.out.println("\nStarting 6 CPUWaster threads...\n");
        for (int i=0; i<6; i++)
            new CPUWaster().start();

        // display current information about this process
        usedKB = (rt.totalMemory() - rt.freeMemory()) / 1024 ;
        System.out.format("  Process ID: %d\n", ProcessHandle.current().pid());
        System.out.format("Thread Count: %d\n", Thread.activeCount());
        System.out.format("Memory Usage: %d KB\n", usedKB);
    }
}
```

### Concurrency execution scheduling

```java
/**
 * Two threads chopping vegetables
 * uses java 11
 * run command: javac ExecutionSchedulingDemo.java && java ExecutionSchedulingDemo
 */

class VegetableChopper extends Thread{

    public int vegetable_count = 0;
    public static boolean chopping = true;

    public VegetableChopper(String name) {
        this.setName(name);
    }

    public void run() {
        while(chopping) {
            System.out.println(this.getName() + " chopped a vegetable!");
            vegetable_count++;
        }
    }
}

public class ExecutionSchedulingDemo {
    public static void main(String args[]) throws InterruptedException {
        VegetableChopper barron = new VegetableChopper("Barron");
        VegetableChopper olivia = new VegetableChopper("Olivia");

        barron.start();                     // Barron start chopping
        olivia.start();                     // Olivia start chopping
        Thread.sleep(1000);                 // continue chopping for 1 second
        VegetableChopper.chopping = false;  // stop chopping

        barron.join();
        olivia.join();
        System.out.format("Barron chopped %d vegetables.\n", barron.vegetable_count);
        System.out.format("Olivia chopped %d vegetables.\n", olivia.vegetable_count);
    }
}
```
