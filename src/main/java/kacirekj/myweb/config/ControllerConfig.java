package kacirekj.myweb.config;

import kacirekj.myweb.controller.IndexController;
import kacirekj.myweb.repository.MarkerRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {
    
    @Bean
    public IndexController webConsoleController(MarkerRepository markerRepository) {
        return new IndexController(markerRepository);
    }
}
