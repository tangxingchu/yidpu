package com.weichu.mdesigner.api.service.impl;

import java.util.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Isolation;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.weichu.mdesigner.api.service.IMerchantAlipayService;
import com.weichu.mdesigner.common.entity.MerchantAlipay;
import com.weichu.mdesigner.common.entity.MerchantAlipayExample;
import com.weichu.mdesigner.common.entity.MerchantOrder;
import com.weichu.mdesigner.utils.exception.YdpException;
import com.weichu.mdesigner.common.mapper.MerchantAlipayMapper;

/**
 * 支付宝支付service
 * 
 * @author Administrator
 *
 */
@Service
@Transactional(propagation = Propagation.REQUIRED, isolation = Isolation.DEFAULT, timeout = 36000, rollbackFor = Exception.class)
public class MerchantAlipayServiceImpl implements IMerchantAlipayService {

	@Autowired
	private MerchantAlipayMapper alipayMapper;

	/**
	 * 商家自己配置 支付宝支付配置
	 * 
	 * @param alipay
	 * @param mid
	 * @return
	 * @throws YdpException 
	 */
	@Override
	public int addAlipayConfig(MerchantAlipay alipay, int mid) throws YdpException {
		if(alipay.getId() != null) {
			alipay.setModifyTime(new Date());
			alipay.setMerchantId(mid);
			alipayMapper.updateByMerchantId(alipay);
			return alipay.getId();
		} else {
			alipay.setMerchantId(mid);
			alipay.setCreateTime(new Date());
			alipayMapper.insertSelective(alipay);
			return alipay.getId();
		}
	}

	/**
	 * 商家修改 支付宝支付配置
	 * 
	 * @param alipay
	 * @param mid
	 * @return
	 */
	@Override
	public int updateAlipayConfig(MerchantAlipay alipay, int mid) throws YdpException {
		if (alipay.getMerchantId() == null || mid != alipay.getMerchantId()) {
			throw new YdpException("非法操作");
		} else {
			return alipayMapper.updateByPrimaryKeySelective(alipay);
		}
	}

	/**
	 * 根据id 查询商家支付宝配置
	 * 
	 * @param id
	 * @param mid
	 * @return
	 */
	@Override
	public MerchantAlipay selectByMId(int mid) {
		MerchantAlipayExample example = new MerchantAlipayExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantAlipay> alipays = alipayMapper.selectByExample(example);
		if (alipays.isEmpty()) {
			return null;
		} else {
			return alipays.get(0);
		}
	}

	/**
	 * 支付订单 
	 * @param order
	 * @param mid
	 * @return
	 */
	@Override
	public int pay(MerchantOrder order, int mid) throws Exception {
		MerchantAlipayExample example = new MerchantAlipayExample();
		example.createCriteria().andMerchantIdEqualTo(mid);
		List<MerchantAlipay> alipays = alipayMapper.selectByExample(example);
		if(alipays.isEmpty()) {
			throw new Exception("支付失败,商家未配置支付宝的支付配置");
		}
		MerchantAlipay alipay = alipays.get(0);
//		AlipayClient alipayClient = new DefaultAlipayClient(AlipayConfig.gatewayUrl, alipay.getAppId(),
//				alipay.getPrivateKey(), "json", AlipayConfig.charset, alipay.getPrivateKey(),
//				AlipayConfig.sign_type);
		
		return 0;
	}

}
