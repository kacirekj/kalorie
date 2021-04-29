package kacirekj.myweb.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import kacirekj.myweb.component.ApplicationInit;
import kacirekj.myweb.dao.BooksRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
@EnableJpaRepositories(basePackageClasses = BooksRepository.class)
public class RepositoryConfig {

    @Autowired
    Environment env;

    @Bean
    public BooksRepository booksRepository() {
        return new BooksRepository();
    }

}
