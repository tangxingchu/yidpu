package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CachePut;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantWxpayInfoService;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfo;
import com.weichu.mdesigner.common.entity.MerchantWxpayInfoExample;
import com.weichu.mdesigner.common.mapper.MerchantUserMapper;
import com.weichu.mdesigner.common.mapper.MerchantWxpayInfoMapper;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.email.EmailSender;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 商家 微信支付需要提交的信息
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantWxpayInfoServiceImpl implements IMerchantWxpayInfoService {

	Logger logger = LoggerFactory.getLogger(MerchantWxpayInfoServiceImpl.class);
	
	@Autowired
	private MerchantWxpayInfoMapper mapper;
	
	@Autowired
	private MerchantUserMapper userMapper;
	
	@Autowired
	private EmailSender mailSender;
	
	/**
	 * 发送邮件通知我们内部管理系统
	 * @param merchantUser
	 */
	private void sendMail(Integer mid, String subject) {
		StringBuilder sb = new StringBuilder();
		sb.append("<html><head></head>");
		sb.append("<body><p><h2>商家ID:" + mid + "</h2>已提交的微信支付开通资料。</p></body>");
		sb.append("</html>");
		mailSender.sendMail(subject, sb.toString());
	}
	
//	@CachePut(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public MerchantWxpayInfo save(MerchantWxpayInfo wxpayInfo, Integer mid) throws YdpException {
		wxpayInfo.setMerchantId(mid);
		if(wxpayInfo.getId() != null) {
			update(wxpayInfo, mid);
		} else {
			wxpayInfo.setCreateTime(new Date());
			mapper.insertSelective(wxpayInfo);
		}
		sendMail(mid, "微信支付开通申请");
		//将微信支付进度改成1
		userMapper.updateWxpaySteup(mid, 1);
		return wxpayInfo;
	}

//	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public MerchantWxpayInfo selectByMid(Integer mid) {
		MerchantWxpayInfoExample example = new MerchantWxpayInfoExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantWxpayInfo> wxpayInfos = mapper.selectByExample(example);
		if(wxpayInfos.isEmpty()) {
			return new MerchantWxpayInfo();
		} else {
			return wxpayInfos.get(0);
		}
	}

//	@CachePut(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	@Override
	public MerchantWxpayInfo update(MerchantWxpayInfo wxpayInfo, Integer mid) throws YdpException {
		if(mid != wxpayInfo.getMerchantId()) {
			throw new YdpException("非法操作");
		}
		//将微信支付进度改成1
		userMapper.updateWxpaySteup(mid, 1);
		mapper.updateByPrimaryKeySelective(wxpayInfo);
		return wxpayInfo;
	}

}
