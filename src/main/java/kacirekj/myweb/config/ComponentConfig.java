package kacirekj.myweb.config;

import kacirekj.myweb.component.ApplicationInit;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class ComponentConfig {

    @Bean
    public ApplicationInit applicationInit() throws IOException, InterruptedException {
        return new ApplicationInit();
    }
}
