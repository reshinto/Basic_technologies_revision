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
