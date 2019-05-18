package com.weichu.mdesigner.api.controller;

import java.util.Date;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.CacheManager;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.alibaba.fastjson.JSONObject;
import com.weichu.mdesigner.api.service.IMemberUserService;
import com.weichu.mdesigner.common.entity.MemberUser;
import com.weichu.mdesigner.common.entity.MerchantUser;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.utils.ip.IPUtils;
import com.weichu.mdesigner.utils.json.JSONResult;
import com.weichu.mdesigner.utils.log.ILogSender;
import com.weichu.mdesigner.utils.log.LogType;
import com.weichu.mdesigner.utils.log.entity.SysLogger;
import com.weichu.mdesigner.utils.sms.AliSMSUtil;


/**
 * 会员管理
 * @author Administrator
 *
 */
@RestController
@RequestMapping("/api/mobile/member")
public class MemberController {
	
	private Logger logger = LoggerFactory.getLogger(MemberController.class);
	
	@Autowired
	private IMemberUserService service;
	
	@Autowired
	private CacheManager cacheManager;
	
	// 是否启用阿里云短信服务
	@Value("${aliyun.sms.enabled}")
	private Integer enabledSms;
	
	@Autowired
	private ILogSender logSender;

	@Value("${business.log.enabled}")
	private boolean enabledLog;
	
	@Autowired
	private AliSMSUtil aliSMSUtil;
	
	/**
	 * 查询详情
	 * @param request
	 * @param phone
	 * @return
	 */
	@RequestMapping(value = "/selectById", method = RequestMethod.POST)
	public MemberUser selectById(HttpServletRequest request) {
		
		return null;
	}
	
	/**
	 * 绑定手机
	 * @param request
	 * @param phone 手机号码
	 * @param code 手机验证码
	 */
	@RequestMapping(value = "/bindPhone", method = RequestMethod.POST)
	public void bindPhone(HttpServletRequest request, @RequestParam("phone")String phone,
			@RequestParam("code")String code, @RequestParam("wechatOpenId")String wechatOpenId) throws Exception {
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(phone, String.class);
		if(cacheCode == null || !cacheCode.toUpperCase().equals(code.toUpperCase())) {
			throw new Exception("手机验证码输入错误");
		}
		
	}
	
	/**
	 * 生成手机验证码
	 * @param request
	 * @param phone
	 * @param time
	 * @param code
	 * @return
	 * @throws YdpException 
	 */
	@RequestMapping(value = "/generatePhoneCode", method = RequestMethod.POST)
	public JSONObject generatePhoneCode(HttpServletRequest request, @RequestParam("phone")String phone, 
			@RequestParam("time")String time, @RequestParam("code")String code) throws YdpException {
		String cacheCode = cacheManager.getCache(Constants.CODE_CACHE_NAME).get(time, String.class);
		if(StringUtils.isEmpty(cacheCode)) {
			return JSONResult.fillResultJsonObject(500, "验证码已超过5分钟有效时间", "");
		} else {
			if(code == null || !cacheCode.toUpperCase().equals(code.toUpperCase())) {
				return JSONResult.fillResultJsonObject(500, "验证码验证失败", "");
			}
		}
		//5分钟内有效
		String random = String.valueOf((int)(Math.random() * 9000 + 1000));
		logger.debug("手机验证码:" + random);
		cacheManager.getCache(Constants.CODE_CACHE_NAME).put(phone, random);
		//发送手机验证码
		if(enabledSms == 1) {
			MemberUser user = service.findByPhone(phone);
			String ip = IPUtils.getRealIP(request);
			SysLogger sysLogger = new SysLogger();
			sysLogger.setIp(ip);
			sysLogger.setClassName(this.getClass().getName());
			sysLogger.setLogContent(phone);
			sysLogger.setLogTime(new Date());
			sysLogger.setLogType(LogType.SMS.getCode());
			sysLogger.setMethodName("generatePhoneCode");
			sysLogger.setUsername(phone);
			logSender.sendLog(sysLogger);
			if(user == null) {
				String templateCode = "SMS_147439888";
				String templateParam = "{\"code\":\"" + random + "\"}";
				aliSMSUtil.sendSMS(Constants.DEFAULT_SIGNNAME, phone, templateCode, templateParam);
			}
		}
		return JSONResult.fillResultJsonObject(200, "", "");
	}
	
}
