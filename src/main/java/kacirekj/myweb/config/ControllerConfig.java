package kacirekj.myweb.config;

import kacirekj.myweb.controller.IndexController;
import kacirekj.myweb.dao.BooksDao;
import kacirekj.myweb.repository.BookRepository;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ControllerConfig {
    
    @Bean
    public IndexController webConsoleController(BookRepository bookRepository) {
        return new IndexController(bookRepository);
    }
}
