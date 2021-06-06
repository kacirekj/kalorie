package kacirekj.myweb.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import kacirekj.myweb.component.ApplicationInit;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
public class DatasourceConfig {

    @Autowired
    Environment env;

    @Bean
    public DataSource dataSource(ApplicationInit applicationInit) throws IOException, InterruptedException {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName("org.postgresql.Driver");
        hikariConfig.setJdbcUrl(env.getProperty("datasource.url"));
        hikariConfig.setUsername(env.getProperty("datasource.user"));
        hikariConfig.setPassword(env.getProperty("datasource.password"));
        hikariConfig.setMaximumPoolSize(5);
        hikariConfig.setInitializationFailTimeout(20);

        HikariDataSource hikariDataSource = null;
        while(hikariDataSource == null) {
            try {
                hikariDataSource = new HikariDataSource(hikariConfig);
            } catch (Exception e) {
                System.out.println(e.getMessage());
                Thread.sleep(1000);
            }
        }

        return hikariDataSource;
    }

}
