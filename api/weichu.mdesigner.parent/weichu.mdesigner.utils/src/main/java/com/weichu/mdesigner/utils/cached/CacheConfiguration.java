package com.weichu.mdesigner.utils.cached;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cache.CacheManager;
import org.springframework.cache.ehcache.EhCacheCacheManager;
import org.springframework.cache.ehcache.EhCacheManagerFactoryBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

/**
 * 配置启用什么缓存
 * 
 * @author Administrator
 *
 */
//@Configuration
public class CacheConfiguration {

	private Logger loger = LoggerFactory.getLogger(CacheConfiguration.class);

	@Bean
	public CacheManager ehCacheCacheManager(EhCacheManagerFactoryBean bean) {
		loger.debug("EhCacheCacheManager 初始化完成.");
		EhCacheCacheManager ehCacheCacheManager = new EhCacheCacheManager(bean.getObject());
		return ehCacheCacheManager;
	}

	@Bean
	public EhCacheManagerFactoryBean ehCacheManagerFactoryBean() {
		EhCacheManagerFactoryBean cacheManagerFactoryBean = new EhCacheManagerFactoryBean();
		cacheManagerFactoryBean.setConfigLocation(new ClassPathResource("config/ehcache.xml"));
		cacheManagerFactoryBean.setShared(true);
		return cacheManagerFactoryBean;
	}

}
