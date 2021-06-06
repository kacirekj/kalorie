package kacirekj.myweb.config;

import kacirekj.myweb.component.ApplicationInit;
import kacirekj.myweb.component.DataInit;
import kacirekj.myweb.domain.Food;
import kacirekj.myweb.repository.FoodRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.io.IOException;

@Configuration
public class ComponentConfig {

    @Bean
    public ApplicationInit applicationInit() throws IOException, InterruptedException {
        ApplicationInit applicationInit = new ApplicationInit();
        applicationInit.init();
        return applicationInit;
    }

    @Bean
    public DataInit dataInit(FoodRepository foodRepository) throws IOException, InterruptedException {
        return new DataInit(foodRepository);
    }
}
