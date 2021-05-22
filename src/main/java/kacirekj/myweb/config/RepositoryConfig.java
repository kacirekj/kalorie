package kacirekj.myweb.config;

import kacirekj.myweb.dao.BooksDao;
import kacirekj.myweb.repository.BookRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = BookRepository.class)
public class RepositoryConfig {

    @Autowired
    Environment env;

}
