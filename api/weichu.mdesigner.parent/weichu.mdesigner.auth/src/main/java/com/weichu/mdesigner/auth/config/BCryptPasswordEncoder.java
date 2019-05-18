package com.weichu.mdesigner.auth.config;

import org.springframework.stereotype.Component;


/**
 * 纯粹用spring初始化 spring的密码解密类
 * @author tangxingchu
 *
 */
@Component
public class BCryptPasswordEncoder extends org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder {

}
