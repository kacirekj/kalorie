package kacirekj.myweb.config;

import kacirekj.myweb.repository.MarkerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@Configuration
@EnableJpaRepositories(basePackageClasses = MarkerRepository.class)
public class RepositoryConfig {

    @Autowired
    Environment env;

}
