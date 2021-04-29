package kacirekj.myweb.component;

import kacirekj.myweb.util.CmdUtil;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.boot.context.event.ApplicationStartingEvent;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

import javax.annotation.PreDestroy;
import java.io.IOException;

@Configuration
public class ApplicationInit {

    private final static String START_DB_SCRIPT = "./start_db.sh";
    private final static String STOP_DB_SCRIPT = "./stop_db.sh";

    public ApplicationInit() throws IOException, InterruptedException {
      init();
    }

    public void init() throws IOException, InterruptedException {
        CmdUtil.runBashScript(START_DB_SCRIPT);
    }

    @PreDestroy
    public void destroy() throws InterruptedException, IOException {
        CmdUtil.runBashScript(STOP_DB_SCRIPT);
    }

}
