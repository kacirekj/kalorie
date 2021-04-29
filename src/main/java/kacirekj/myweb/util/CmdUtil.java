package kacirekj.myweb.util;

import java.io.BufferedInputStream;
import java.io.IOException;

public class CmdUtil {
    public static void runBashScript(String scriptName) throws IOException, InterruptedException {
        System.out.println("Run script   : " + scriptName);
        int exitValue;
        Process process;
        ProcessBuilder processBuilder = new ProcessBuilder(scriptName);
        processBuilder.inheritIO();
        process = processBuilder.start();
        exitValue = process.waitFor();

        if (exitValue != 0) {
            throw new RuntimeException("Execution of the script failed!");
        }
    }
}
