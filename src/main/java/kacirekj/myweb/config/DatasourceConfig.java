package kacirekj.myweb.config;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;
import kacirekj.myweb.component.ApplicationInit;
import kacirekj.myweb.util.CmdUtil;
import org.springframework.boot.jdbc.DataSourceBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import javax.sql.DataSource;
import java.io.IOException;

@Configuration
public class DatasourceConfig {

    @Bean
    public DataSource dataSource(ApplicationInit applicationInit) throws IOException, InterruptedException {
        HikariConfig hikariConfig = new HikariConfig();
        hikariConfig.setDriverClassName("org.postgresql.Driver");
        hikariConfig.setJdbcUrl(
                "jdbc:postgresql://localhost:50000/postgres"
        );
        hikariConfig.setUsername("postgres");
        hikariConfig.setPassword("myPasswd123456789");
        hikariConfig.setMaximumPoolSize(5);
        hikariConfig.setInitializationFailTimeout(10);

        HikariDataSource hikariDataSource = new HikariDataSource(hikariConfig);

        return hikariDataSource;
    }

}
