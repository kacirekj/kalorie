package kacirekj.myweb.config;

import kacirekj.myweb.controller.WebConsoleController;
import kacirekj.myweb.dao.BooksRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {
    
    @Bean
    public WebConsoleController webConsoleController(BooksRepository booksRepository) {
        return new WebConsoleController(booksRepository);
    }
}
