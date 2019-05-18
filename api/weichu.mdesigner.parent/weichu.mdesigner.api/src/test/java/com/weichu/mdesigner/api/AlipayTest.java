package com.weichu.mdesigner.api;

import com.alipay.api.AlipayApiException;
import com.alipay.api.AlipayClient;
import com.alipay.api.DefaultAlipayClient;
import com.alipay.api.request.AlipayOpenAuthTokenAppRequest;
import com.alipay.api.request.AlipayTradeCreateRequest;
import com.alipay.api.response.AlipayOpenAuthTokenAppResponse;
import com.alipay.api.response.AlipayTradeCreateResponse;
import com.weichu.mdesigner.utils.DateUtil;

public class AlipayTest {
	// 测试第三方应用 给商户下单
	public static void main(String[] args) throws AlipayApiException {
		// 1、提供授权连接或二维码给商户、引导商户权限给第三方应用
		// 2、授权成功后根据返回的code取token //code:8649d7fc0b4c40318c9d4bfb1105cC05
//		getToken();
		// token: //201810BB5f1f2803245141108af0788abad42X05
		// 3、帮商户创建订单alipay.trade.create(统一收单交易创建接口)
		createOrder();
	}

	private static String APP_ID = "2016092000557569";
	private static String APP_PRIVATE_KEY = "MIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDBhGKOq3ILDUu/nxQl2I6QfMv2QMes47uifVvCrLZJ+yoJdl8qExysIg5mLvUg5CNN4NPp4sQ5OSA8ir3BnLV+RgqA4WxIGx4sJrfc5xwuBIX4eXdF7i4WMGoLgzb+j4vi+HuDqyt9Kq9qBEkLZeFZvkuNzW83SbSaMzwEMc/cr/oo8KAhGQHZA/7LxyziaeUlU3wRBdX3ntix2RFD8wRydXtNnvTmsD8AuUwnt0ycsbkStFePSyv6KMU5p5cCfUq3J6S8HwsKdvqSiJWmYtvgYj3gGg3N1/rWVpzRw1J4bnpID7eiII7sG+narZ298HUyxS5zrMwpz/rIQSjCbsp7AgMBAAECggEACjCpa+/VOoXBtl5vFisYHr2jk90HZrA7Qiwtt8uWccDbDtJ/4lxNRzcn4POaDthUj5ZGMmuxf33ll6qKoXZaDEMt7GlyZT2gUhzb07MLxdSRJWtn/3OyU5LLEr4fGDqA2DvTbTSHPrkPsZp2KjZ8LliZ6+akc5na+7+06lehJXK7KTDkFc+ISdoWF+xnzF3qOMuVxBjPL55S9u21xUgV9paH9NxNaajjoP7QtXGLBUn4s7C+D31jlMlXAvSt2SWzHUFMmydOKw4wz7CI/IS4RNdpCKFA2sKIgBhaNioZ4tM974/PD9R42G2RzAN4YW9ccEJxgvo2SPnIothLHrskGQKBgQD+BasBH7D5suCjqy0d9x2/ZemA286HXN9IOwCtFIini6v9N3p2iAbwvypUPy+4NxVilIJvb7MRpk7Y4/YyaUaobPjY56sSwiDdCRY3xX7GGuBf/3RCl/iqJ2qVCcnwX9cVB3DB+C/oPhB2ijENOJM8v+yJPrtFdx1P8pHrMnWKjQKBgQDDBh1k8Y9XMqWfX550o4LZgr94hhry4nGhbtuafJMk/jEVYzKkWnwbmUg4pkRWPtB88amUbfh1jsHURy0kXsrBOg4EsYUn9FYgEWVCuV/C3oe8fjAIL8K8bBhxOo+rw37u8pneeMrXuJ8z/pIMQzan0rKId6ctS6ekoYpM/YUrJwKBgFyIMgehxLTgrSXRmAi/WM280PdImo4Cja9hFtj1juYBYfBGgkylNmoCKOgxcC+ZmSek03LGbKN0QmqNd8RbRwrZTzisA0w8/P2nbrl4Lrr5VVyC0JXliAZrf061FyOBtfaKFFAEGWdvHE4h/sZDIpdRjldcS5l9T2ctBGx5oAmNAoGBALDF/ibdflw/oDiR54M6IwUdqoiIpiy6bN0zKwMhIA9MCRmlzOWEzzIFAp22uAKk9T4LnvbXp3qHZ9IOojBxa78x7Dr83gGVS+vNWMfeV5q/MrH8f3UsNYutP4qC1m+OyKO2axpoyxQ2WLg8bA2JbyU3qnRgYLyB8vcbJc0bj3XJAoGAGP/IaCWrPQ+o0wL1bdvem+7xCsutZ1hAH2+C5dV3qgXUr2qFv0gZahzdpSWimX2r1oEByIhi60pI9S9meA/a/4Fl1UEAG10SRoGFpoOOavYdYwc1ppo7xAWCFyYdtfMqZAk0/WUOJ2FeLfHrWHIq/IY/JaBM62ArwRHPGc19gp4=";
	private static final String FORMAT = "json";
	// 签名方式
	private static final String SIGN_TYPE = "RSA2";
	// 字符编码格式
	private static final String CHARSET = "utf-8";
	private static final String ALIPAY_PUBLIC_KEY = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA5V5teTw23kanYz4rDJ7SlrdFoS+gG6Ztyt4M03zt4LEoNUWAtGTgtgSYo/Dqd3/hmjLx80p6SKIfUX/VNNtYL5lRqrJnxKjyjm6eyrNMYx+n+TGn/LjiqgAI83C6NtdyN6YQZHVacm3H0sWgAh88Wpfn+9YlL8Wm6QP9nYdpPti3u1bcwF/Rc2ZfpnBEWOX9ev52OzGtLlSQ/8vvXXfw7eke1U+N2CVlqA49s+TPfG4EsmcBYpX+OWx3E7hNt3wY46rq0YhO7uKRJDdxonVGx539VuFH8yUQcU6QGSi3VoYQaZLsChS+nzV3eccdvx4nRfNSs354rilwI8cFTzSb1QIDAQAB";

