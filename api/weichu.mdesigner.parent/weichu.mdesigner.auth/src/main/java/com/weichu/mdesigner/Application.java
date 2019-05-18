package com.weichu.mdesigner;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import com.xiaoleilu.hutool.crypto.SecureUtil;
import com.xiaoleilu.hutool.crypto.symmetric.SymmetricAlgorithm;
import com.xiaoleilu.hutool.crypto.symmetric.SymmetricCrypto;

/**
 * 认证服务入口
 * 
 * @author Administrator
 *
 */
//@SpringBootApplication
public class Application {

	
	private static final Logger logger = LoggerFactory.getLogger(Application.class);
	
	public static void main(String[] args) {
		String password = "1234txc";
		byte[] key = SecureUtil.generateKey(SymmetricAlgorithm.AES.getValue()).getEncoded();
		SymmetricCrypto aes = new SymmetricCrypto(SymmetricAlgorithm.AES, key);
		byte[] encrypt = aes.encrypt(password);
//		
		logger.debug(encrypt.toString());
		//1606470c-7534-4ad1-865e-81f86ebadf6a
//		SpringApplication.run(Application.class, args);
	}
	
	@Bean
	public BCryptPasswordEncoder getBCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}

}
