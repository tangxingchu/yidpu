package com.weichu.mdesigner.api.wxpay;

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.InputStream;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;


/**
 * 微信支付基础配置
 * @author Administrator
 *
 */
public class WXPayConfigImpl extends WXPayConfig {
	
	Logger logger = LoggerFactory.getLogger(WXPayConfigImpl.class);
	
	public static void main(String[] args) {
		System.out.println(java.util.UUID.randomUUID().toString().replaceAll("-", ""));
	}
	
	//邮箱里面
	@Override
	public String getAppID() {
		//服务商AppId 公众号的appId
		return "您的appId";
	}
	
	
	//
	@Override
	public String getMchID() {
		//服务商ID
		return "服务商ID";
		//商户id
//		return "1519281511";
	}

	//api秘钥
	@Override
	public String getKey() {
		//服务商号的api秘钥
		return "api秘钥";
	}

	@Override
	InputStream getCertStream() {
		InputStream inputStream = WXPayConfigImpl.class.getResourceAsStream("/wxpay_mch_service/apiclient_cert.p12");
		return inputStream;	
	}

	@Override
	IWXPayDomain getWXPayDomain() {
		return new IWXPayDomain() {
			
			@Override
			public void report(String domain, long elapsedTimeMillis, Exception ex) {
				if(ex != null) {
					ex.printStackTrace();
					logger.error("domain, " + domain + ", elapsedTimeMillis: " + elapsedTimeMillis + ", 异常："
							+ ex.getMessage());
				} else {
					logger.debug("report .......");
				}
			}
			
			@Override
			public DomainInfo getDomain(WXPayConfig config) {
				return new DomainInfo("api.mch.weixin.qq.com", true);
			}
		};
	}

}
