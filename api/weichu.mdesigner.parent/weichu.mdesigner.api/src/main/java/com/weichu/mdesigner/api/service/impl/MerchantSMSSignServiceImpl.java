package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantSMSSignService;
import com.weichu.mdesigner.common.entity.MerchantSMSSign;
import com.weichu.mdesigner.common.entity.MerchantSMSSignExample;
import com.weichu.mdesigner.common.mapper.MerchantSMSSignMapper;
import com.weichu.mdesigner.utils.constants.Constants;
import com.weichu.mdesigner.utils.email.EmailSender;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantSMSSignServiceImpl implements IMerchantSMSSignService {

	@Autowired
	private MerchantSMSSignMapper mapper;
	
	@Autowired
	private EmailSender mailSender;
	
	@Override
	public int saveSMSSign(MerchantSMSSign smsSign, Integer mid) throws YdpException {
		StringBuilder sb = new StringBuilder();
		sb.append("<html><head></head>");
		sb.append("<body><p><h2>商家ID:" + mid + "</h2>已提交的短信签名申请。</p></body>");
		sb.append("</html>");
		mailSender.sendMail("商家短信签名设置", sb.toString());
		smsSign.setMerchantId(mid);
		smsSign.setCreateTime(new Date());
		smsSign.setSignStatus(1);//0=正常,1=待审核中,2=审核未通过
		if(smsSign.getId() != null) {
			int result = updateSMSSign(smsSign, mid);
			if(result == 0) {
				throw new YdpException("签名正使用中,暂时无法变更");
			}
			return result;
		} else {
			return mapper.insertSelective(smsSign);
		}
	}

	private int updateSMSSign(MerchantSMSSign smsSign, Integer mid) {
		smsSign.setMerchantId(mid);
		return mapper.updateByMid(smsSign);
	}

	@Override
	public MerchantSMSSign selectByMId(Integer mid) {
		MerchantSMSSignExample example = new MerchantSMSSignExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantSMSSign> smsSigns = mapper.selectByExample(example);
		if(smsSigns.isEmpty()) {
			return null;
		} else {
			return smsSigns.get(0);
		}
	}
	
	/**
	 * 查询已生效的短信签名
	 * @param mid
	 * @return
	 */
	@Override
	@Cacheable(value = Constants.NO_EXP_CACHE_NAME, key = "#root.targetClass + '_' + #mid")
	public MerchantSMSSign selectStatus0ByMid(Integer mid) {
		MerchantSMSSignExample example = new MerchantSMSSignExample();
		example.createCriteria().andSignStatusEqualTo(0).andMerchantIdEqualTo(mid);
		List<MerchantSMSSign> smsSigns = mapper.selectByExample(example);
		if(smsSigns.isEmpty()) {
			return null;
		} else {
			return smsSigns.get(0);
		}
	}

}
