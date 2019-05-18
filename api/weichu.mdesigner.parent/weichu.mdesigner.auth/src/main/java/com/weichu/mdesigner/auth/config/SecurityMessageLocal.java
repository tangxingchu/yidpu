package com.weichu.mdesigner.auth.config;

import java.util.Locale;

import org.springframework.context.MessageSource;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ReloadableResourceBundleMessageSource;

/**
 * springboot security异常信息本地化
 * @author Administrator
 *
 */
@Configuration
public class SecurityMessageLocal {
	
	@Bean
    public MessageSource messageSource() {
        Locale.setDefault(Locale.CHINA);
        ReloadableResourceBundleMessageSource messageSource = new ReloadableResourceBundleMessageSource();
        messageSource.addBasenames("classpath:org/springframework/security/messages_zh_CN");
//        messageSource.addBasenames("classpath:security/messages_zh_CN");
        
        return messageSource;
    }

	
}
