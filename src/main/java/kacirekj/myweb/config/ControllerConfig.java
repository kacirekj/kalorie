package kacirekj.myweb.config;

import kacirekj.myweb.controller.IndexController;
import kacirekj.myweb.repository.FoodRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {
    
    @Bean
    public IndexController webConsoleController(FoodRepository foodRepository) {
        return new IndexController(foodRepository);
    }
}
