package com.weichu.mdesigner.api.druid;

import java.sql.SQLException;

import javax.sql.DataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;

import com.alibaba.druid.pool.DruidDataSource;

/**
 * 只写配置文件 druid的密码解密不了啊，所有就定义了一个java配置类
 * @author tangxingchu
 *
 */
@Configuration
public class DruidConfig {

	@Autowired
	private Environment env;

	@Bean
	public DataSource dataSource() {
		DruidDataSource dataSource = new DruidDataSource();
		dataSource.setUrl(env.getProperty("spring.datasource.url"));
		dataSource.setUsername(env.getProperty("spring.datasource.username"));
		dataSource.setPassword(env.getProperty("spring.datasource.password"));
		dataSource.setDriverClassName(env.getProperty("spring.datasource.driver-class-name"));

		// configuration
		dataSource.setInitialSize(Integer.parseInt(env.getProperty("spring.datasource.initialSize")));
		dataSource.setMinIdle(Integer.parseInt(env.getProperty("spring.datasource.minIdle")));
		dataSource.setMaxActive(Integer.parseInt(env.getProperty("spring.datasource.maxActive")));
		dataSource.setMaxWait(Integer.parseInt(env.getProperty("spring.datasource.maxWait")));
		dataSource.setTimeBetweenEvictionRunsMillis(
				Integer.parseInt(env.getProperty("spring.datasource.timeBetweenEvictionRunsMillis")));
		dataSource.setMinEvictableIdleTimeMillis(
				Integer.parseInt(env.getProperty("spring.datasource.minEvictableIdleTimeMillis")));
		dataSource.setValidationQuery(env.getProperty("spring.datasource.validationQuery"));
		dataSource.setTestWhileIdle(true);
		dataSource.setTestOnBorrow(false);
		dataSource.setTestOnReturn(false);
		dataSource.setPoolPreparedStatements(true);
		dataSource.setMaxPoolPreparedStatementPerConnectionSize(Integer.parseInt(env.getProperty("spring.datasource.maxPoolPreparedStatementPerConnectionSize")));
		try {
			dataSource.setFilters(env.getProperty("spring.datasource.filters"));
		} catch (SQLException e) {
			System.err.println("druid configuration initialization filter: " + e);
		}
		dataSource.setConnectionProperties(env.getProperty("spring.datasource.connectionProperties"));
		return dataSource;
	}

}