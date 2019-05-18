package com.weichu.mdesigner;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.web.HttpMessageConverters;
import org.springframework.boot.web.servlet.ServletComponentScan;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
//import org.springframework.context.support.ReloadableResourceBundleMessageSource;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import com.alibaba.fastjson.serializer.SerializerFeature;
import com.alibaba.fastjson.support.config.FastJsonConfig;
import com.alibaba.fastjson.support.spring.FastJsonHttpMessageConverter;

@SpringBootApplication
@ServletComponentScan //扫描druid的servlet、filter配置
@MapperScan("com.weichu.mdesigner.**.mapper") // 也可以在mapper类上加 @Mapper 注解
@EnableTransactionManagement	//启用事务
@EnableCaching	//启用缓存
@EnableDiscoveryClient
public class Application {

	public static void main(String[] args) {
		SpringApplication.run(Application.class, args);
	}
	
	/**
	 * 初始化spring security 国际化配置
	 * @return
	 */
//	@Bean
//	MessageSource getMessageSource() {
//		ReloadableResourceBundleMessageSource parentMessageSource = new ReloadableResourceBundleMessageSource();
//		parentMessageSource.setDefaultEncoding("UTF-8");
//
//		parentMessageSource.setBasename("classpath:org/springframework/security/messages");
//
//		return parentMessageSource;
//	}
	
	/**
	 * api接口中传的json直接转为模型对象
	 * @return
	 */
	@Bean
	public HttpMessageConverters fastJsonHttpMessageConverters() {
		FastJsonHttpMessageConverter fastConverter = new FastJsonHttpMessageConverter();
		FastJsonConfig fastJsonConfig = new FastJsonConfig();
		fastJsonConfig.setSerializerFeatures(SerializerFeature.PrettyFormat);
		// 中文乱码解决方案
        List<MediaType> mediaTypes = new ArrayList<MediaType>();
        mediaTypes.add(MediaType.APPLICATION_JSON_UTF8);//设定json格式且编码为UTF-8
        fastConverter.setSupportedMediaTypes(mediaTypes);
		fastConverter.setFastJsonConfig(fastJsonConfig);
		HttpMessageConverter<?> converter = fastConverter;
		return new HttpMessageConverters(converter);
	}

}
