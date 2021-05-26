package kacirekj.myweb.component;

import kacirekj.myweb.util.CmdUtil;
import org.springframework.context.annotation.Configuration;

import javax.annotation.PreDestroy;
import java.io.IOException;

@Configuration
public class ApplicationInit {

    private final static String START_DB_SCRIPT = "./run_db_start.sh";
    private final static String STOP_DB_SCRIPT = "./run_db_stop.sh";

    public void init() throws IOException, InterruptedException {
        CmdUtil.runBashScript(START_DB_SCRIPT);
    }

    @PreDestroy
    public void destroy() throws InterruptedException, IOException {
        CmdUtil.runBashScript(STOP_DB_SCRIPT);
    }
}
