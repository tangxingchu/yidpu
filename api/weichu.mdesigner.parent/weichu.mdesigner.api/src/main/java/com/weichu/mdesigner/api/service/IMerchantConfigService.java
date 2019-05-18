package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantConfig;
import com.weichu.mdesigner.utils.exception.YdpException;

/**
 * 商家基本配置信息
 * @author Administrator
 *
 */
public interface IMerchantConfigService {
	
	/**
	 * 查询所有
	 * @param codes
	 * @param mid
	 * @return
	 */
	List<MerchantConfig> listAll(int mid);

	/**
	 * 根据code列出配置列表
	 * @param codes
	 * @param mid
	 * @return
	 */
	List<MerchantConfig> listByCodes(List<String> codes, int mid);
	
//	/**
//	 * 保存
//	 * @param config
//	 * @param mid
//	 * @return
//	 */
//	String save(MerchantConfig config, int mid);

	/**
	 * 根据code修改配置
	 * @param code
	 * @param mid
	 * @return
	 * @throws YdpException
	 */
	String updateByConfigCode(MerchantConfig config, int mid, String username) throws YdpException;
	
	/**
	 * 根据code获取当个配置
	 * @param configCode
	 * @param mid
	 * @return
	 */
	String getByCode(String configCode, int mid);
	
	/**
	 * 根据code获取当个配置
	 * @param configCode
	 * @param mid
	 * @return
	 */
	MerchantConfig getEntityByCode(String configCode, int mid);
}
