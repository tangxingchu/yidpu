package com.weichu.mdesigner.api.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.client.OkHttp3ClientHttpRequestFactory;
import org.springframework.web.client.RestTemplate;

/**
 * 使用okhttp3 做为restTemplate
 * @author Administrator
 *
 */
@Configuration
public class RestTemplateConfig {
	
	@Bean
    public RestTemplate OKHttp3RestTemplate(){
        RestTemplate restTemplate = new RestTemplate(new OkHttp3ClientHttpRequestFactory());
        return restTemplate;
    }
	
}
