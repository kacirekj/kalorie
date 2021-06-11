package kacirekj.myweb.config;

import kacirekj.myweb.controller.IndexController;
import kacirekj.myweb.repository.FoodEntryRepository;
import kacirekj.myweb.repository.FoodRepository;
import kacirekj.myweb.repository.FoodRepositoryCustom;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {
    
    @Bean
    public IndexController webConsoleController(FoodRepository foodRepository, FoodRepositoryCustom foodRepositoryCustom, FoodEntryRepository foodEntryRepository) {
        return new IndexController(foodRepository, foodRepositoryCustom, foodEntryRepository);
    }
}
