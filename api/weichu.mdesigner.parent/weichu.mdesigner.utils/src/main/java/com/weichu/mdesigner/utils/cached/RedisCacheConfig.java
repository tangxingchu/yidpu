package com.weichu.mdesigner.utils.cached;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.redis.cache.RedisCacheManager;
import org.springframework.data.redis.connection.jedis.JedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.data.redis.serializer.Jackson2JsonRedisSerializer;

import com.fasterxml.jackson.annotation.PropertyAccessor;
import com.fasterxml.jackson.annotation.JsonAutoDetect.Visibility;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.weichu.mdesigner.utils.constants.Constants;

/**
 * redisCache
 * @author Administrator
 *
 */
@Configuration
public class RedisCacheConfig extends CachingConfigurerSupport {

	private Logger loger = LoggerFactory.getLogger(RedisCacheConfig.class);

	@Autowired
	private JedisConnectionFactory jedisConnectionFactory;

	@Bean
	public RedisTemplate<String, String> redisTemplate() {
		StringRedisTemplate redisTemplate = new StringRedisTemplate(jedisConnectionFactory);

		Jackson2JsonRedisSerializer<Object> jackson2JsonRedisSerializer = new Jackson2JsonRedisSerializer<>(
				Object.class);
		ObjectMapper om = new ObjectMapper();
		om.setVisibility(PropertyAccessor.ALL, Visibility.ANY);
		om.enableDefaultTyping(ObjectMapper.DefaultTyping.NON_FINAL);
		jackson2JsonRedisSerializer.setObjectMapper(om);

		redisTemplate.setValueSerializer(jackson2JsonRedisSerializer);
		redisTemplate.afterPropertiesSet();
		return redisTemplate;
	}

	@Bean
	public CacheManager ehCacheCacheManager(RedisTemplate<String, String> redisTemplate) {
		loger.debug("RedisCacheManager 初始化完成.");
		RedisCacheManager redisCacheManager = new RedisCacheManager(redisTemplate);
//		redisCacheManager.setDefaultExpiration(86400L);//默认24小时
		Map<String, Long> expires = new HashMap<>();
		expires.put(Constants.CODE_CACHE_NAME, 5L * 60);//5分钟 验证码缓存
		expires.put(Constants.FUNCTION_CACHE_NAME, 12L * 60 * 60);//12小时 功能菜单缓存
		expires.put(Constants.USER_FUNCTION, 12L * 60 * 60);//12小时 用户购买功能菜单缓存  缓存12个小时
		expires.put(Constants.USERTOKEN_CACHE_NAME, 5L * 60 * 60 - 120);//获取最后一次登录token缓存 缓存5小时58分钟
		expires.put(Constants.ANALYSIS_CACHE_NAME, 6L * 60 * 60);//分析页数据 缓存6个小时
		expires.put(Constants.WX_MP_TOKEN, 2L * 60 * 60);//2个小时
		redisCacheManager.setExpires(expires);
		return redisCacheManager;
	}

//	@Bean
//	@Override
//	public KeyGenerator keyGenerator() {
//		return (target, method, objects) -> {
//			StringBuilder sb = new StringBuilder();
//			sb.append(target.getClass().getName());
//			sb.append("::" + method.getName() + ":");
//			for (Object obj : objects) {
//				sb.append(obj.toString());
//			}
//			return sb.toString();
//		};
//	}

}
