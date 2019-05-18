package com.weichu.mdesigner.api.service;

import java.util.Map;

import com.weichu.mdesigner.common.entity.MerchantAlipayInfo;
import com.weichu.mdesigner.common.entity.MerchantAttachment;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 商家支付宝签约
 * @author Administrator
 *
 */
public interface IMerchantAlipayInfoService {
	
	/**
	 * 保存商家授权第三方应用(我们的收银管理)信息
	 * 授权成功调用
	 * @param alipayInfo
	 * @param mid
	 * @return
	 */
	int saveMerchantAlipayInfo(MerchantAlipayInfo alipayInfo, Integer mid) throws YdpException;
	
	/**
	 * 获取当前签约状态
	 * @param mid
	 * @return
	 */
	Map<String, Integer> getPaySteup(Integer mid);
	
	/**
	 * 保存授权函
	 * @param attachment
	 * @param sfqy 是否已签约
	 * @return
	 */
	int saveSqhFile(MerchantAttachment attachment, Integer sfqy, Integer merchantId);
	
	/**
	 * 查询授权函
	 * @param mid
	 * @return
	 */
	MerchantAttachment selectSqhByMerchantId(Integer mid);
	
	/**
	 * 查询支付配置信息
	 * @param mid
	 * @return
	 */
	MerchantAlipayInfo getAlipayInfoByMerchantId(Integer mid);

	MerchantAlipayInfo getAlipayInfoChange0ByMerchantId(Integer merchantId);
}
