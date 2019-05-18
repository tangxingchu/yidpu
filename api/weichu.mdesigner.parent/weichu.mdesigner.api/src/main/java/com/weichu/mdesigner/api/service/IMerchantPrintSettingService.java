package com.weichu.mdesigner.api.service;

import java.util.List;

import com.weichu.mdesigner.common.entity.MerchantPrintSetting;

/**
 * 打印机配置
 * @author tangxingchu
 *
 */
public interface IMerchantPrintSettingService {
	
	int save(MerchantPrintSetting printSetting, Integer mid);
	
	List<MerchantPrintSetting> list(Integer mid);
	
	int update(MerchantPrintSetting printSetting, Integer mid);
	
	int delete(int id, Integer mid);
	
}
