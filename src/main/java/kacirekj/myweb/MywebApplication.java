package kacirekj.myweb;

import kacirekj.myweb.config.ComponentConfig;
import kacirekj.myweb.config.DatasourceConfig;
import kacirekj.myweb.util.CmdUtil;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.properties.EnableConfigurationProperties;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.io.IOException;

@SpringBootApplication(scanBasePackageClasses = {ComponentConfig.class})
@EnableConfigurationProperties
@EnableScheduling
public class MywebApplication {


    public static void main(String[] args) throws IOException, InterruptedException {
        SpringApplication.run(MywebApplication.class, args);
    }


}