	// https://openclub.alipay.com/read.php?tid=1649&fid=68 参考这个来的
	// 沙箱环境code换取token
	public static void getToken() throws AlipayApiException {
		String code = "8649d7fc0b4c40318c9d4bfb1105cC05";//
		AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipaydev.com/gateway.do", APP_ID,
				APP_PRIVATE_KEY, "json", CHARSET, ALIPAY_PUBLIC_KEY, "RSA2");
		AlipayOpenAuthTokenAppRequest request = new AlipayOpenAuthTokenAppRequest();
		request.setBizContent("{" + "    \"grant_type\":\"authorization_code\","
				+ "    \"code\":\"8649d7fc0b4c40318c9d4bfb1105cC05\"" + "  }");
		AlipayOpenAuthTokenAppResponse response = alipayClient.execute(request);
		System.out.println(response.getAppAuthToken());// 201810BB5f1f2803245141108af0788abad42X05
	}

	// 沙箱环境创建订单(统一收单交易创建接口)
	public static void createOrder() throws AlipayApiException {
		AlipayClient alipayClient = new DefaultAlipayClient("https://openapi.alipaydev.com/gateway.do", APP_ID,
				APP_PRIVATE_KEY, "json", CHARSET, ALIPAY_PUBLIC_KEY, "RSA2");
		AlipayTradeCreateRequest alipayRequest = new AlipayTradeCreateRequest();		
//		request.setApiVersion("1.0");
//		request.putOtherTextParam("timestamp", DateUtil.now());
//		request.putOtherTextParam("app_auth_token", "201810BB5f1f2803245141108af0788abad42X05");
		alipayRequest.setBizContent("{" +
		"\"out_trade_no\":\"20181030110112119\"," +
//		"\"seller_id\":\"2088102176523193\"," +
		"\"total_amount\":88.88," +
//		"\"discountable_amount\":8.88," +
		"\"subject\":\"Iphone6 16G\"," +
//		"\"body\":\"Iphone6 16G\"," +
		"\"buyer_id\":\"2088102175927631\"" +
//		"\"buyer_logon_id\":\"uchcda0376@sandbox.com\"," +
//		"      \"goods_detail\":[{" +
//		"        \"goods_id\":\"apple-01\"," +
//		"\"goods_name\":\"ipad\"," +
//		"\"quantity\":1," +
//		"\"price\":2000," +
//		"\"goods_category\":\"34543238\"," +
//		"\"categories_tree\":\"124868003|126232002|126252004\"," +
//		"\"body\":\"特价手机\"," +
//		"\"show_url\":\"http://www.alipay.com/xxx.jpg\"" +
//		"        }]," +
//		"\"operator_id\":\"Yx_001\"," +
//		"\"store_id\":\"NJ_001\"," +
//		"\"terminal_id\":\"NJ_T_001\"," +
//		"\"extend_params\":{" +
//		"\"sys_service_provider_id\":\"2088511833207846\"," +
//		"\"industry_reflux_info\":\"{\\\\\\\"scene_code\\\\\\\":\\\\\\\"metro_tradeorder\\\\\\\",\\\\\\\"channel\\\\\\\":\\\\\\\"xxxx\\\\\\\",\\\\\\\"scene_data\\\\\\\":{\\\\\\\"asset_name\\\\\\\":\\\\\\\"ALIPAY\\\\\\\"}}\"," +
//		"\"card_type\":\"S0JP0000\"" +
//		"    }," +
//		"\"timeout_express\":\"90m\"," +
//		"\"settle_info\":{" +
//		"        \"settle_detail_infos\":[{" +
//		"          \"trans_in_type\":\"cardSerialNo\"," +
//		"\"trans_in\":\"A0001\"," +
//		"\"summary_dimension\":\"A0001\"," +
//		"\"settle_entity_id\":\"2088xxxxx;ST_0001\"," +
//		"\"settle_entity_type\":\"SecondMerchant、Store\"," +
//		"\"amount\":0.1" +
//		"          }]" +
//		"    }," +
//		"\"logistics_detail\":{" +
//		"\"logistics_type\":\"EXPRESS\"" +
//		"    }," +
//		"\"business_params\":\"{\\\"data\\\":\\\"123\\\"}\"," +
//		"\"receiver_address_info\":{" +
//		"\"name\":\"张三\"," +
//		"\"address\":\"上海市浦东新区陆家嘴银城中路501号\"," +
//		"\"mobile\":\"13120180615\"," +
//		"\"zip\":\"200120\"," +
//		"\"division_code\":\"310115\"" +
//		"    }" +
		"  }");
		AlipayTradeCreateResponse response = alipayClient.execute(alipayRequest);
		if(response.isSuccess()){
			System.out.println("调用成功, trade_no:" + response.getTradeNo());
		} else {
			System.out.println("调用失败" + response.getMsg());
		}
	}
}
