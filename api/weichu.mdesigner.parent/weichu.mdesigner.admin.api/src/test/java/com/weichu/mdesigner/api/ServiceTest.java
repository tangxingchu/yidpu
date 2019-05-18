package com.weichu.mdesigner.api;

import java.util.List;
import java.util.Map;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.entity.MerchantUserExample;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;

/**
 * 测试spring aop 的异常通知
 * @author Administrator
 *
 */
//@RunWith(SpringRunner.class)
//@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ServiceTest {
	
	public static final Logger logger = LoggerFactory.getLogger(ServiceTest.class);
	
	@Autowired
	public MerchantUserMapper merchantUserMapper;
	
////	@Test
//	public void test1() {
//		service.method1();
//	}
//	
////	@Test
//	public void findMerchantByPhone() {
//		MerchantUser merchantUser = merchantService.findMerchantByPhone("18975230231");
//		logger.debug(merchantUser.getPhone());
//	}
////	@Test
//	public void listMerchantFunction() {
//		List<MerchantFunction> functions = merchantAuthorization.listMerchantFunction(0);
//		logger.debug(functions.size() + "");
//	}
//	@Test
//	public void listMerchantFunctionRole() {
//		List<Map<String, String>> functions = merchantAuthorization.listMerchantFunctionRole(0);
//		logger.debug(functions.size() + "");
//	}
//	@Test
	public void listMerchant() {
		MerchantUserExample example = new MerchantUserExample();
		example.createCriteria().andPhoneEqualTo("18975230231");
		List<MerchantUser> users = merchantUserMapper.selectByExample(example);
		logger.debug(users.size() + "");
	}
}
