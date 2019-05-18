package com.weichu.mdesigner.api;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.concurrent.CountDownLatch;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.weichu.mdesigner.api.service.IMerchantAuthorization;
import com.weichu.mdesigner.api.service.IMerchantGoodsService;
import com.weichu.mdesigner.api.service.IMerchantOrderService;
import com.weichu.mdesigner.api.service.IMerchantService;
import com.weichu.mdesigner.api.service.Service1;
import com.weichu.mdesigner.common.entity.MerchantFunctionRole;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.common.mapper.AdminDictionaryMapper;
import com.weichu.mdesigner.utils.YdpUtils;

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
	private Service1 service;
	
	@Autowired
	private IMerchantService merchantService;
	
	@Autowired
	private IMerchantGoodsService goodsService;
	
	@Autowired
	private IMerchantAuthorization merchantAuthorization;
	
	@Autowired
	private AdminDictionaryMapper dictMapper;
	
	@Autowired
	private IMerchantOrderService orderService;
	
//	@Test
	public void test1() {
		service.method1();
	}
	
//	@Test
	public void findMerchantByPhone() {
		MerchantUser merchantUser = merchantService.findMerchantByPhone("18975230231");
		logger.debug(merchantUser.getPhone());
	}
//	@Test
	public void listMerchantFunction() {
//		List<MerchantFunction> functions = merchantAuthorization.listMerchantFunction(0);
//		logger.debug(functions.size() + "");
	}
//	@Test
	public void listMerchantFunctionRole() {
		List<MerchantFunctionRole> functions = merchantAuthorization.listMerchantFunctionRole(0);
		logger.debug(functions.size() + "");
	}
	
	String generateOrderNo(Integer businessId, Integer channelId, Integer merchantId, Integer userId,
			Date now) {
		SimpleDateFormat sdf = new SimpleDateFormat("MMdd");
		String time = String.valueOf(now.getTime());
		String merchantIdStr = String.valueOf(merchantId);
		//服务员版app与桌面端app下单是没有用户id的
		String userIdStr = userId == null ? "0000" : String.valueOf(userId);
		StringBuilder orderNo = new StringBuilder();
		orderNo.append(businessId);
		orderNo.append(channelId);
		orderNo.append(sdf.format(now));
		orderNo.append(time.substring(time.length() - 8));
		// 商家编号后4位
		merchantIdStr = YdpUtils.convertMechantId2Str(merchantId);
		userIdStr = String.format("%04d", Integer.parseInt(userIdStr.substring(Math.max(userIdStr.length() - 4, 0))));
		orderNo.append(userIdStr).append(merchantIdStr);
		return orderNo.toString();
	}
	
//	@Test
	public void subInventory() {
		//计数器， 当为0时，当前等待的线程开始执行
		CountDownLatch countDownLatch = new CountDownLatch(1);
		for(int i = 0; i < 10; i++) {
			new Thread(new Runnable() {
				@Override
				public void run() {
					try {
						Thread.sleep(1000);
						System.out.println(Thread.currentThread().getName() + ", " + System.currentTimeMillis());
						try {
							//goodsService.subInventory(2, "adad", 2, 1);
							System.out.println(generateOrderNo(1, 1, 1, 123, new Date()));
						} catch (Exception e) {
							System.out.println(e.getMessage());
							e.printStackTrace();
						}
						countDownLatch.await();
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
				}
			}).start();
		}
		//设计数器为0，所有等待线程开始执行
		countDownLatch.countDown();
		try {
			new CountDownLatch(1).await();
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
	}
}
